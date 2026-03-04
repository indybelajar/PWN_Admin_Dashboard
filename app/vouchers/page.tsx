'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { 
  Search, 
  X, 
  CheckCircle, 
  XCircle, 
  Mail, 
  AtSign, 
  ZoomIn,
  Ticket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const applications = [
  { 
    id: '12345', 
    name: 'Alex Johnson', 
    handle: '@alex_j_lifestyle', 
    status: 'Pending', 
    submittedAt: '2 hours ago',
    email: 'alex.johnson@example.com',
    campaign: 'Winter Essentials',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxCnif-eKJ-7g6k9YNlNGfUd4X9AAPM50dT9NlHAUxG1Q2vazQKOMx4csW31cSxsmW3pupgkW7OMp1dOepXbLKr33x2gICpR8kJWbDQLsgOxhy-22ci3fugLNe3g6YmYOLE2N2r86k7P8ZhXbDj8hhpn18gLZTzu3yWCLz2u8um7k1mpGm4RAIFmni_kIIcY70ehme6ZCCfVXCzToRBf24_7hCXKTfXrUqVm7SFx_Naed4VjV0dLjIQqiYipSCAJcQNHtUAqkKk8LA',
    screenshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO2XeV5rfBSMAQ3w4yHDagCEwuYdkq_kD-rPLYEmP2WKMQ4dQ2psrJjOo9GC7cUf49cPHTQD_ZAhj7iJub8PFjCB7Ry2zSBtNlAkfGcfBZYET2T97fnFNiBR-Uznx8Aosx4N21SI2B7Mo3eQXqBUhJFijfe0hDbY7vRCHLf3KX2gDifHD7tlmG4viUrNLs1WBJNVWUZTu8AO-kIYqdDnA3PLRQcH2WoK9EDPXR3YMaYk8568_FWP-yxpq4kbDb-jo9UTpLS-X5ibb9'
  },
  { 
    id: '12346', 
    name: 'Sarah Miller', 
    handle: '@sarah_creates', 
    status: 'Pending', 
    submittedAt: '5 hours ago',
    email: 'sarah.miller@example.com',
    campaign: 'Winter Essentials',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUh24vZSoN36i8U57ORgdljqCnfj9X998oFkaTKOdXSKLmgauCadEpZPS81tbCSboMZZLtqbonlQdLQcqTkbxskFatf1R6FXyfVLhRzhbYTxs-hBcLHASI9SngyMHVdSpTOzjBK1Sezkbm4rxK2zSeZhNr-QBHBVmVIfCicV2m7STKFyMeNqnkJZMNvh6WbuZa_edg9r4PtRNFfIpsTJTXIHlnLCQUhniBX7yikVB9yFCtdJ3x7rFS_izK7L2ZwKmHlsdqB8_T6Tv',
    screenshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO2XeV5rfBSMAQ3w4yHDagCEwuYdkq_kD-rPLYEmP2WKMQ4dQ2psrJjOo9GC7cUf49cPHTQD_ZAhj7iJub8PFjCB7Ry2zSBtNlAkfGcfBZYET2T97fnFNiBR-Uznx8Aosx4N21SI2B7Mo3eQXqBUhJFijfe0hDbY7vRCHLf3KX2gDifHD7tlmG4viUrNLs1WBJNVWUZTu8AO-kIYqdDnA3PLRQcH2WoK9EDPXR3YMaYk8568_FWP-yxpq4kbDb-jo9UTpLS-X5ibb9'
  },
];

export default function VoucherApplicationsPage() {
  const [selectedApp, setSelectedApp] = React.useState<any>(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative bg-slate-50">
        <Navbar title="Voucher Applications" />
        
        <div className="p-8">
          <div className="flex justify-between items-end mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold tracking-tight">Voucher Applications</h2>
              <p className="text-slate-500 mt-1">Review and manage pending influencer submissions.</p>
            </motion.div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00aaff]/50" 
                  placeholder="Search applications..." 
                  type="text"
                />
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full bg-slate-200 bg-center bg-cover border border-slate-100" 
                          style={{ backgroundImage: `url('${app.avatar}')` }}
                        ></div>
                        <div>
                          <p className="text-sm font-semibold">{app.name}</p>
                          <p className="text-xs text-slate-500">{app.handle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700">
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{app.submittedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="text-[#00aaff] text-sm font-semibold hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedApp(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold">Application #{selectedApp.id}</h3>
                    <p className="text-sm text-slate-500">Submitted for &quot;{selectedApp.campaign}&quot; Campaign</p>
                  </div>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8 overflow-y-auto space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div 
                      className="w-24 h-24 rounded-full bg-slate-200 shrink-0 border-4 border-slate-50 shadow-sm bg-center bg-cover" 
                      style={{ backgroundImage: `url('${selectedApp.avatar}')` }}
                    ></div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-bold text-slate-900">{selectedApp.name}</h4>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail size={14} />
                          <span className="text-sm">{selectedApp.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#00aaff]">
                          <AtSign size={14} />
                          <span className="text-sm font-medium">{selectedApp.handle}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold uppercase tracking-widest text-slate-400">Submitted Screenshot</h5>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium">VERIFIED_METADATA</span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-50 flex items-center justify-center relative group">
                      <div 
                        className="absolute inset-0 bg-center bg-cover transition-transform group-hover:scale-105" 
                        style={{ backgroundImage: `url('${selectedApp.screenshot}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <button className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 shadow-lg">
                          <ZoomIn size={16} />
                          View Full Size
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-[#00aaff] hover:bg-[#00aaff]/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00aaff]/20">
                    <CheckCircle size={20} />
                    Approve Application
                  </button>
                  <button className="flex-1 border-2 border-[#FF0099] text-[#FF0099] hover:bg-[#FF0099] hover:text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                    <XCircle size={20} />
                    Reject Submission
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
