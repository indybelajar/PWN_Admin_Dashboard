'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Download, ChevronRight, X, History, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Shape dari GET /api/quiz/attempts
type PersonalityCode =
  | 'ANGER_CORE'
  | 'HAPPY_CORE'
  | 'SAD_CORE'
  | 'FEAR_CORE'
  | 'DISGUST_CORE'
  | 'LOVE_CORE'
  | 'MIX_FEELINGS'

type QuizAttempt = {
  id: string
  userId: string
  personalityCode: PersonalityCode
  attemptNumber: number
  createdAt: string
}

// Shape dari GET /api/users/me (dipakai juga untuk user detail)
type UserProfile = {
  id: string
  email: string
  full_name: string
  display_name: string | null
  age: number | null
  wishlist_guest_star: string | null
  role: 'USER' | 'ADMIN'
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const PERSONALITY_LABELS: Record<PersonalityCode, string> = {
  ANGER_CORE: 'Anger',
  HAPPY_CORE: 'Happy',
  SAD_CORE: 'Sadness',
  FEAR_CORE: 'Fear',
  DISGUST_CORE: 'Disgust',
  LOVE_CORE: 'Love',
  MIX_FEELINGS: 'Mix Feelings',
}

const PERSONALITY_BADGE: Record<PersonalityCode, string> = {
  ANGER_CORE: 'bg-[#FFE5F4] text-[#FF0099]',
  HAPPY_CORE: 'bg-[#E6FFF2] text-[#00C853]',
  SAD_CORE: 'bg-[#E6F0FF] text-[#0066FF]',
  FEAR_CORE: 'bg-[#FFF3E0] text-[#FF6D00]',
  DISGUST_CORE: 'bg-[#F3E5F5] text-[#7B1FA2]',
  LOVE_CORE: 'bg-[#FCE4EC] text-[#E91E63]',
  MIX_FEELINGS: 'bg-[#E8F5E9] text-[#2E7D32]',
}

// ── Dummy data (sesuai shape API spec) ──────────────────────────────────────

const DUMMY_USER: UserProfile = {
  id: 'user-abc123',
  email: 'alex@example.com',
  full_name: 'Alex Rivera',
  display_name: 'alexrivera',
  age: 22,
  wishlist_guest_star: 'Tulus',
  role: 'USER',
}

const DUMMY_ATTEMPTS: QuizAttempt[] = [
  { id: 'att-001', userId: 'user-abc123', personalityCode: 'ANGER_CORE',   attemptNumber: 4, createdAt: '2025-10-24T14:32:00.000Z' },
  { id: 'att-002', userId: 'user-abc123', personalityCode: 'HAPPY_CORE',   attemptNumber: 3, createdAt: '2025-10-23T09:15:00.000Z' },
  { id: 'att-003', userId: 'user-abc123', personalityCode: 'SAD_CORE',     attemptNumber: 2, createdAt: '2025-10-22T11:04:00.000Z' },
  { id: 'att-004', userId: 'user-abc123', personalityCode: 'ANGER_CORE',   attemptNumber: 1, createdAt: '2025-10-20T16:45:00.000Z' },
  { id: 'att-005', userId: 'user-abc123', personalityCode: 'MIX_FEELINGS', attemptNumber: 5, createdAt: '2025-10-19T08:00:00.000Z' },
  { id: 'att-006', userId: 'user-abc123', personalityCode: 'FEAR_CORE',    attemptNumber: 6, createdAt: '2025-10-18T13:22:00.000Z' },
]

// Most frequent personalityCode helper
function mostFrequent(attempts: QuizAttempt[]): PersonalityCode | null {
  if (!attempts.length) return null
  const counts = attempts.reduce((acc, a) => {
    acc[a.personalityCode] = (acc[a.personalityCode] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as PersonalityCode
}

// ────────────────────────────────────────────────────────────────────────────

export default function UserHistoryPage() {
  const params = useParams()
  const userId = params?.id as string

  const [user] = React.useState<UserProfile>(DUMMY_USER)
  // GET /api/quiz/attempts — returns QuizAttempt[]
  const [attempts] = React.useState<QuizAttempt[]>(DUMMY_ATTEMPTS)
  const [selectedAttempt, setSelectedAttempt] = React.useState<QuizAttempt | null>(null)

  const topPersonality = mostFrequent(attempts)

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Breadcrumb header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2 text-slate-500">
            <Link href="/users" className="text-sm hover:text-[#00aaff]">Users</Link>
            <ChevronRight size={14} />
            {/* full_name dari API spec */}
            <span className="text-sm font-semibold text-slate-800">{user.full_name}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-[#00aaff]">
              <Share2 size={20} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <p className="text-sm font-medium">{user.full_name}</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">

          {/* Page title */}
          <div className="flex justify-between items-end mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* full_name dari API spec */}
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                {user.full_name}&apos;s<br />Attempt History
              </h2>
              <div className="flex items-center gap-2 mt-2 text-slate-500">
                {/* role dari API spec enum */}
                <span className={`text-xs px-2 py-1 rounded font-bold
                  ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-700'}`}>
                  {user.role}
                </span>
                <span className="text-xs">•</span>
                {/* id dari API spec */}
                <span className="text-xs font-medium font-mono">ID: {user.id}</span>
                {/* display_name dari API spec (nullable) */}
                {user.display_name && (
                  <>
                    <span className="text-xs">•</span>
                    <span className="text-xs text-slate-400">@{user.display_name}</span>
                  </>
                )}
              </div>
            </motion.div>
            <button className="flex items-center gap-2 border border-slate-200 bg-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow text-sm font-semibold text-slate-700">
              <Download size={16} />
              Export Data
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center"
            >
              <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wide">Total Attempts</p>
              {/* attemptNumber dari API spec */}
              <p className="text-6xl font-extrabold text-slate-900 mb-4">{attempts.length}</p>
              <p className="text-xs text-slate-400 mb-6">Across all personality types</p>
              <div className="w-12 h-1.5 bg-[#00aaff] rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center"
            >
              <p className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wide">Most Frequent Result</p>
              {topPersonality ? (
                <>
                  {/* personalityCode dari API spec */}
                  <div className={`${PERSONALITY_BADGE[topPersonality]} px-6 py-2 rounded-full text-xl font-bold mb-4`}>
                    {PERSONALITY_LABELS[topPersonality]}
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    {Math.round(
                      (attempts.filter(a => a.personalityCode === topPersonality).length / attempts.length) * 100
                    )}% of attempts
                  </p>
                  <div className={`w-12 h-1.5 rounded-full ${PERSONALITY_BADGE[topPersonality].split(' ')[0]}`} />
                </>
              ) : (
                <p className="text-slate-400">No attempts yet</p>
              )}
            </motion.div>
          </div>

          {/* Attempts table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[20px] shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Quiz Attempts</h3>
              <span className="text-xs text-slate-400">Showing {attempts.length} entries</span>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  {/* attemptNumber dari API spec */}
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                  {/* createdAt dari API spec */}
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  {/* personalityCode dari API spec */}
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Personality</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attempts.map(attempt => (
                  <tr key={attempt.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-400 text-sm font-mono">
                      {attempt.attemptNumber}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {formatDate(attempt.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${PERSONALITY_BADGE[attempt.personalityCode]} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                        {PERSONALITY_LABELS[attempt.personalityCode]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedAttempt(attempt)}
                        className="text-[#00aaff] text-xs font-bold hover:underline"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAttempt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Attempt Detail</h1>
                  <p className="text-slate-500 text-sm">
                    User: <span className="font-semibold text-slate-900">{user.full_name}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAttempt(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-6">
                {/* Attempt info — semua field dari API spec */}
                <div className="bg-[#00aaff]/5 p-6 rounded-xl border border-[#00aaff]/10 flex items-center gap-6">
                  <div className={`size-24 rounded-full border-4 ${PERSONALITY_BADGE[selectedAttempt.personalityCode].split(' ')[0]} border-current flex flex-col items-center justify-center shrink-0`}>
                    <span className={`${PERSONALITY_BADGE[selectedAttempt.personalityCode]} font-bold text-center text-sm leading-tight px-2 rounded-full py-1`}>
                      {PERSONALITY_LABELS[selectedAttempt.personalityCode]}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <History size={15} className="text-[#00aaff]" />
                      {/* createdAt dari API spec */}
                      <span>{formatDate(selectedAttempt.createdAt)}</span>
                    </div>
                    <p className="text-slate-500">
                      <b>Attempt #</b>{selectedAttempt.attemptNumber}
                    </p>
                    <p className="text-slate-500 font-mono text-xs">
                      ID: {selectedAttempt.id}
                    </p>
                    <p className="text-slate-500">
                      {/* personalityCode dari API spec */}
                      <b>Code:</b> <span className="font-mono">{selectedAttempt.personalityCode}</span>
                    </p>
                  </div>
                </div>

              
              </div>

    
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}