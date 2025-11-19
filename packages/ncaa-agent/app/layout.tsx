import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import { DemoModeProvider } from '@/lib/demo-mode-context'

export const metadata: Metadata = {
  title: 'NCAA Stats AI - Cross-App Access Demo',
  description: 'NCAA Football AI Chatbot powered by Cross-App Access (XAA) and Claude',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <DemoModeProvider>
            {children}
          </DemoModeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
