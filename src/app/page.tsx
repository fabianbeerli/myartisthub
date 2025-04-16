import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'AI Album Cover Creator',
      description: 'Generate unique album artwork using DALL-E AI',
      path: '/covers',
      color: 'from-purple-600 to-indigo-700',
      status: 'Available',
    },
    {
      title: 'AI Mastering',
      description: 'Professional sound quality with one-click AI mastering',
      path: '/mastering',
      color: 'from-orange-500 to-red-600',
      status: 'Coming Soon',
    },
    {
      title: 'Release Checklist',
      description: 'Stay organized with interactive release preparation checklists',
      path: '/checklist',
      color: 'from-green-500 to-emerald-700',
      status: 'Coming Soon',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">MyArtistHub</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          All-in-one platform for independent musicians to create, produce, and market their music
        </p>
        <Link 
          href="/covers" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block"
        >
          Try AI Album Cover Creator
        </Link>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto pb-20 px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-purple-900 bg-opacity-50 rounded-xl p-6 border border-purple-800 hover:border-purple-600 transition-all duration-300 flex flex-col h-full"
            >
              <div className={`w-full h-40 mb-4 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-xl font-bold`}>
                {feature.title}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 mb-4 flex-grow">{feature.description}</p>
              <div className="mt-auto">
                {feature.status === 'Available' ? (
                  <Link 
                    href={feature.path}
                    className="inline-block bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors w-full text-center"
                  >
                    Try It Now
                  </Link>
                ) : (
                  <span className="inline-block bg-gray-700 text-gray-300 py-2 px-4 rounded-lg w-full text-center cursor-not-allowed">
                    {feature.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}