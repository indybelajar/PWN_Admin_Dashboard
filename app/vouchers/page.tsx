'use client'

import * as React from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { Search, X, CheckCircle, XCircle, Mail, MailCheck, Clock, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

type ClaimStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

type Claim = {
  id: string
  userId: string
  proofImageUrl: string
  status: ClaimStatus
  createdAt: string
  emailSent?: boolean // UI-only, belum di API spec
}

const DUMMY_CLAIMS: Claim[] = [
  { id: 'claim-001', userId: 'user-abc123', proofImageUrl: 'https://placehold.co/800x450/f0f4ff/94a3b8?text=IG+Story+1', status: 'PENDING',  createdAt: '2025-03-10T08:30:00.000Z', emailSent: false },
  { id: 'claim-002', userId: 'user-def456', proofImageUrl: 'https://placehold.co/800x450/f0fff4/94a3b8?text=IG+Story+2', status: 'APPROVED', createdAt: '2025-03-09T14:15:00.000Z', emailSent: true  },
  { id: 'claim-003', userId: 'user-ghi789', proofImageUrl: 'https://placehold.co/800x450/fff0f0/94a3b8?text=IG+Story+3', status: 'REJECTED', createdAt: '2025-03-08T11:00:00.000Z', emailSent: true  },
  { id: 'claim-004', userId: 'user-jkl012', proofImageUrl: 'https://placehold.co/800x450/f0f4ff/94a3b8?text=IG+Story+4', status: 'PENDING',  createdAt: '2025-03-07T09:45:00.000Z', emailSent: false },
  { id: 'claim-005', userId: 'user-mno345', proofImageUrl: 'https://placehold.co/800x450/fff8f0/94a3b8?text=IG+Story+5', status: 'APPROVED', createdAt: '2025-03-06T16:20:00.000Z', emailSent: false },
]

const STATUS_CONFIG: Record<ClaimStatus, { label: string; dot: string; row: string; pill: string }> = {
  PENDING:  { label: 'Pending',  dot: 'bg-amber-400',   row: '',  pill: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200/80' },
  APPROVED: { label: 'Approved', dot: 'bg-emerald-400', row: '',  pill: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/80' },
  REJECTED: { label: 'Rejected', dot: 'bg-rose-400',    row: '',  pill: 'bg-rose-50 text-rose-500 ring-1 ring-rose-200/80' },
}

export default function VoucherApplicationsPage() {
  const [claims, setClaims]               = React.useState<Claim[]>(DUMMY_CLAIMS)
  const [selectedClaim, setSelectedClaim] = React.useState<Claim | null>(null)
  const [searchQuery, setSearchQuery]     = React.useState('')
  const [loading]                         = React.useState(false)
  const [actionLoading, setActionLoading] = React.useState(false)
  const [justActioned, setJustActioned]   = React.useState<ClaimStatus | null>(null)

  const PAGE_SIZE = 10
  const [page, setPage] = React.useState(1)

  const filteredClaims = React.useMemo(() =>
    claims.filter(c =>
      c.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    ), [claims, searchQuery]
  )

  const totalPages  = Math.max(1, Math.ceil(filteredClaims.length / PAGE_SIZE))
  const pagedClaims = filteredClaims.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  React.useEffect(() => { setPage(1) }, [searchQuery])

  const handleAction = async (status: ClaimStatus) => {
    if (!selectedClaim) return
    setActionLoading(true)
    try {
      // await fetch(`/api/admin/promo/claims/${selectedClaim.id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status }),
      // })
      setClaims(prev => prev.map(c => c.id === selectedClaim.id ? { ...c, status } : c))
      setSelectedClaim(prev => prev ? { ...prev, status } : null)
      setJustActioned(status)
      setTimeout(() => setJustActioned(null), 1600)
    } catch (err) { console.error(err) }
    setActionLoading(false)
  }

  const handleToggleEmail = (claimId: string) => {
    setClaims(prev => prev.map(c => c.id === claimId ? { ...c, emailSent: !c.emailSent } : c))
    setSelectedClaim(prev => prev?.id === claimId ? { ...prev, emailSent: !prev.emailSent } : prev)
  }

  const closeModal = () => { setSelectedClaim(null); setJustActioned(null) }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

  const counts = React.useMemo(() => ({
    total:    claims.length,
    pending:  claims.filter(c => c.status === 'PENDING').length,
    approved: claims.filter(c => c.status === 'APPROVED').length,
    rejected: claims.filter(c => c.status === 'REJECTED').length,
  }), [claims])

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f8fc]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Navbar title="Voucher Applications" />

        <div className="p-8 space-y-6">

          {/* ── Header ── */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Voucher Applications</h2>
            <p className="text-slate-400 text-sm mt-0.5">Review and manage incoming promo claims</p>
          </div>

          {/* ── Search ── */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-[#00aaff] transition-colors" size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border-slate-200 bg-slate-50 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00aaff]/20 focus:border-[#00aaff] transition-all"
                placeholder="Search by user ID or claim ID..."
              />
            </div>
          </div>

          {/* ── Stat pills ── */}
          <div className="flex gap-2 flex-wrap">
            {[
              { label: 'Total',    value: counts.total,    cls: 'bg-white text-slate-500 ring-1 ring-slate-200' },
              { label: 'Pending',  value: counts.pending,  cls: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100' },
              { label: 'Approved', value: counts.approved, cls: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' },
              { label: 'Rejected', value: counts.rejected, cls: 'bg-rose-50 text-rose-500 ring-1 ring-rose-100' },
            ].map(s => (
              <span key={s.label} className={`${s.cls} px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2`}>
                <span className="font-bold text-sm">{s.value}</span>
                <span className="opacity-60">{s.label}</span>
              </span>
            ))}
          </div>

          {/* ── Table ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm shadow-slate-200/60 ring-1 ring-slate-100"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Claim ID</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-300 text-sm">
                      Loading claims…
                    </td>
                  </tr>
                )}

                {!loading && pagedClaims.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-slate-300 text-sm">
                      No claims found.
                    </td>
                  </tr>
                )}

                {!loading && pagedClaims.map((claim, i) => {
                  const cfg = STATUS_CONFIG[claim.status]
                  return (
                    <motion.tr
                      key={claim.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Claim ID */}
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-400">{claim.id}</span>
                      </td>

                      {/* User ID */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-700">{claim.userId}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`${cfg.pill} inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} shrink-0`} />
                          {cfg.label}
                        </span>
                      </td>

                      {/* Email sent indicator */}
                      <td className="px-6 py-4">
                        {claim.emailSent ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-500">
                            <MailCheck size={13} /> Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                            <Mail size={13} /> —
                          </span>
                        )}
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-400">{formatDate(claim.createdAt)}</span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedClaim(claim)}
                           className="text-[#00aaff] hover:text-[#00aaff]/80 font-bold text-sm transition-colors"
                        >
                          Review 
                        </button>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-slate-50">
              <p className="text-xs text-slate-400">
                {filteredClaims.length} claims · page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-1.5 rounded-xl text-xs font-medium border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-50 transition-colors text-slate-600"
                >
                  Prev
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-1.5 rounded-xl text-xs font-medium border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-50 transition-colors text-slate-600"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════ MODAL ══════════════════════ */}
        <AnimatePresence>
          {selectedClaim && (() => {
            const cfg = STATUS_CONFIG[selectedClaim.status]
            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                  onClick={closeModal}
                />

                <motion.div
                  initial={{ scale: 0.97, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.97, opacity: 0, y: 10 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl shadow-slate-900/10 overflow-hidden flex"
                >
                  {/* ── Kiri: gambar portrait ── */}
                  <div className="relative bg-black shrink-0" style={{ width: '260px' }}>
                    <img
                      src={selectedClaim.proofImageUrl}
                      alt="Proof of IG Story"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                    {/* Status chip */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`${cfg.pill} bg-white/90 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Flash on action */}
                    <AnimatePresence>
                      {justActioned && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        >
                          <div className="bg-white rounded-2xl px-4 py-3 flex flex-col items-center gap-2 shadow-lg">
                            {justActioned === 'APPROVED'
                              ? <CheckCircle className="text-emerald-500" size={24} />
                              : <XCircle className="text-rose-500" size={24} />
                            }
                            <span className="font-bold text-slate-800 text-xs">
                              {justActioned === 'APPROVED' ? 'Approved' : 'Rejected'}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Kanan: info + actions ── */}
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-700">Claim Detail</p>
                      <button
                        onClick={closeModal}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Meta info */}
                    <div className="px-5 py-4 space-y-2.5 flex-1">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Claim ID</p>
                        <p className="text-xs font-mono text-slate-500">{selectedClaim.id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">User ID</p>
                        <p className="text-sm font-bold text-slate-800">{selectedClaim.userId}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Submitted</p>
                        <p className="text-xs text-slate-500">{formatDate(selectedClaim.createdAt)}</p>
                      </div>

                      {/* Email toggle */}
                      <div className="pt-1">
                        <button
                          onClick={() => handleToggleEmail(selectedClaim.id)}
                          className={`w-full flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all
                            ${selectedClaim.emailSent
                              ? 'bg-sky-50 text-sky-500 ring-1 ring-sky-200 hover:bg-sky-100'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                            }`}
                        >
                          {selectedClaim.emailSent
                            ? <><MailCheck size={13} /> Emailed</>
                            : <><Mail size={13} /> Mark as emailed</>
                          }
                        </button>
                      </div>
                    </div>

                    {/* Action buttons — always editable, pinned to bottom */}
                    <div className="px-5 pb-5 space-y-2 border-t border-slate-100 pt-4">
                      {selectedClaim.status !== 'PENDING' && (
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide flex items-center gap-1.5">
                          <RotateCcw size={10} /> Change decision
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          disabled={actionLoading}
                          onClick={() => handleAction('APPROVED')}
                          className={`flex-1 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200
                            ${selectedClaim.status === 'APPROVED'
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:shadow-emerald-200'
                            } disabled:opacity-40`}
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          disabled={actionLoading}
                          onClick={() => handleAction('REJECTED')}
                          className={`flex-1 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200
                            ${selectedClaim.status === 'REJECTED'
                              ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                              : 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-200'
                            } disabled:opacity-40`}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })()}
        </AnimatePresence>
      </main>
    </div>
  )
}