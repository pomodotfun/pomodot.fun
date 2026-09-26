import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SpaceBackground } from '@/components/space-background'
import { WalletProvider } from '@/components/wallet-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Pump Fomo — Every token starts on POMO',
  description: 'Launch and explore tokens on Pump Fomo. Every token starts on POMO.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#06060a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} bg-background`}>
      <body>
        <WalletProvider>
          <SpaceBackground />
          <SiteHeader />
          {children}
        </WalletProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
