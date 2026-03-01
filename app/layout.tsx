import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'PWN Admin - Management Portal',
  description: 'A comprehensive management portal for monitoring system performance, user activity, and quiz attempts.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body suppressHydrationWarning className="bg-[#f5f7f8] text-slate-900">
        {children}
      </body>
    </html>
  );
}
