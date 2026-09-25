import dotenv from 'dotenv';
dotenv.config();

async function testHttpCopilotEndpoint() {
  const url = 'http://localhost:5000/api/v1/copilot/query';
  console.log(`[HTTP Test] Sending POST request to ${url}...`);

  try {
    const start = Date.now();
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'Explain what TradeGenius AI does in one sentence.',
        prompt: 'Explain what TradeGenius AI does in one sentence.'
      }),
    });

    const duration = Date.now() - start;
    console.log(`[HTTP Test] Response Status Code: ${res.status} (${res.statusText}) in ${duration}ms`);
    console.log(`[HTTP Test] Content-Type Header: ${res.headers.get('content-type')}`);

    const json: any = await res.json();
    console.log('[HTTP Test] Response JSON Structure:');
    console.log(JSON.stringify(json, null, 2));

    if (res.ok && json.success && json.data?.executiveSummary) {
      console.log('\n✅ VERIFICATION SUCCESSFUL: HTTP 200 returned with valid AI text payload!');
      process.exit(0);
    } else {
      console.error('\n❌ VERIFICATION FAILED: Invalid response payload or status code');
      process.exit(1);
    }
  } catch (err: any) {
    console.error('[HTTP Test Error]:', err.message);
    process.exit(1);
  }
}

testHttpCopilotEndpoint();
