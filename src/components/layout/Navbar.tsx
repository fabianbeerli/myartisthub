'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Album Covers', path: '/covers' },
    { label: 'AI Mastering', path: '/mastering' },
    { label: 'Release Checklist', path: '/checklist' },
  ];

  return (
    <nav className="bg-purple-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="font-bold text-xl tracking-tight text-orange-400"
              >
                MyArtistHub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full
                    ${pathname === item.path
                      ? 'border-orange-400 text-white'
                      : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link 
              href="/login" 
              className="px-4 py-2 border border-orange-400 text-orange-400 rounded-md hover:bg-orange-400 hover:text-white transition-colors ml-3"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block pl-3 pr-4 py-2 text-base font-medium
                ${pathname === item.path
                  ? 'bg-purple-800 border-l-4 border-orange-400 text-white'
                  : 'border-l-4 border-transparent text-gray-300 hover:bg-purple-800 hover:border-gray-300 hover:text-white'
                }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="block pl-3 pr-4 py-2 text-base font-medium text-orange-400 hover:bg-purple-800"
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}