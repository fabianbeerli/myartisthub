'use client';
import { useState } from 'react';
import { generateAlbumCover } from '@/lib/openai/image-generator';

export default function CoverGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedCover, setGeneratedCover] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      const imageUrl = await generateAlbumCover(prompt);
      setGeneratedCover(imageUrl);
      // Save to Firestore
    } catch (error) {
      console.error('Cover generation failed', error);
    }
  };

  return (
    <div className="p-4 bg-purple-900 text-white">
      <input 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your album cover"
        className="w-full p-2 bg-purple-800"
      />
      <button 
        onClick={handleGenerate}
        className="bg-orange-500 text-white p-2 mt-2"
      >
        Generate Cover
      </button>
      {generatedCover && (
        <img 
          src={generatedCover} 
          alt="Generated Album Cover" 
          className="mt-4 max-w-full"
        />
      )}
    </div>
  );
}