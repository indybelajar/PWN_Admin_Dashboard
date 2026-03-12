'use client';

import * as React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { motion } from 'motion/react';
import Link from 'next/link';

// GET /api/quiz/attempts/count → { count: number }
// GET /api/users/me → single user only, no list endpoint in spec
// Recent attempts shape dari GET /api/quiz/attempts → QuizAttempt[]

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

const PERSONALITY_LABELS: Record<PersonalityCode, string> = {
  ANGER_CORE:   'Anger',
  HAPPY_CORE:   'Happy',
  SAD_CORE:     'Sadness',
  FEAR_CORE:    'Fear',
  DISGUST_CORE: 'Disgust',
  LOVE_CORE:    'Love',
  MIX_FEELINGS: 'Mix Feelings',
}

const PERSONALITY_BADGE: Record<PersonalityCode, string> = {
  ANGER_CORE:   'bg-[#FFE5F4] text-[#FF0099]',
  HAPPY_CORE:   'bg-[#E6FFF2] text-[#00C853]',
  SAD_CORE:     'bg-[#E6F0FF] text-[#0066FF]',
  FEAR_CORE:    'bg-[#FFF3E0] text-[#FF6D00]',
  DISGUST_CORE: 'bg-[#F3E5F5] text-[#7B1FA2]',
  LOVE_CORE:    'bg-[#FCE4EC] text-[#E91E63]',
  MIX_FEELINGS: 'bg-[#E8F5E9] text-[#2E7D32]',
}

// ── Dummy data sesuai shape API spec ─────────────────────────────────────────

const DUMMY_TOTAL_ATTEMPTS = 12840 // GET /api/quiz/attempts/count
const DUMMY_TOTAL_USERS    = 3120  // no endpoint yet, dummy saja

const DUMMY_RECENT_ATTEMPTS: (QuizAttempt & { userDisplayName: string; initials: string; avatarColor: string })[] = [
  { id: 'att-101', userId: 'user-abc123', personalityCode: 'ANGER_CORE',   attemptNumber: 4, createdAt: '2025-10-24T14:32:00.000Z', userDisplayName: 'Alex Johnson',  initials: 'AJ', avatarColor: 'bg-[#00aaff]/15 text-[#00aaff]' },
  { id: 'att-102', userId: 'user-def456', personalityCode: 'HAPPY_CORE',   attemptNumber: 2, createdAt: '2025-10-24T10:18:00.000Z', userDisplayName: 'Maria Garcia',  initials: 'MG', avatarColor: 'bg-[#FF0099]/15 text-[#FF0099]' },
  { id: 'att-103', userId: 'user-ghi789', personalityCode: 'SAD_CORE',     attemptNumber: 1, createdAt: '2025-10-23T16:05:00.000Z', userDisplayName: 'James Smith',   initials: 'JS', avatarColor: 'bg-slate-100 text-slate-500' },
  { id: 'att-104', userId: 'user-jkl012', personalityCode: 'MIX_FEELINGS', attemptNumber: 3, createdAt: '2025-10-23T09:44:00.000Z', userDisplayName: 'Chen Wei',      initials: 'CW', avatarColor: 'bg-emerald-50 text-emerald-600' },
  { id: 'att-105', userId: 'user-mno345', personalityCode: 'LOVE_CORE',    attemptNumber: 1, createdAt: '2025-10-22T13:20:00.000Z', userDisplayName: 'Kevin Brown',   initials: 'KB', avatarColor: 'bg-purple-50 text-purple-600' },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // GET /api/quiz/attempts/count
  const [totalAttempts] = React.useState(DUMMY_TOTAL_ATTEMPTS)
  const [totalUsers]    = React.useState(DUMMY_TOTAL_USERS)

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', { dateStyle: 'medium' })

  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Navbar title="Dashboard" />

        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">

          {/* ── Title ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">Dashboard Overview</h2>
            <p className="text-slate-400 text-sm mt-0.5">Monitor system performance and user activity.</p>
          </motion.div>

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                label: 'Total Quiz Attempts',
                // value dari GET /api/quiz/attempts/count
                value: totalAttempts.toLocaleString('id-ID'),
                note: 'Global across all users',
                accent: '#00aaff',
                delay: 0,
              },
              {
                label: 'Total Users',
                // no endpoint yet — dummy
                value: totalUsers.toLocaleString('id-ID'),
                note: 'Registered accounts',
                accent: '#FF0099',
                delay: 0.08,
              },
            ].map(stat => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: stat.delay }}
                className="bg-white rounded-2xl px-6 py-5 shadow-sm shadow-slate-200/50 ring-1 ring-slate-100"
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1.5">{stat.note}</p>
                {/* accent bar */}
                <div className="mt-4 h-1 w-10 rounded-full" style={{ backgroundColor: stat.accent }} />
              </motion.div>
            ))}
          </div>

          {/* ── Recent attempts table ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="bg-white rounded-2xl shadow-sm shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Quiz Attempts</h3>
              {/* Link ke /users karena tidak ada halaman /attempts di nav */}
              <Link href="/users"  className="text-[#00aaff] hover:text-[#00aaff]/80 font-bold text-sm transition-colors"
                        >
                View all users 
              </Link>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">User</th>
                  {/* personalityCode dari API spec */}
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Personality</th>
                  {/* createdAt dari API spec */}
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-right">Detail</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_RECENT_ATTEMPTS.map((attempt, i) => (
                  <motion.tr
                    key={attempt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${attempt.avatarColor} flex items-center justify-center font-bold text-xs shrink-0`}>
                          {attempt.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{attempt.userDisplayName}</p>
                          <p className="text-[11px] font-mono text-slate-300">{attempt.userId}</p>
                        </div>
                      </div>
                    </td>

                    {/* personalityCode → label + badge */}
                    <td className="px-6 py-4">
                      <span className={`${PERSONALITY_BADGE[attempt.personalityCode]} text-xs font-bold px-2.5 py-1 rounded-full`}>
                        {PERSONALITY_LABELS[attempt.personalityCode]}
                      </span>
                    </td>

                    {/* createdAt */}
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-400">{formatDate(attempt.createdAt)}</span>
                    </td>

                    {/* Link ke user history page */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/users/${attempt.userId}`}
                        className="text-[#00aaff] hover:text-[#00aaff]/80 font-bold text-sm transition-colors"
                        >
                        View 
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

        </div>
      </main>
    </div>
  );
}