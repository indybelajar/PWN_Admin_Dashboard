import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Terminal,
  Ticket,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard',             icon: LayoutDashboard, href: '/' },
  { name: 'Voucher Applications',  icon: Ticket,          href: '/vouchers' },
  { name: 'Users',                 icon: Users,           href: '/users' },
];

export function Sidebar() {
  const pathname = usePathname();

  // Matches exact path for '/', prefix match for everything else
  // e.g. /users/[id] → Users nav item stays active
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00aaff] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#00aaff]/20">
          <Terminal size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">PWN Admin Dashboard</h1>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-semibold text-sm',
                active
                  ? 'bg-[#00aaff]/10 text-[#00aaff]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <item.icon
                size={20}
                className={active ? 'text-[#00aaff]' : 'text-slate-400'}
              />
              <span>{item.name}</span>

              {/* Active indicator dot */}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00aaff]" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}