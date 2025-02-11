"use client"

import { usePathname } from "next/navigation"
import { AuthProvider } from "@/components/auth-provider"
import { NavBar } from "@/components/nav-bar"
import type React from "react"

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  return (
    <AuthProvider>
      {!isLandingPage && <NavBar />}
      <main className={`min-h-screen roots-background ${!isLandingPage ? "md:pl-24" : ""}`}>{children}</main>
    </AuthProvider>
  )
} 