import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Antriksh Daily — India's private space frontier",
  description: "News and company notes from India's private space industry.",
  icons: {
    icon: '/orbit-mark.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#f0eadc',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
