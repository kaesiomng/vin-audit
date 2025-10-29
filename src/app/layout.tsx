import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VIN AUDIT - Get Your Carfax or AutoCheck Report Instantly',
  description: 'Buy instant Carfax or AutoCheck vehicle history reports for USA & Canada. Enter a VIN and get official data in seconds.',
  keywords: 'Carfax, AutoCheck, VIN, vehicle history report, USA, Canada',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}