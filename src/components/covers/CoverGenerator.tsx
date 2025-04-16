'use client';
import { useState } from 'react';
import { generateAlbumCover } from '@/lib/openai/image-generator';
import { motion } from 'framer-motion';

export default function CoverGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedCover, setGeneratedCover] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your album cover');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setAiPrompt(null);
      
      const imageUrl = await generateAlbumCover(prompt);
      setGeneratedCover(imageUrl);
      
      // Store the prompt that was used to generate this image
      setAiPrompt(prompt);
      
      // You could save to Firestore here if needed
      // const userId = 'user-id'; // Get from auth
      // await saveGeneratedCover(userId, prompt, imageUrl);
    } catch (error) {
      console.error('Cover generation failed', error);
      setError('Failed to generate cover. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900 to-purple-800 text-white rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Album Cover Creator</h2>
      
      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium mb-2">
          Describe your album cover
        </label>
        <textarea 
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., afro house album cover with neon lights and geometric patterns in a vibrant purple and orange color scheme"
          className="w-full p-3 bg-purple-800 border border-purple-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
          rows={3}
        />
        {error && (
          <p className="mt-2 text-red-300 text-sm">{error}</p>
        )}
        <div className="mt-2 text-purple-300 text-sm">
          <p>Make your prompt specific for better results. Include details like:</p>
          <ul className="list-disc list-inside pl-2 mt-1">
            <li>Music genre (afro house, techno, jazz, etc.)</li>
            <li>Mood or atmosphere</li>
            <li>Color scheme</li>
            <li>Specific visual elements or themes</li>
          </ul>
        </div>
      </div>
      
      <button 
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className={`w-full py-3 px-4 rounded-lg transition-all duration-300 font-medium flex items-center justify-center
          ${isLoading || !prompt.trim() 
            ? 'bg-orange-700 cursor-not-allowed opacity-70' 
            : 'bg-orange-500 hover:bg-orange-600'}`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating your album cover...
          </>
        ) : 'Generate Cover with DALL-E'}
      </button>

      {generatedCover && !isLoading && (
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-medium mb-3">Your Album Cover</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square bg-purple-950 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={generatedCover} 
                alt="Generated Album Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              {aiPrompt && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-orange-400 mb-2">Prompt Used</h4>
                  <p className="text-purple-200 italic bg-purple-950 bg-opacity-50 p-3 rounded">
                    {aiPrompt}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                <a 
                  href={generatedCover} 
                  download="album-cover.png"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 py-3 px-4 rounded-lg transition-colors w-full font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Image
                </a>
                <button 
                  onClick={() => setGeneratedCover(null)}
                  className="flex items-center justify-center bg-purple-700 hover:bg-purple-600 py-3 px-4 rounded-lg transition-colors w-full font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Generate Another
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}