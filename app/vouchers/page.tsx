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
    status: 'Pending', 
    submittedAt: '2 hours ago',
    email: 'alex.johnson@example.com',
    campaign: 'Winter Essentials',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxCnif-eKJ-7g6k9YNlNGfUd4X9AAPM50dT9NlHAUxG1Q2vazQKOMx4csW31cSxsmW3pupgkW7OMp1dOepXbLKr33x2gICpR8kJWbDQLsgOxhy-22ci3fugLNe3g6YmYOLE2N2r86k7P8ZhXbDj8hhpn18gLZTzu3yWCLz2u8um7k1mpGm4RAIFmni_kIIcY70ehme6ZCCfVXCzToRBf24_7hCXKTfXrUqVm7SFx_Naed4VjV0dLjIQqiYipSCAJcQNHtUAqkKk8LA',
    screenshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO2XeV5rfBSMAQ3w4yHDagCEwuYdkq_kD-rPLYEmP2WKMQ4dQ2psrJjOo9GC7cUf49cPHTQD_ZAhj7iJub8PFjCB7Ry2zSBtNlAkfGcfBZYET2T97fnFNiBR-Uznx8Aosx4N21SI2B7Mo3eQXqBUhJFijfe0hDbY7vRCHLf3KX2gDifHD7tlmG4viUrNLs1WBJNVWUZTu8AO-kIYqdDnA3PLRQcH2WoK9EDPXR3YMaYk8568_FWP-yxpq4kbDb-jo9UTpLS-X5ibb9',
    emailed: false
  },
  { 
    id: '12346', 
    name: 'Sarah Miller', 
    status: 'Pending', 
    submittedAt: '5 hours ago',
    email: 'sarah.miller@example.com',
    campaign: 'Winter Essentials',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUh24vZSoN36i8U57ORgdljqCnfj9X998oFkaTKOdXSKLmgauCadEpZPS81tbCSboMZZLtqbonlQdLQcqTkbxskFatf1R6FXyfVLhRzhbYTxs-hBcLHASI9SngyMHVdSpTOzjBK1Sezkbm4rxK2zSeZhNr-QBHBVmVIfCicV2m7STKFyMeNqnkJZMNvh6WbuZa_edg9r4PtRNFfIpsTJTXIHlnLCQUhniBX7yikVB9yFCtdJ3x7rFS_izK7L2ZwKmHlsdqB8_T6Tv',
    screenshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO2XeV5rfBSMAQ3w4yHDagCEwuYdkq_kD-rPLYEmP2WKMQ4dQ2psrJjOo9GC7cUf49cPHTQD_ZAhj7iJub8PFjCB7Ry2zSBtNlAkfGcfBZYET2T97fnFNiBR-Uznx8Aosx4N21SI2B7Mo3eQXqBUhJFijfe0hDbY7vRCHLf3KX2gDifHD7tlmG4viUrNLs1WBJNVWUZTu8AO-kIYqdDnA3PLRQcH2WoK9EDPXR3YMaYk8568_FWP-yxpq4kbDb-jo9UTpLS-X5ibb9',
    emailed: false
  },
];

export default function VoucherApplicationsPage() {
  const [appList, setAppList] = React.useState(applications);
  const [selectedApp, setSelectedApp] = React.useState<any>(null);
  const [actionResult, setActionResult] = React.useState<'approved' | 'rejected' | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [rejectionNote, setRejectionNote] = React.useState('');
  const [isRejecting, setIsRejecting] = React.useState(false);

  const handleAction = (type: 'approved' | 'rejected') => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setActionResult(type);
      
      // Update the status in the list
      setAppList(prev => prev.map(app => 
        app.id === selectedApp.id 
          ? { ...app, status: type === 'approved' ? 'Approved' : 'Rejected', note: type === 'rejected' ? rejectionNote : undefined } 
          : app
      ));
    }, 1500);
  };

  const toggleEmailed = (id: string) => {
    setAppList(prev => prev.map(app => 
      app.id === id ? { ...app, emailed: !app.emailed } : app
    ));
    if (selectedApp?.id === id) {
      setSelectedApp((prev: any) => ({ ...prev, emailed: !prev.emailed }));
    }
  };

  const closeModal = () => {
    setSelectedApp(null);
    setActionResult(null);
    setRejectionNote('');
    setIsRejecting(false);
  };

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
                  <th className="px-6 py-4">Emailed</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appList.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full bg-slate-200 bg-center bg-cover border border-slate-100" 
                          style={{ backgroundImage: `url('${app.avatar}')` }}
                        ></div>
                        <div>
                          <p className="text-sm font-semibold">{app.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {app.status === 'Approved' ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEmailed(app.id);
                          }}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-colors ${
                            app.emailed 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          <Mail size={12} fill={app.emailed ? 'currentColor' : 'none'} />
                          {app.emailed ? 'Emailed' : 'Not Emailed'}
                        </button>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
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
                    <h3 className="text-xl font-bold">
                      {actionResult ? 'Action Successful' : `Application #${selectedApp.id}`}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {actionResult 
                        ? `The application has been ${actionResult}.` 
                        : `Submitted for "${selectedApp.campaign}" Campaign`}
                    </p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8 overflow-y-auto min-h-[300px] flex flex-col">
                  <AnimatePresence mode="wait">
                    {!actionResult ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                      >
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
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-bold uppercase tracking-widest text-slate-400">Submitted Screenshot</h5>
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

                        <AnimatePresence>
                          {isRejecting && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3 pt-4 border-t border-slate-100"
                            >
                              <label className="block text-sm font-bold text-[#FF0099]">Rejection Reason (Optional)</label>
                              <textarea
                                value={rejectionNote}
                                onChange={(e) => setRejectionNote(e.target.value)}
                                placeholder="e.g. Screenshot is blurry, incorrect campaign, etc."
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0099]/20 min-h-[100px] resize-none"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center text-center py-12"
                      >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                          actionResult === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {actionResult === 'approved' ? <CheckCircle size={48} /> : <XCircle size={48} />}
                        </div>
                        <h4 className="text-2xl font-bold mb-2">
                          Application {actionResult === 'approved' ? 'Approved' : 'Rejected'}
                        </h4>
                        <p className="text-slate-500 max-w-xs">
                          {actionResult === 'approved' 
                            ? 'The applicant will be notified of your decision via email and in-app notification.'
                            : `Rejected with note: "${rejectionNote || 'No specific reason provided'}"`}
                        </p>
                        
                        {actionResult === 'approved' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 w-full max-w-sm"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                  <Mail size={20} />
                                </div>
                                <div className="text-left">
                                  <p className="text-sm font-bold text-blue-900">Voucher Delivery</p>
                                  <p className="text-xs text-blue-700">Mark if voucher was sent</p>
                                </div>
                              </div>
                              <button
                                onClick={() => toggleEmailed(selectedApp.id)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                  selectedApp.emailed 
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                                }`}
                              >
                                {selectedApp.emailed ? 'Marked as Emailed' : 'Mark as Emailed'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  {!actionResult ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      {!isRejecting ? (
                        <>
                          <button 
                            disabled={isProcessing}
                            onClick={() => handleAction('approved')}
                            className="flex-1 bg-[#00aaff] hover:bg-[#00aaff]/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00aaff]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <CheckCircle size={20} />
                            )}
                            {isProcessing ? 'Processing...' : 'Approve Application'}
                          </button>
                          <button 
                            disabled={isProcessing}
                            onClick={() => setIsRejecting(true)}
                            className="flex-1 border-2 border-[#FF0099] text-[#FF0099] hover:bg-[#FF0099] hover:text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <XCircle size={20} />
                            Reject Submission
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            disabled={isProcessing}
                            onClick={() => handleAction('rejected')}
                            className="flex-1 bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF0099]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <XCircle size={20} />
                            )}
                            {isProcessing ? 'Rejecting...' : 'Confirm Rejection'}
                          </button>
                          <button 
                            disabled={isProcessing}
                            onClick={() => {
                              setIsRejecting(false);
                              setRejectionNote('');
                            }}
                            className="px-6 border-2 border-slate-200 text-slate-500 hover:bg-slate-100 font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <button 
                      onClick={closeModal}
                      className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg transition-all hover:bg-slate-800"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
