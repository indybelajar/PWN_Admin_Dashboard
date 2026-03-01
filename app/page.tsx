'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { TrendingUp, FileQuestion, Users, Shield, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const stats = [
  { 
    label: 'Total Quiz Attempts', 
    value: '12,840', 
    change: '12%', 
    icon: TrendingUp, 
    color: 'text-[#00aaff]', 
    bgColor: 'bg-[#00aaff]/10' 
  },
  { 
    label: 'Total Users', 
    value: '3,120', 
    change: '5%', 
    icon: Users, 
    color: 'text-[#FF0099]', 
    bgColor: 'bg-[#FF0099]/10' 
  },
];

const recentAttempts = [
  { id: 1, user: 'Alex Johnson', initials: 'AJ', date: '2023-10-24', color: 'bg-[#00aaff]/20', textColor: 'text-[#00aaff]' },
  { id: 2, user: 'Maria Garcia', initials: 'MG', date: '2023-10-24', color: 'bg-[#FF0099]/20', textColor: 'text-[#FF0099]' },
  { id: 3, user: 'James Smith', initials: 'JS', date: '2023-10-23', color: 'bg-slate-200', textColor: 'text-slate-600' },
  { id: 4, user: 'Chen Wei', initials: 'CW', date: '2023-10-23', color: 'bg-green-100', textColor: 'text-green-600' },
  { id: 5, user: 'Kevin Brown', initials: 'KB', date: '2023-10-22', color: 'bg-purple-100', textColor: 'text-purple-600' },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
            <p className="text-slate-500">Monitor system performance and user activity.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:border-[#00aaff]/50 transition-colors cursor-default"
              >
                <div className={`w-14 h-14 ${stat.bgColor} rounded-lg flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={30} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <span className="text-xs font-bold text-green-500 flex items-center">
                      <TrendingUp size={14} className="mr-1" /> {stat.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg">Recent Quiz Attempts</h3>
              <Link href="/attempts" className="text-sm font-semibold text-[#00aaff] hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Attempt Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${attempt.color} flex items-center justify-center ${attempt.textColor} font-bold text-xs`}>
                            {attempt.initials}
                          </div>
                          <span className="font-semibold text-sm">{attempt.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{attempt.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-4 py-2 bg-[#00aaff]/10 text-[#00aaff] hover:bg-[#00aaff] hover:text-white rounded-lg text-xs font-bold transition-all">
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:col-span-2 bg-gradient-to-br from-[#00aaff] to-[#00aaff]/80 p-6 rounded-xl text-white flex justify-between items-center relative overflow-hidden"
            >
              <div className="z-10">
                <h4 className="text-xl font-bold mb-2">New Security Protocols Active</h4>
                <p className="text-white/80 text-sm max-w-md">System wide encryption and multi-factor authentication are now enforced for all administrative accounts.</p>
                <button className="mt-4 px-6 py-2 bg-white text-[#00aaff] rounded-lg font-bold text-sm shadow-xl shadow-black/10">Read update</button>
              </div>
              <Shield size={120} className="absolute -right-4 -bottom-4 opacity-10" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-gradient-to-br from-[#FF0099] to-pink-600 p-6 rounded-xl text-white flex flex-col justify-center items-center text-center relative overflow-hidden"
            >
              <Rocket size={36} className="mb-2" />
              <h4 className="text-lg font-bold">Premium Features</h4>
              <p className="text-white/80 text-sm mb-4">Export unlimited reports</p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-bold text-sm border border-white/30 backdrop-blur-sm transition-all">Upgrade Now</button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
