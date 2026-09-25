import { prisma } from '../database';
import { logger } from '../utils/logger';
import { MarketProviderFactory } from '../providers/MarketProviderFactory';

export interface CopilotChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  summary?: string;
  confidenceScore?: number;
  timestamp: string;
}

export interface CopilotQueryOptions {
  userId?: string;
  symbol?: string;
}

/**
 * Helper to extract potential stock ticker symbol from query if not explicitly passed
 */
function extractSymbolFromPrompt(prompt: string): string | undefined {
  const commonTickers = ['NVDA', 'TSLA', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'RELIANCE', 'SPY', 'QQQ', 'AMD', 'INTC'];
  const uppercasePrompt = prompt.toUpperCase();
  for (const ticker of commonTickers) {
    const regex = new RegExp(`\\b\\$?${ticker}\\b`, 'i');
    if (regex.test(uppercasePrompt)) {
      return ticker;
    }
  }
  return undefined;
}

/**
 * Executes a call to Google Gemini API via REST fetch
 */
async function callGeminiApi(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const models = [
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-3.6-flash',
    'gemini-2.5-pro',
    'gemini-pro-latest'
  ];
  let lastError: Error | null = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${systemPrompt}\n\nUser Question: ${userPrompt}` }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        const data: any = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim()) {
          logger.info(`[AI Provider] Successfully generated content using Gemini model: ${model}`);
          return text.trim();
        }
      } else {
        const errData: any = await response.json().catch(() => ({}));
        const message = errData.error?.message || response.statusText;
        lastError = new Error(`Gemini API Error (${response.status}): ${message}`);
        // If 404 model not found, try next model; if auth failure (400/403), stop retrying
        if (response.status === 400 || response.status === 403) {
          throw lastError;
        }
      }
    } catch (err: any) {
      if (err.message?.includes('400') || err.message?.includes('403') || err.message?.includes('API key')) {
        throw err;
      }
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini API.');
}

/**
 * Executes a call to OpenAI API via REST fetch
 */
async function callOpenAiApi(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const url = 'https://api.openai.com/v1/chat/completions';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const errData: any = await response.json().catch(() => ({}));
    const message = errData.error?.message || response.statusText;
    throw new Error(`OpenAI API Error (${response.status}): ${message}`);
  }

  const data: any = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text || !text.trim()) {
    throw new Error('OpenAI returned an empty response.');
  }

  logger.info('[AI Provider] Successfully generated content using OpenAI (gpt-4o-mini)');
  return text.trim();
}

/**
 * Main service to execute AI queries against configured provider (Gemini or OpenAI)
 */
export const executeLiveAiQuery = async (prompt: string, options: CopilotQueryOptions = {}): Promise<{ responseText: string; providerName: string; symbolUsed?: string; marketContextUsed?: boolean }> => {
  // Resolve API key safely
  const apiKey = (
    process.env.AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.OPENAI_API_KEY ||
    ''
  ).trim();

  if (!apiKey) {
    logger.warn('[CopilotService] AI_API_KEY is not configured in backend .env');
    throw new Error('AI_API_KEY is missing in backend .env. Please configure your Gemini or OpenAI API key to enable live AI Assistant responses.');
  }

  // Detect Provider
  const explicitProvider = (process.env.AI_PROVIDER || '').toLowerCase();
  const isGeminiKey = apiKey.startsWith('AIzaSy') || apiKey.startsWith('AIza') || apiKey.startsWith('AQ') || explicitProvider === 'gemini' || !!process.env.GEMINI_API_KEY || !!process.env.GOOGLE_API_KEY;
  const isOpenAiKey = apiKey.startsWith('sk-') || explicitProvider === 'openai' || !!process.env.OPENAI_API_KEY;

  let providerName = 'Unknown';
  if (isGeminiKey) {
    providerName = 'Google Gemini';
  } else if (isOpenAiKey) {
    providerName = 'OpenAI';
  } else {
    providerName = 'Auto-Detect (Gemini/OpenAI)';
  }

  logger.info(`[AI Provider] Selected provider: ${providerName} | API key configured: true`);

  // Build Context (Real Market Data if stock mentioned)
  let targetSymbol = options.symbol || extractSymbolFromPrompt(prompt);
  let marketContextText = '';
  let marketContextUsed = false;

  if (targetSymbol) {
    try {
      const provider = MarketProviderFactory.getProvider();
      const quotePromise = provider.getQuote(targetSymbol);
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
      const quote: any = await Promise.race([quotePromise, timeoutPromise]);
      if (quote && quote.price > 0) {
        marketContextText = `Real-time Market Context for $${targetSymbol.toUpperCase()}:\n- Current Price: $${quote.price}\n- High: $${quote.high}\n- Low: $${quote.low}\n- Open: $${quote.open}\n- Previous Close: $${quote.previousClose}\n- Change: $${quote.change} (${(quote.changePercent || 0).toFixed(2)}%)`;
        marketContextUsed = true;
      }
    } catch (err: any) {
      logger.warn(`[CopilotService] Could not fetch market quote context for ${targetSymbol}: ${err.message}`);
    }
  }

  const systemPrompt = `You are TradeGenius AI, a professional financial AI assistant and trading co-pilot.

Respond in a clear, conversational, and easy-to-scan format using Markdown.
Use Markdown headings, bullet points, and short paragraphs. Avoid long continuous paragraphs.
Highlight important numbers, key metrics, and conclusions using bold text.
Use tables only when they genuinely improve comparison or readability.
The response should feel like a professional financial AI assistant speaking to the user, not like a raw research document.

STRICT RESPONSE FORMATTING GUIDELINES:

1. FOR SIMPLE OR DEFINITION QUESTIONS (e.g. "What is P/E ratio?", "Explain RSI"):
   - Keep answers SHORT, direct, and conversational.
   - Use a clear short heading (e.g., ### 📊 P/E Ratio or ### 📉 RSI).
   - Highlight the core formula or definition in bold text.
   - Include a brief practical example with bullet points and bold numbers.
   - End with a short simple takeaway.
   - Do NOT generate full stock analysis sections or long cheat-sheets for simple questions.

2. FOR STOCK ANALYSIS QUESTIONS (e.g. "Analyze NVDA", "Should I buy $TSLA?"):
   Structure your response into the following clear sections:
   ### 📊 [Company Name] ([Ticker])
   **Overall Signal:** 🟢 BUY / 🟡 HOLD / 🔴 SELL  
   **Confidence:** XX%

   ### 💰 Valuation
   - Key valuation bullet points (**P/E**, **Forward P/E**, **PEG**, **EV/EBITDA**) with bold numbers.

   ### 📈 Fundamentals
   - Key fundamental metrics (**Revenue Growth**, **ROE**, **Operating Margin**, **Free Cash Flow**).

   ### 📉 Technicals
   - Key technical indicators (**Current Price**, **RSI**, **50-Day MA**, **200-Day MA**, **Trend**).

   ### ⚠️ Risks
   - Bullet points detailing 2-3 main risk factors.

   ### 🎯 Trade Setup
   - **Entry:** ...
   - **Target:** ...
   - **Stop Loss:** ...

   ### 💡 AI Verdict
   Provide a concise 2–4 sentence executive conclusion explaining the signal.

3. FOR GENERAL FINANCIAL / MARKET TOPICS:
   - ### 📌 [Topic Name]
   - A short 1-2 sentence core concept explanation.
   - ### 🔑 Key Points with concise bullet points.
   - ### 💡 Example with a practical illustration.

4. FOR FOLLOW-UP QUESTIONS:
   - Answer ONLY the specific question asked by the user.
   - Do NOT regenerate the full stock analysis or cheat-sheet report.

${marketContextText ? `Empirical Live Market Data Available:\n${marketContextText}\n` : ''}`;

  let responseText = '';

  // Execute based on detected key or fallback
  if (isGeminiKey) {
    responseText = await callGeminiApi(apiKey, systemPrompt, prompt);
  } else if (isOpenAiKey) {
    responseText = await callOpenAiApi(apiKey, systemPrompt, prompt);
  } else {
    try {
      responseText = await callGeminiApi(apiKey, systemPrompt, prompt);
      providerName = 'Google Gemini';
    } catch (err: any) {
      logger.info('[AI Provider] Default Gemini failed, trying OpenAI endpoint...');
      responseText = await callOpenAiApi(apiKey, systemPrompt, prompt);
      providerName = 'OpenAI';
    }
  }

  return { responseText, providerName, symbolUsed: targetSymbol, marketContextUsed };
};

export const processCopilotQueryService = async (userId: string, prompt: string, symbol?: string): Promise<CopilotChatMessage> => {
  const { responseText } = await executeLiveAiQuery(prompt, { userId, symbol });

  // Save conversation to Prisma DB if available
  let msgId = `chat_${Date.now()}`;
  try {
    if (userId) {
      const saved = await prisma.chat.create({
        data: {
          userId,
          prompt,
          response: responseText,
        },
      });
      msgId = saved.id;
    }
  } catch (err: any) {
    logger.warn('[CopilotService] Failed to persist chat to DB:', err.message);
  }

  return {
    id: msgId,
    role: 'assistant',
    content: responseText,
    summary: responseText.slice(0, 120),
    timestamp: new Date().toISOString(),
  };
};

export const getCopilotHistoryService = async (userId: string): Promise<CopilotChatMessage[]> => {
  try {
    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    return chats.map((c) => ({
      id: c.id,
      role: 'assistant' as const,
      content: c.response,
      timestamp: c.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
};

export const clearCopilotHistoryService = async (userId: string): Promise<boolean> => {
  try {
    await prisma.chat.deleteMany({ where: { userId } });
    return true;
  } catch {
    return false;
  }
};
