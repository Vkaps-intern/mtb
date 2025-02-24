import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MyThriveBuddy - Solopreneurship Made Amazing',
  description: 'Join the world\'s only platform/ecosystem that aims to provide growth, joy, and sense of belonging for solopreneurs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
