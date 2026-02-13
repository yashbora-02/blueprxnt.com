'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  DollarSign,
  Mail,
  FileText,
  MessageSquare,
  FileEdit,
  X,
  LogOut,
  Menu,
} from 'lucide-react';

const navItems = [
  { title: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Analytics', href: '/admin/dashboard/analytics', icon: TrendingUp },
  { title: 'Sales Pipeline', href: '/admin/dashboard/pipeline', icon: Users },
  { title: 'Coaching Packages', href: '/admin/dashboard/packages', icon: DollarSign },
  { title: 'Newsletter', href: '/admin/dashboard/newsletter', icon: Mail },
  { title: 'Applications', href: '/admin/dashboard/applications', icon: FileText },
  { title: 'Messages', href: '/admin/dashboard/messages', icon: MessageSquare },
  { title: 'Site Content', href: '/admin/dashboard/content', icon: FileEdit },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:bg-zinc-800 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[240px] min-h-screen bg-[#0a0a0a] border-r border-[#27272a] flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6">
          <div>
            <h1 className="text-white font-display font-bold text-lg tracking-wide">BLUEPRXNT</h1>
            <p className="text-sky-500 text-xs mt-0.5">Admin Panel</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-zinc-600 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                isActive
                  ? 'text-sky-400 bg-sky-500/10 border-l-2 border-sky-500'
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-5 border-t border-[#27272a]">
        <p className="text-white text-sm font-semibold">Admin</p>
        <p className="text-zinc-500 text-xs">admin@blueprxnt.com</p>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2 mt-3 text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
}
