import CoverGenerator from '@/components/covers/CoverGenerator';

export default function CoversPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">MyArtistHub</h1>
        <h2 className="text-xl text-orange-400 mb-10 text-center">AI Album Cover Creator</h2>
        
        <CoverGenerator />
        
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>Powered by DALL-E AI - Create unique album covers with just a text prompt</p>
          <p className="mt-2">
            <a href="/" className="text-orange-400 hover:underline">Back to Home</a>
          </p>
        </div>
      </div>
    </div>
  );
}