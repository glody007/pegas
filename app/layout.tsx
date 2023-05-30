import './globals.css'
import { Inter } from 'next/font/google'
import QueryWrapper from './QueryWrapper'

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
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
