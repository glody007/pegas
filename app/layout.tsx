import './globals.css'
import { Inter } from 'next/font/google'
import QueryWrapper from './QueryWrapper'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LA PATIENCE',
  description: 'A ticketing system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>
          <Toaster />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
