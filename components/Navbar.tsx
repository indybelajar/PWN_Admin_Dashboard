import * as React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Navbar({ title }: { title?: string }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        {title ? (
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        ) : (
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search entries, users, logs..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-[#00aaff] text-sm"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-[#00aaff] transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF0099] rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">Admin Profile</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Super User</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-[#00aaff]/20">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvcPvIueJrc7FGEZPkmzR31dojFpOwyY-Y5thfLl86sJFUtaLpf1xbjXiB5Fy8w9nhk54vVPVfTPu-P-Y5TXWnTQUF8qwu4s3MjhZUPW1v30dow_tlAK1CjvKkgSxv4NreKQPd7C8AFxHloAdX5KZCNlSK-gScWmAuIDZ2KACL4LwFSyS8tGQsRzyYF-5DWDSzYwRTQzZZlQDCcTYu6Fr4VOtPOgHA6TapXIA_7Awzl1ItUYSFo-UdqnDsgTz9TN_Is9gAHahhyOJj" 
              alt="Admin Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
