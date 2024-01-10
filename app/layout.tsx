'use client'
//import type { Metadata } from 'next'
import "./globals.css"
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from "@/components/app.header";
import Container from 'react-bootstrap/Container';
import AppFooter from '@/components/app.footer';
import App2ndHeader from '@/components/app.2ndheader';
//import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader/>
        <App2ndHeader/>
        <Container>
          {children}
        </Container>  
        <AppFooter/>      
        </body>
    </html>
  )
}