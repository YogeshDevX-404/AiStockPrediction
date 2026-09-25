import dotenv from 'dotenv';
dotenv.config();

import { AgentRouter } from './services/copilot/AgentRouter';

async function testCopilotEndpointQueries() {
  console.log('==================================================');
  console.log('TESTING COPILOT API ENDPOINT LOGIC');
  console.log('==================================================');

  // Test 1: General Welcome Query
  console.log('\n[TEST 1] Prompt: "Hello, explain what TradeGenius AI can do."');
  try {
    const res1 = await AgentRouter.routeQuery('Hello, explain what TradeGenius AI can do.');
    console.log('Task ID:', res1.taskId);
    console.log('Overall Confidence:', res1.overallConfidence);
    console.log('Evidence Sources:', res1.evidenceSources);
    console.log('AI Response Executive Summary:');
    console.log(res1.executiveSummary);
  } catch (err: any) {
    console.error('Test 1 Error:', err.message);
  }

  // Test 2: Stock Specific Query (NVDA)
  console.log('\n[TEST 2] Prompt: "Should I consider NVDA right now?"');
  try {
    const res2 = await AgentRouter.routeQuery('Should I consider NVDA right now?', 'NVDA');
    console.log('Task ID:', res2.taskId);
    console.log('Evidence Sources:', res2.evidenceSources);
    console.log('AI Response Executive Summary:');
    console.log(res2.executiveSummary);
  } catch (err: any) {
    console.error('Test 2 Error:', err.message);
  }

  // Test 3: Educational Query
  console.log('\n[TEST 3] Prompt: "What is RSI?"');
  try {
    const res3 = await AgentRouter.routeQuery('What is RSI?');
    console.log('Task ID:', res3.taskId);
    console.log('AI Response Executive Summary:');
    console.log(res3.executiveSummary);
  } catch (err: any) {
    console.error('Test 3 Error:', err.message);
  }
}

testCopilotEndpointQueries();
