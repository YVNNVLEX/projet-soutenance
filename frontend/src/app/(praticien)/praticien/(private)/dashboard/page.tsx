"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useAuthStore } from "@/lib/zustand/auth-store"
import { ArrowRightIcon, ArrowRightIconHandle } from "@/components/ui/arrow-right"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Eye, FileText, Clock, CheckCircle, XCircle } from "lucide-react"

interface Consultation {
  patient: string;
  date: string;
  heure: string;
  motif: string;
  status: 'en attente' | 'terminé' | 'en cours' | 'annulé';
}

const consultationsFictives: Consultation[] = [
  {
    patient: "Kouadio Yao",
    date: "2025-03-15",
    heure: "09:00",
    motif: "Détartrage",
    status: "en attente"
  },
  {
    patient: "Traoré Awa",
    date: "2025-03-15",
    heure: "10:00",
    motif: "Extraction de dent",
    status: "en attente"
  },
  {
    patient: "Koffi N'Guessan",
    date: "2025-03-15",
    heure: "11:00",
    motif: "Consultation carie",
    status: "en attente"
  },
  {
    patient: "Bamba Mariam",
    date: "2025-03-15",
    heure: "14:00",
    motif: "Appareil dentaire",
    status: "en attente"
  },
  {
    patient: "Ouattara Issa",
    date: "2025-03-15",
    heure: "15:00",
    motif: "Blanchiment dentaire",
    status: "en attente"
  }
]

export default function Page() {
  const user = useAuthStore((state) => state.user);

  const ArrowRef = useRef<ArrowRightIconHandle>(null)
  const [consultations, setConsultations] = useState<Consultation[]>(consultationsFictives)

  useEffect(() => {
    axios.get("/api/consultations").then((res) => {
      if (res.data && res.data.length > 0) {
        setConsultations(res.data)
      }
    })
  }, [])

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <p>Bonjour Dr <span className="font-semibold">{user?.nom} {user?.prenom} </span></p>
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
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${consultation.patient.split(' ')[0]}`} />
                        <AvatarFallback>{consultation.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {consultation.patient}
                    </td>
                    <td className="py-3 px-4">{consultation.date}</td>
                    <td className="py-3 px-4">{consultation.heure}</td>
                    <td className="py-3 px-4">{consultation.motif}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                        consultation.status === 'terminé' ? 'bg-green-100 text-green-800' : 
                        consultation.status === 'en attente' ? 'bg-yellow-100 text-yellow-800' : 
                        consultation.status === 'en cours' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {consultation.status === 'terminé' ? <CheckCircle size={14} /> :
                         consultation.status === 'en attente' ? <Clock size={14} /> :
                         consultation.status === 'en cours' ? <Clock size={14} /> :
                         <XCircle size={14} />}
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors cursor-pointer">
                          <Eye size={14} />
                          Détail patient
                        </button>
                        {consultation.status === 'terminé' && (
                          <button className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors cursor-pointer">
                            <FileText size={14} />
                            Voir rapport
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
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
