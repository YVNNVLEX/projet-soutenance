"use client"

import type React from "react"

import { useAuthCheck } from "@/lib/zustand/auth-store"

export default function Providers({ children }: { children: React.ReactNode }) {
  useAuthCheck()

  return <>{children}</>
}
