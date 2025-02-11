import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { NavBar } from "@/components/nav-bar"
import type React from "react"
import { RootLayoutContent } from "@/components/root-layout-content"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" })

export const metadata: Metadata = {
  title: "ROOTS - Community Platform",
  description: "Rooted in Tradition, Built for Impact",
  generator: 'v0.dev',
  icons: {
    icon: '/roots-logo.png',
    apple: '/roots-logo.png',
  },
}

// Create a new client component for the layout content
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  )
}

import './globals.css'