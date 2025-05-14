"use client"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Settings, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ReactNode } from "react";
import { useAuthStore } from "@/lib/zustand/auth-store";

export default function PraticienLayout({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-full cursor-pointer">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full relative cursor-pointer">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">2</span>
            </button>
            <div className="relative cursor-pointer group">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src={user?.photo || "/placeholder.svg?height=36&width=36"} alt={`${user?.prenom} ${user?.nom}`} />
                <AvatarFallback>{user?.prenom?.[0]}{user?.nom?.[0]}</AvatarFallback>
              </Avatar>
              <span className="absolute right-0 bottom-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user?.prenom} {user?.nom}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <div className="px-4 py-2">
                  <p className="text-xs text-muted-foreground">Spécialité: {user?.specialite}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
} 