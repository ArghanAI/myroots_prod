"use client"

import { useAuth } from "@/components/auth-provider"
import { Home, Users, MessageCircle, Wallet, Bell, Settings, LogOut } from "lucide-react"
import { NavItem } from "@/components/nav-item"
import { Button } from "@/components/ui/button"

export const NavBar = () => {
  const { logout } = useAuth()

  return (
    <nav className="fixed left-2 top-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground rounded-full shadow-lg p-2 hidden md:flex flex-col items-center justify-center space-y-4 z-10">
      <NavItem href="/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" />
      <NavItem href="/communities" icon={<Users className="h-5 w-5" />} label="Communities" />
      <NavItem href="/chat" icon={<MessageCircle className="h-5 w-5" />} label="Chat" />
      <NavItem href="/njangi" icon={<Wallet className="h-5 w-5" />} label="Njangi" />
      <NavItem href="/notifications" icon={<Bell className="h-5 w-5" />} label="Notifications" />
      <NavItem href="/profile" icon={<Settings className="h-5 w-5" />} label="Profile" />
      <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10" onClick={logout}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Logout</span>
      </Button>
    </nav>
  )
}

