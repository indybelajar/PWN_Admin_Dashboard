import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  History, 
  Settings, 
  Terminal,
  ShieldCheck,
  Ticket,
  Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Voucher Applications', icon: Ticket, href: '/vouchers' },
  { name: 'Users', icon: Users, href: '/users' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00aaff] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#00aaff]/20">
          <Terminal size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight">PWN Admin</h1>
          <p className="text-xs text-slate-500 font-medium">Console v2.4</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-semibold text-sm",
                isActive 
                  ? "bg-[#00aaff]/10 text-[#00aaff]" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <item.icon size={20} className={isActive ? "text-[#00aaff]" : "text-slate-500"} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium">All systems normal</span>
          </div>
        </div>
        
        <div className="mt-4 p-2 bg-slate-50 rounded-xl flex items-center gap-3">
          

        </div>
      </div>
    </aside>
  );
}
