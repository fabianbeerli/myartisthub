'use client';
import { useState, useEffect } from 'react';

export default function TestOpenAI() {
  const [apiStatus, setApiStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    // Check API status when component mounts
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/test-openai');
      const data = await response.json();
      
      setApiStatus(data);
    } catch (error) {
      console.error('Error checking API status:', error);
      setError('Failed to check API status');
    } finally {
      setLoading(false);
    }
  };

  const testWithKey = async () => {
    if (!apiKey) {
      setError('Please enter an API key');
      return;
    }

    try {
      setTestLoading(true);
      setError(null);
      setTestResult(null);
      
      const response = await fetch('/api/direct-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey })
      });
      
      const data = await response.json();
      setTestResult(data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Test failed');
      }
    } catch (error: any) {
      console.error('Error testing API key:', error);
      setError(error.message || 'Failed to test API key');
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">OpenAI API Test</h1>
        <h2 className="text-xl text-orange-400 mb-10">Check your API configuration</h2>
        
        <div className="bg-purple-900 bg-opacity-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Environment Status</h3>
          
          {loading ? (
            <p className="text-purple-300">Loading environment status...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : apiStatus ? (
            <div className="space-y-4">
              <div className="bg-purple-800 rounded p-4">
                <h4 className="font-medium text-orange-400 mb-2">API Key Status</h4>
                <p className="text-white">
                  OpenAI API Key: {apiStatus.hasApiKey ? (
                    <span className="text-green-400">Available</span>
                  ) : (
                    <span className="text-red-400">Missing</span>
                  )}
                </p>
                <p className="text-white">USE_REAL_API: {apiStatus.useRealApi || 'not set'}</p>
                <p className="text-white">NODE_ENV: {apiStatus.nodeEnv || 'not set'}</p>
              </div>
              
              <div className="bg-purple-800 rounded p-4">
                <h4 className="font-medium text-orange-400 mb-2">Available Environment Variables</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {apiStatus.envVars && apiStatus.envVars.map((envVar: string) => (
                    <li key={envVar} className="text-purple-200">{envVar}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-purple-300">No status information available</p>
          )}
          
          <button
            onClick={checkApiStatus}
            className="mt-4 bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded"
          >
            Refresh Status
          </button>
        </div>
        
        <div className="bg-purple-900 bg-opacity-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Test with Direct API Key</h3>
          <p className="text-purple-300 mb-4">
            You can test your OpenAI API key directly without setting environment variables.
            This is useful for troubleshooting.
          </p>
          
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="apiKey">
              OpenAI API Key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full p-3 bg-purple-800 border border-purple-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
            />
          </div>
          
          <button
            onClick={testWithKey}
            disabled={testLoading || !apiKey}
            className={`w-full py-3 px-4 rounded-lg transition-all duration-300 font-medium
              ${testLoading || !apiKey
                ? 'bg-orange-700 cursor-not-allowed opacity-70'
                : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {testLoading ? 'Testing...' : 'Test API Key'}
          </button>
          
          {error && (
            <p className="mt-4 text-red-400">{error}</p>
          )}
          
          {testResult && (
            <div className="mt-6 bg-purple-800 rounded p-4">
              <h4 className="font-medium text-orange-400 mb-2">Test Result</h4>
              <pre className="text-purple-200 overflow-auto p-2 bg-purple-950 rounded">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}