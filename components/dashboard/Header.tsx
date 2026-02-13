'use client';

import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-zinc-800 border-b border-zinc-700 px-4 lg:px-6 py-3 lg:py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4 ml-auto">
          {/* Action Buttons */}
          <button className="hidden sm:flex p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hidden sm:flex p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-zinc-700">
            {/* User Name - Hidden on small screens */}
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
              <p className="text-xs text-zinc-400">{user?.email || 'admin@blueprxnt.com'}</p>
            </div>
            {/* Avatar */}
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-sky-400 to-teal-400 rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-base">
              {user?.name?.[0] || 'A'}
            </div>
            {/* Logout - Desktop only, use sidebar logout on mobile */}
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="hidden lg:flex p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
