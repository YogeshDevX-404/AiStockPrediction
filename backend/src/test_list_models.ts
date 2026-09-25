import dotenv from 'dotenv';
dotenv.config();

async function listGeminiModels() {
  const apiKey = (process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();
  console.log('[Test Gemini Models] Fetching available models for configured key...');

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!res.ok) {
      const err = await res.json();
      console.error('[Gemini ListModels Error]', res.status, JSON.stringify(err));
      process.exit(1);
    }
    const data: any = await res.json();
    console.log('[Gemini Supported Models]:');
    const modelNames = data.models?.map((m: any) => m.name) || [];
    console.log(modelNames);
  } catch (err: any) {
    console.error('[Fetch Error]', err.message);
  }
}

listGeminiModels();
