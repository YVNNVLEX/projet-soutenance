"use client"

import type * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { GalleryVerticalEnd, Home, Settings, Users, FileText, HelpCircle, Calendar, Stethoscope, LogOut } from "lucide-react"
import { useAuthStore } from "@/lib/zustand/auth-store"
import { useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Données de navigation
const navigationItems = [
  {
    title: "Acceuil",
    icon: Home,
    url: "/praticien/dashboard",
  },
  {
    title: "Disponibilités",
    icon: Calendar,
    url: "/praticien/disponibilites",
  },
  {
    title: "Consultations",
    icon: Stethoscope,
    url: "/praticien/consultations",
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/praticien/login")
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
                <Image src="/logo.svg" alt="logo" width={300} height={300} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                  >
                    <a href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-md text-white bg-red-600 hover:bg-red-600/60 transition-colors group cursor-pointer"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}
