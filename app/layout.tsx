import 'antd/dist/reset.css'
import '../styles/globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import ChatWidget from '../components/ChatWidget'
export const metadata = {
  title: 'MerilSoft - Driving Innovation with Technology',
  description: 'Harness the power of cutting-edge solutions to transform businesses, streamline operations, and unlock new opportunities.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MerilSoft',
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="touch-none">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden antialiased">
        <Navbar />
        <main className="flex-1 w-full pt-16 sm:pt-20">{children}</main>
        <ChatWidget />
      </body>
    </html>
  )
}
