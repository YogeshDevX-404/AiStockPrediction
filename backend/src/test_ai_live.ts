import dotenv from 'dotenv';
dotenv.config();

import { executeLiveAiQuery } from './services/copilot.service';

async function testLiveAiPipeline() {
  console.log('[Test AI] Starting live AI pipeline verification...');
  const testPrompt = 'Explain what a stock market watchlist is in one sentence.';

  try {
    const result = await executeLiveAiQuery(testPrompt);
    console.log(`[AI] Provider: ${result.providerName}`);
    console.log('[AI] API key configured: true');
    console.log('[AI] Request successful: true');
    console.log('[AI] Response received:');
    console.log('--------------------------------------------------');
    console.log(result.responseText);
    console.log('--------------------------------------------------');
    process.exit(0);
  } catch (err: any) {
    console.error('[AI] Test Failed with Error:');
    console.error(err.message);
    process.exit(1);
  }
}

testLiveAiPipeline();
