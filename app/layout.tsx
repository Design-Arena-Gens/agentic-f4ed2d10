import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GearHeads Hub - Car Enthusiast Community',
  description: 'Share your rides, connect with car enthusiasts, and discover meetup spots',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
