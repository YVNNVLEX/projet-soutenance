"use client"

import type * as React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { GalleryVerticalEnd, Home, Settings, Users, FileText, HelpCircle, Calendar, Stethoscope } from "lucide-react"

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
    title: "Consultations",
    icon: Stethoscope,
    url: "/praticien/consultations",
  },
  {
    title: "Rapports Médicaux",
    icon: FileText,
    url: "/praticien/rapports",
  },
  {
    title: "Disponibilités",
    icon: Calendar,
    url: "/praticien/disponibilites",
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

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
      <SidebarRail />
    </Sidebar>
  )
}
