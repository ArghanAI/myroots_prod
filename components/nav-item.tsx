"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

export function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${isActive ? "bg-white text-roots-secondary" : "text-white hover:bg-white/10"}`}
            >
              {icon}
              <span className="sr-only">{label}</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-primary text-primary-foreground border-none" sideOffset={8}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

