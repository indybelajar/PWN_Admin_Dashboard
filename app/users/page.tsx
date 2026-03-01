'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Download, Search, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const users = [
  { 
    id: 1, 
    name: 'Alex River', 
    email: 'alex@example.com', 
    handle: '@alex_riv', 
    date: 'Oct 12, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiidCybh1AhSI2iClUuoGJ7dwlcoZ7l--507ERZs60jyctYqnZiw1gpLNpEeh3pvnmFs8ePMEhFZa_OWaBTMenggdriIL5aQX3m2Wqhde8nqLCr0yGcfsDSR2VQoK5GUmuhI2oWmebQrB31nn5qC93EUCm60XpYR9qn7vUcS5jXOGuTMyU5Q_Kc9up_4ZErHGpIDsJ18QS-48wg2ntSyJ0O2nLvT28erPlcFTlkX1kflJ1LafeYDk0dlEZTkOcMsay_-SPZ8AsJy8O'
  },
  { 
    id: 2, 
    name: 'Sam Smith', 
    email: 'sam.s@provider.com', 
    handle: '@samsmith_99', 
    date: 'Oct 15, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbP728GuAUzHxGMorjnHQnzlzV4tF72Kqa_rf9t0GCZ3_u0KYB_k4aGGeteVIdPJf6xyU9hTcdbXe5DYKMID4WyMc7NWQESlbwTvuIYlmtdSiS53tMzEynkqYi6CciAdWLjhv1PVQ2JxmgriwgaH5-QCbhh4sHgYQBMDu7Txrg7BlRAtXZGLiY6wRV7ebeu2VQCgT4H4sqBXersMvY09GWXd0PyeywH9rcQpfw8SKt9b2oivG7hNtN1EBS74L8lKwxcclj-iPXYmKx'
  },
  { 
    id: 3, 
    name: 'Jordan Lee', 
    email: 'jlee@corp.com', 
    handle: '@jordan_lee', 
    date: 'Oct 18, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP270IbEgzvNPINxqClQi0OEPNS5UuBYk4ek0_v6Q8-2-eRvgY1gVBfx8C7TK8HT-TdNyHY7XH9uhSWsbNOyDAnxgsilvFshvqNdoFw2TuC2kP9E8EIoeOn9kj6R-Q2PNUqr5GC45CQMRwgrI_9Qa7hUsfhRrU5_rOwE5Ts7w_eIA1mfQWWIV_dDvyMCWuaC7NguDcjm_wj6jnndFNEr07HKUjucVf6yhP_b_lz8dXYrw4ivH4UeXoFCuyFp16jgmjGyYFrVudGaLW'
  },
  { 
    id: 4, 
    name: 'Taylor Wong', 
    email: 'taylor.w@mail.com', 
    handle: '@twong_studio', 
    date: 'Oct 20, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzUYUKwWNXc7XLpCp9MgAQHJ_nO8myJ4d9ygmOx_XjtM3EzqHNKEkpJMKket-7VylVYdzG3ZrV6N4R9NnU9vRJvX_R9e_YXmQLCtY4icT58qhXKugQlELyFCO8_HjTaqEIO3YvKPR4BIlupzZFkeTfNcg1dQPen6ruD9wYdAcGOxYaW0ow_eNx-injP80YpUptIRKNq-7Nv6LFoR8loFy5pHT1GkNOHfzs-JnRzFlFxQL8Kj1KdJbdeOqdNVqdOVVPDxbAA8RbM71z'
  },
  { 
    id: 5, 
    name: 'Morgan Case', 
    email: 'm.case@service.io', 
    handle: '@morgan_c', 
    date: 'Oct 22, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjF-ZYFiZvTX-2SDoH_fW9e01iS1Cx4_J62qDqZpykwxZRvvMRryb0ngFy9xyfAidk2y4eGQxbqgdfz0FgUJIyIGi1lgpB3QGkndfUiTr86G1EebU_3TuG4GqLW36IsZYpWXEfMmzxTJ_2uc3o-K73CWn1viJHapzSB7BNnl_7dH1_GqJDj1gw7I6yC1zMTKLErDsarrnP_LAOaRHJyX46iQ6vM6KTnsglxWWCXX4NqQfHTWCfEZKReW_1_Rg9yYGFeAdr5A1fnBtN'
  },
];

export default function UsersPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Users" />
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Users Overview</h3>
              <p className="text-slate-500 mt-1">Manage and monitor all registered platform users</p>
            </motion.div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white rounded-lg text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-[#00aaff] transition-colors" size={18} />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2.5 border-slate-200 bg-slate-50 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00aaff]/20 focus:border-[#00aaff] transition-all" 
                placeholder="Search users by name, email or handle..." 
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avatar</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Instagram Handle</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Joined</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="size-10 rounded-full bg-[#00aaff]/10 flex items-center justify-center overflow-hidden">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00aaff]/10 text-[#00aaff]">
                          {user.handle}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">{user.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link href={`/users/${user.id}`} className="text-[#00aaff] hover:text-[#00aaff]/80 font-bold text-sm transition-colors">
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-500">Showing 1 to 5 of 48 users</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm disabled:opacity-50">Previous</button>
                <button className="px-3 py-1 border border-slate-200 rounded bg-[#00aaff] text-white text-sm">1</button>
                <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm">2</button>
                <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm">3</button>
                <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm">Next</button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
