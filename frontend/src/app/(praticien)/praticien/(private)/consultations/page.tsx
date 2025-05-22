"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search, Filter, Eye, FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Consultation {
  patient: string
  date: string
  heure: string
  motif: string
  status: "terminé" | "en attente" | "en cours" | "annulé"
}

const ITEMS_PER_PAGE = 10

export default function Page() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("tout")

  useEffect(() => {
    // Simuler des données pour l'exemple
    const mockData: Consultation[] = [
      {
        patient: "Kouadio Amani",
        date: "15/03/2025",
        heure: "09:00",
        motif: "Détartrage",
        status: "terminé"
      },
      {
        patient: "Adjoa Konan",
        date: "15/03/2025",
        heure: "10:30",
        motif: "Contrôle orthodontique",
        status: "en attente"
      },
      {
        patient: "Yao Kouassi",
        date: "15/03/2025",
        heure: "14:00",
        motif: "Première consultation dentaire",
        status: "en cours"
      },
      {
        patient: "Aminata Traoré",
        date: "15/03/2025",
        heure: "15:30",
        motif: "Extraction dentaire",
        status: "annulé"
      },
      {
        patient: "Mamadou Ouattara",
        date: "15/03/2025",
        heure: "16:00",
        motif: "Urgence dentaire",
        status: "terminé"
      },
      {
        patient: "Fatou Diop",
        date: "16/03/2025",
        heure: "09:30",
        motif: "Blanchiment dentaire",
        status: "en attente"
      },
      {
        patient: "Koffi Mensah",
        date: "16/03/2025",
        heure: "11:00",
        motif: "Consultation pour carie",
        status: "terminé"
      },
      {
        patient: "Aïcha Cissé",
        date: "16/03/2025",
        heure: "13:30",
        motif: "Détartrage",
        status: "en cours"
      },
      {
        patient: "Sékou Touré",
        date: "16/03/2025",
        heure: "15:00",
        motif: "Contrôle orthodontique",
        status: "terminé"
      },
      {
        patient: "Mariam Keita",
        date: "16/03/2025",
        heure: "16:30",
        motif: "Première consultation dentaire",
        status: "en attente"
      },
      {
        patient: "Oumar Diallo",
        date: "17/03/2025",
        heure: "09:00",
        motif: "Urgence dentaire",
        status: "terminé"
      },
      {
        patient: "Aminata Coulibaly",
        date: "17/03/2025",
        heure: "10:00",
        motif: "Blanchiment dentaire",
        status: "en cours"
      }
    ]
    setConsultations(mockData)
    setFilteredConsultations(mockData)
  }, [])

  useEffect(() => {
    const filtered = consultations.filter(consultation =>
      (consultation.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.motif.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeFilter === "tout" || consultation.status === activeFilter)
    )
    setFilteredConsultations(filtered)
    setCurrentPage(1)
  }, [searchQuery, consultations, activeFilter])

  const totalPages = Math.ceil(filteredConsultations.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentConsultations = filteredConsultations.slice(startIndex, endIndex)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "terminé":
        return "bg-green-100 text-green-800"
      case "en attente":
        return "bg-yellow-100 text-yellow-800"
      case "en cours":
        return "bg-blue-100 text-blue-800"
      case "annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Liste des consultations</h2>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuCheckboxItem
                checked={activeFilter === "tout"}
                onCheckedChange={() => setActiveFilter("tout")}
              >
                Tout
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeFilter === "terminé"}
                onCheckedChange={() => setActiveFilter("terminé")}
              >
                Terminé
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeFilter === "en attente"}
                onCheckedChange={() => setActiveFilter("en attente")}
              >
                En attente
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeFilter === "en cours"}
                onCheckedChange={() => setActiveFilter("en cours")}
              >
                En cours
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeFilter === "annulé"}
                onCheckedChange={() => setActiveFilter("annulé")}
              >
                Annulé
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un patient..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4">Patient</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Heure</th>
                <th className="text-left py-3 px-4">Motif</th>
                <th className="text-left py-3 px-4">Statut</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentConsultations.map((consultation, index) => (
                <tr key={index} className="border-b hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${consultation.patient}`} />
                        <AvatarFallback>{consultation.patient.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      {consultation.patient}
                    </div>
                  </td>
                  <td className="py-3 px-4">{consultation.date}</td>
                  <td className="py-3 px-4">{consultation.heure}</td>
                  <td className="py-3 px-4">{consultation.motif}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full w-fit text-xs flex items-center gap-1 ${getStatusColor(consultation.status)}`}>
                      {consultation.status === 'terminé' ? <CheckCircle size={14} /> :
                       consultation.status === 'en attente' ? <Clock size={14} /> :
                       consultation.status === 'en cours' ? <Clock size={14} /> :
                       <XCircle size={14} />}
                      {consultation.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {consultation.status === 'terminé' ? (
                        <button className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors cursor-pointer">
                          <FileText size={14} />
                          Voir rapport
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors cursor-pointer">
                          <Eye size={14} />
                          Détail patient
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredConsultations.length)} sur {filteredConsultations.length} consultations
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} sur {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
