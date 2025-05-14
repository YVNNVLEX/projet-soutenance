"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  
Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
// import { useAuthStore } from "@/lib/zustand/auth-store"
import { ArrowRightIcon, ArrowRightIconHandle } from "@/components/ui/arrow-right"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

export default function Page() {
  const ArrowRef = useRef<ArrowRightIconHandle>(null)
  const [consultations, setConsultations] = useState<any[]>([])

  useEffect(() => {
    axios.get("/api/consultations").then((res) => {
      setConsultations(res.data)
    })
  }, [])

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        Bonjour Monsieur
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Nombre de consultation aujourd'hui</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1a2341" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 6.75A1.5 1.5 0 0 1 6 5.25h12a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18.75v-12z" />
              </svg>
            </div>
            <div className="text-5xl font-light mt-2">4</div>
            <div className="text-base text-muted-foreground mt-2">Prochain rendez-vous 8h30</div>
          </div>
          {/* <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" /> */}
        </div>
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
          <h2 className="text-xl font-semibold mb-4">Nombre du jour</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Patient</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Heure</th>
                  <th className="text-left py-3 px-4">Motif</th>
                  <th className="text-left py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kouadio" />
                      <AvatarFallback>KD</AvatarFallback>
                    </Avatar>
                    Kouadio Amani
                  </td>
                  <td className="py-3 px-4">15/03/2025</td>
                  <td className="py-3 px-4">09:00</td>
                  <td className="py-3 px-4">Consultation de routine</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Confirmé</span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adjoa" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    Adjoa Konan
                  </td>
                  <td className="py-3 px-4">15/03/2025</td>
                  <td className="py-3 px-4">10:30</td>
                  <td className="py-3 px-4">Suivi traitement</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">En attente</span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yao" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    Yao Kouassi
                  </td>
                  <td className="py-3 px-4">15/03/2025</td>
                  <td className="py-3 px-4">14:00</td>
                  <td className="py-3 px-4">Première consultation</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">En cours</span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata" />
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    Aminata Traoré
                  </td>
                  <td className="py-3 px-4">15/03/2025</td>
                  <td className="py-3 px-4">15:30</td>
                  <td className="py-3 px-4">Contrôle post-opératoire</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Annulé</span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mamadou" />
                      <AvatarFallback>MM</AvatarFallback>
                    </Avatar>
                    Mamadou Ouattara
                  </td>
                  <td className="py-3 px-4">15/03/2025</td>
                  <td className="py-3 px-4">16:00</td>
                  <td className="py-3 px-4">Consultation urgente</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Confirmé</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center">
            <Link href="/praticien/consultations" className="flex items-center gap-5 px-4 py-2 bg-[#00aed6] hover:bg-[#00aed6]/80 text-primary-foreground rounded-md transition-colors"
              onMouseEnter={() => ArrowRef.current?.startAnimation()}
              onMouseLeave={() => ArrowRef.current?.stopAnimation()}
            >
              <span>Voir plus</span>
              <ArrowRightIcon ref={ArrowRef} size={20}/>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
