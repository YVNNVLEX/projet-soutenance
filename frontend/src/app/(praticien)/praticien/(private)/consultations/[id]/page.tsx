"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface Consultation {
  id: number
  patient: {
    id: number
    nom: string
    prenom: string
    image?: string
    date_naissance: string
    telephone: string
    email: string
    adresse: string
  }
  date: string
  heure: string
  motif: string
  status: "terminé" | "en_attente" | "en_cours" | "annulé"
}

// Données fictives pour le développement
const mockConsultation: Consultation = {
  id: 1,
  patient: {
    id: 1,
    nom: "Kouadio",
    prenom: "Yao",
    date_naissance: "1990-05-15",
    telephone: "+225 07 07 07 07 07",
    email: "yao.kouadio@example.com",
    adresse: "Cocody, Abidjan"
  },
  date: "2024-03-15",
  heure: "09:00",
  motif: "Détartrage",
  status: "en_attente"
}

export default function ConsultationDetail() {
  const params = useParams()
  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setIsLoading(true)
        // En développement, utiliser les données fictives
        if (process.env.NODE_ENV === 'development') {
          setConsultation(mockConsultation)
        } else {
          const response = await axios.get(`http://localhost:8000/consultation/${params.id}/`)
          setConsultation(response.data)
        }
        setError(null)
      } catch (err) {
        console.error("Erreur:", err)
        // En cas d'erreur, utiliser les données fictives
        setConsultation(mockConsultation)
        setError(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConsultation()
  }, [params.id])

  if (isLoading) {
    return <div className="p-4 text-center">Chargement des détails...</div>
  }

  if (error || !consultation) {
    return <div className="p-4 text-center text-red-500">{error || "Consultation non trouvée"}</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Détails de la consultation</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Informations du patient */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
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
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{`${consultation.patient.prenom} ${consultation.patient.nom}`}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Date de naissance</p>
                  <p>{consultation.patient.date_naissance}</p>
                </div>
                <div>
                  <p className="text-gray-500">Téléphone</p>
                  <p>{consultation.patient.telephone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p>{consultation.patient.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Adresse</p>
                  <p>{consultation.patient.adresse}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de la consultation */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Détails de la consultation</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Date</p>
                <p>{consultation.date}</p>
              </div>
              <div>
                <p className="text-gray-500">Heure</p>
                <p>{consultation.heure}</p>
              </div>
              <div>
                <p className="text-gray-500">Motif</p>
                <p>{consultation.motif}</p>
              </div>
              <div>
                <p className="text-gray-500">Statut</p>
                <p className={`inline-block px-2 py-1 rounded-full text-xs ${
                  consultation.status === 'terminé' ? 'bg-green-100 text-green-800' :
                  consultation.status === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                  consultation.status === 'en_cours' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {consultation.status.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>

          {/* Bouton de rapport */}
          <div className="border-t pt-6 flex justify-center">
            <Button 
              className="flex items-center gap-2 bg-[#00aed6] hover:bg-[#00aed6]/80"
              onClick={() => {/* TODO: Implémenter la redirection vers la page de rapport */}}
            >
              <FileText size={16} />
              Rédiger le rapport
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 