'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Download, ChevronRight, X, ListTodo, History, Share2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const userHistory = [
  { id: 1, date: 'Oct 24, 2023', time: '14:32 PM', result: 'Anger', option: 'Option A', badgeClass: 'bg-[#FFE5F4] text-[#FF0099]' },
  { id: 2, date: 'Oct 23, 2023', time: '09:15 AM', result: 'Joy', option: 'Option C', badgeClass: 'bg-[#E6FFF2] text-[#00C853]' },
  { id: 3, date: 'Oct 22, 2023', time: '11:04 AM', result: 'Sadness', option: 'Option B', badgeClass: 'bg-[#E6F0FF] text-[#0066FF]' },
  { id: 4, date: 'Oct 20, 2023', time: '16:45 PM', result: 'Anger', option: 'Option A', badgeClass: 'bg-[#FFE5F4] text-[#FF0099]' },
];

export default function UserHistoryPage() {
  const params = useParams();
  const [selectedAttempt, setSelectedAttempt] = React.useState<any>(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-slate-500">
            <Link href="/users" className="text-sm hover:text-[#00aaff]">Users</Link>
            <ChevronRight size={14} />
            <span className="text-sm font-semibold text-slate-800">Alex Rivera</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-[#00aaff]">
              <Share2 size={20} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <p className="text-sm font-medium">Alex Rivera</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="flex justify-between items-end mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">Alex Rivera&apos;s <br/>Attempt History</h2>
              <div className="flex items-center gap-2 mt-2 text-slate-500">
                <span className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded">Super Admin</span>
                <span className="text-xs">•</span>
                <span className="text-xs font-medium">User ID: #8824</span>
              </div>
            </motion.div>
            <button className="flex items-center gap-2 border border-slate-200 bg-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow text-sm font-semibold text-slate-700">
              <Download size={16} />
              Export Data
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center"
            >
              <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wide">Total Attempts</p>
              <p className="text-6xl font-extrabold text-slate-900 mb-4">12</p>
              <p className="text-xs text-slate-400 mb-6">Across all modules</p>
              <div className="w-12 h-1.5 bg-[#00aaff] rounded-full"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center"
            >
              <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wide">Most Frequent Result</p>
              <div className="bg-[#FFE5F4] text-[#FF0099] px-6 py-2 rounded-full text-xl font-bold mb-4">
                Anger
              </div>
              <p className="text-xs text-slate-400 mb-6">Occurred in 45% of attempts</p>
              <div className="w-12 h-1.5 bg-[#FF0099] rounded-full"></div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Attempts</h3>
              <span className="text-xs text-slate-400">Showing last 12 entries</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Character Result</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userHistory.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">{attempt.date}</p>
                      <p className="text-xs text-slate-400">{attempt.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${attempt.badgeClass} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                        {attempt.result}
                      </span>
                    </td>
             
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedAttempt(attempt)}
                        className="text-[#00aaff] text-xs font-bold hover:underline"
                      >
                        View Breakdown
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
              <button className="text-[#00aaff] text-sm font-semibold hover:text-[#0088cc] transition-colors">Load More History</button>
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {selectedAttempt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold tracking-tight">Quiz Attempt Details</h1>
                  <p className="text-slate-500 text-sm">User: <span className="font-semibold text-slate-900">Alex Rivera</span></p>
                </div>
                <button 
                  onClick={() => setSelectedAttempt(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-8">
                <section>
                  <div className="flex items-center gap-8 bg-[#00aaff]/5 p-6 rounded-xl border border-[#00aaff]/10">
                    <div className="size-28 rounded-full bg-[#00aaff]/10 border-4 border-[#00aaff] flex flex-col items-center justify-center shrink-0">
                      <span className="text-[#00aaff] font-bold text-center leading-tight px-2">{selectedAttempt.result}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">CHARACTER RESULT ANALYSIS</h3>
                      <div className="flex flex-col mb-1">
                      
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <History size={16} className="text-[#00aaff]" />
                        <span className="text-sm font-medium">{selectedAttempt.date}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                    <ListTodo size={18} className="text-slate-400" />
                    Answers Breakdown
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="shrink-0 flex items-center justify-center size-10 rounded-full bg-[#00aaff]/10 text-[#00aaff]"><User size={18} /></div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">1. What is the primary purpose of a firewall in a network security architecture?</p>
                        <p className="text-sm text-slate-500">
                          User Answer: <span className="text-[#00aaff] font-medium italic">Filtering network traffic based on security rules</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="shrink-0 flex items-center justify-center size-10 rounded-full bg-[#00aaff]/10 text-[#00aaff]"><User size={18} /></div>
                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-sm font-semibold">2. Which protocol is typically used for providing secure remote shell access?</p>
                        <p className="text-sm text-slate-500">
                          User Answer: <span className="font-medium italic text-[#00aaff]">Telnet (Port 23)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3 sticky bottom-0 justify-center">
                <button className="aspect-square bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center p-2.5 transition-all">
                  <Download size={20} />
                </button>
                <button className="aspect-square bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center p-2.5 transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
