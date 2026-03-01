'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Download, Filter, ChevronRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const attempts = [
  { 
    id: 1, 
    name: 'Alex Rivera', 
    email: 'alex.r@example.com', 
    result: 'Joy', 
    color: 'bg-green-100 text-green-700',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe-BlYWGir4P7_Wx7bN6toz4Wez7aTYSLLit1rW1pDoB4sZfgupaGr7eZ5M1WMD2CV5wzOlw_57VbCpGcEtrMXcUzSvaAngodvVoILNI1oBC7KvU-Hz4I1EfIQm5ANuaBOXAIy90TUl7wBjclW2odqaZM7MvyNnzoXre5dHE0yF1H2dDi1wUHz262APdhNXgB34bUAEfwp8zK1tLGZrB6CSX7Mr9QkrRan8PQe9Y1_gCy1HMcdBSIF5x-En4SVRrKbM-prycoQu8Zj'
  },
  { 
    id: 2, 
    name: 'Jordan Smith', 
    email: 'j.smith@email.com', 
    result: 'Peace', 
    color: 'bg-blue-100 text-blue-700',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIDCfebBJoBP9584CGi5sglFbxl-LXFJ2MlwjJ6bACsnleOwvsYIzJdxA3NAfarObWSoUlPZt6HqKRHV6hMjbv1YSWjzCFq8Kvgg-3IJcIdzd-T4icz2UweeoiVMgV-TvINM7CGje6EY49Oupx0k1IduNl3ywTjiPpmqINMrlkOE6Vljtth9LddO7gTERW-gjn-TqA4nfp0KUfgttlhWZm8BIBMukwyBbfxDfYfr3dXovavxq8d6msWWGrouxM3JCQOhl6QcSvE6gy'
  },
  { 
    id: 3, 
    name: 'Casey Chen', 
    email: 'casey.c@provider.net', 
    result: 'Anger', 
    color: 'bg-red-100 text-red-700',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFkQY54GDnwELGLxqi2QeRddhm-ink4dNBpH5ptXNY8-2Sj5VBSUAYwa36HvpG-uxQW3ROo5WPVZjXLBLZY-PH_L9HWJ8RnBpMMMHsKUginFiPiCI_RIzihjBPGCWLj7qwM11URMrmEyg5yTF8j7EAHWnJeApa5VQcbG23nUyQ8pCoFqBrgRyK0iPsG5LV0JMSz8VqYtwhjIpUhktOFqGJEBvuuqxjIw9rFsYAUAcFffd1xT8kQPKYG-RiWRik21YNSF5xLMvp4dBo'
  },
  { 
    id: 4, 
    name: 'Taylor Velez', 
    email: 't.velez@web.com', 
    result: 'Sadness', 
    color: 'bg-indigo-100 text-indigo-700',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvB8QqS8cNl1_j8KTt3rT48GBIUhYXVTp0VpcSNcVciicXifoQ7k9XXFQE4S43KlpQ3izeTPR7iVu3E4Pgx5eXgpjlyIxE5d_BrNiLN0r4Th-9dHIaoAd_BKB6N1SmyfwokkB45wELG4H3JRU6QjflpOtlMvXgiyvKgBLM0nE-SRNn-bPaDiQB50NYQuH-rFt9a7eYGJ6WGd5jpU29V-MN2aos3byeUQfPquPDqLydHKV_CYbod3-s6MO26cjFMA5GFkgFninYw33s'
  },
  { 
    id: 5, 
    name: 'Morgan Lee', 
    email: 'm.lee@domain.org', 
    result: 'Fear', 
    color: 'bg-purple-100 text-purple-700',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS9kDBB8rFrqA5eZDh8zzC1FqxPbG-Ir-ckHGO_R__OO-0xxn95gwaqscuGdzNQaEhtT3OammCsi4CJdVn3uiGUUu333smTCLibM3oCBMzO_r_SylY07ofkNjaUR93IYHH9scQLVKuG2P-zzqT0b-dsTw2y8a45NWlrI3bmWvmE4mTakZEe3biRI_mxVDHfGyBfNB4PsiiM5-Gy1WionPdEZEHZYjHWx0HUlnz2ddnVkATdamkmK8XxjKJCjEdd_D1kU9PvLzfnejF'
  },
];

export default function AttemptsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50/50">
        <header className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-slate-900">Recent Quiz Takers</h2>
              <p className="text-slate-500 text-sm">Manage and view all quiz attempt histories and results.</p>
            </motion.div>
            <div className="flex items-center gap-3">
              <button className="bg-[#00aaff] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#00aaff]/90 transition-all flex items-center gap-2">
                <Download size={16} />
                Export Data
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#00aaff]/20 focus:border-[#00aaff] outline-none text-sm transition-all" 
                placeholder="Search by user name or email..." 
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Emotion Result</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attempts.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-[#00aaff]/10 flex items-center justify-center overflow-hidden">
                          <img src={attempt.avatar} alt={attempt.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{attempt.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{attempt.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${attempt.color}`}>
                        {attempt.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/users/${attempt.id}`} className="text-[#00aaff] hover:text-[#00aaff]/80 text-sm font-bold flex items-center gap-1 ml-auto">
                        View History
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-500">Showing 1 to 5 of 48 entries</p>
              <div className="flex items-center gap-1">
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                  <ChevronRight size={18} className="rotate-180" />
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg bg-[#00aaff] text-white text-xs font-bold">1</button>
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-xs">2</button>
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-xs">3</button>
                <span className="px-2 text-slate-400 text-xs">...</span>
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-xs">10</button>
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
