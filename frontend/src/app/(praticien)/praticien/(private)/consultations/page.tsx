"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search, Filter, FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/lib/zustand/auth-store"
import { DetailPatientButton } from "@/components/consultation/DetailPatientButton"

interface Consultation {
  id: number
  patient: {
    id: number
    nom: string
    prenom: string
    image?: string
  }
  date: string
  heure: string
  motif: string
  status: "terminé" | "en_attente" | "en_cours" | "annulé"
}

const ITEMS_PER_PAGE = 10

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("tout")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:8000/consultation/list/?praticien_id=${user?.id}`)
        setConsultations(response.data)
        setFilteredConsultations(response.data)
        setError(null)
      } catch (err) {
        setError("Erreur lors du chargement des consultations")
        console.error("Erreur:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConsultations()
  }, [])

  useEffect(() => {
    const filtered = consultations.filter(consultation =>
      (consultation.patient.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      case "en_attente":
        return "bg-yellow-100 text-yellow-800"
      case "en_cours":
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
                checked={activeFilter === "en_attente"}
                onCheckedChange={() => setActiveFilter("en_attente")}
              >
                En attente
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeFilter === "en_cours"}
                onCheckedChange={() => setActiveFilter("en_cours")}
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
        {isLoading ? (
          <div className="p-4 text-center">Chargement des consultations...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : (
          <>
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
                  {currentConsultations.map((consultation) => (
                    <tr key={consultation.id} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            {consultation.patient.image ? (
                              <AvatarImage src={consultation.patient.image} alt={`${consultation.patient.prenom} ${consultation.patient.nom}`} />
                            ) : (
                              <AvatarImage 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${consultation.patient.prenom}`} 
                                alt={`${consultation.patient.prenom} ${consultation.patient.nom}`} 
                              />
                            )}
                            <AvatarFallback>
                              {`${consultation.patient.prenom[0]}${consultation.patient.nom[0]}`}
                            </AvatarFallback>
                          </Avatar>
                          {`${consultation.patient.prenom} ${consultation.patient.nom}`}
                        </div>
                      </td>
                      <td className="py-3 px-4">{consultation.date}</td>
                      <td className="py-3 px-4">{consultation.heure}</td>
                      <td className="py-3 px-4">{consultation.motif}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full w-fit text-xs flex items-center gap-1 ${getStatusColor(consultation.status)}`}>
                          {consultation.status === 'terminé' ? <CheckCircle size={14} /> :
                           consultation.status === 'en_attente' ? <Clock size={14} /> :
                           consultation.status === 'en_cours' ? <Clock size={14} /> :
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
                            <DetailPatientButton consultationId={consultation.id} />
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
          </>
        )}
      </div>
    </div>
  )
}
