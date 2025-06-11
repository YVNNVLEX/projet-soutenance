"use client"

import React, { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { RapportMedicalDialog, RapportMedicalData } from "@/components/consultation/RapportMedicalDialog"

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
    taille?: string
    poids?: string
    groupe_sanguin?: string
    antecedents_medicaux?: {
      id: number
      type: "allergie" | "maladie" | "chirurgie" | "medicament"
      description: string
      date: string
      gravite?: "faible" | "moyenne" | "élevée"
    }[]
  }
  date: string
  heure: string
  motif: string
  status: "terminé" | "en_attente" | "en_cours" | "annulé"
  pieces_jointes?: {
    id: number
    nom: string
    type: string
    url: string
    date_ajout: string
  }[]
}


const mockConsultation: Consultation = {
  id: 1,
  patient: {
    id: 1,
    nom: "Kouadio",
    prenom: "Yao",
    date_naissance: "15/05/1990",
    telephone: "+225 07 07 07 07 07",
    email: "yaokouadio@gmail.com",
    adresse: "Cocody, Abidjan",
    taille: "175 cm",
    poids: "75 kg",
    groupe_sanguin: "O+",
    antecedents_medicaux: [
      {
        id: 1,
        type: "allergie",
        description: "Allergie à la pénicilline",
        date: "18/03/2018",
        gravite: "élevée"
      },
      {
        id: 2,
        type: "maladie",
        description: "Hypertension artérielle",
        date: "20/03/2020",
        gravite: "moyenne"
      },
      {
        id: 3,
        type: "chirurgie",
        description: "Extraction de dent de sagesse",
        date: "22/03/2022",
        gravite: "moyenne"
      },
      {
        id: 4,
        type: "maladie",
        description: "Gingivite chronique",
        date: "23/03/2023",
        gravite: "faible"
      },
      {
        id: 5,
        type: "medicament",
        description: "Traitement antibiotique pour abcès dentaire",
        date: "24/03/2024",
        gravite: "moyenne"
      }
    ]
  },
  date: "15/03/2025",
  heure: "09:00",
  motif: "Détartrage",
  status: "en_attente",
  pieces_jointes: [
    {
      id: 1,
      nom: "Radiographie panoramique",
      type: "image/jpeg",
      url: "/uploads/radiographie.jpg",
      date_ajout: "14/03/2025"
    }
  ]
}

export default function ConsultationDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params)
  const id = resolvedParams.id

  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRapportDialogOpen, setIsRapportDialogOpen] = useState(false)

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:8000/consultation/${id}/`)
        setConsultation(response.data)
        setError(null)
      } catch (err) {
        console.error("Erreur:", err)
        setConsultation(mockConsultation)
        setError(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConsultation()
  }, [id])
  

  if (isLoading) {
    return <div className="p-4 text-center">Chargement des détails...</div>
  }

  if (error || !consultation) {
    return <div className="p-4 text-center text-red-500">{error || "Consultation non trouvée"}</div>
  }

  const handleRapportSubmit = async (data: RapportMedicalData) => {
    try {
      // TODO: Implémenter l'envoi des données au backend
      console.log("Données du rapport:", data)
      // Exemple de structure pour l'API
      await axios.post(`http://localhost:8000/consultation/${id}/rapport`, data)
    } catch (err) {
      console.error("Erreur lors de l'enregistrement du rapport:", err)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-1 px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Retour
          </button>
          <h1 className="text-2xl font-semibold">Détails de la consultation</h1>
        </div>
        
        <div className="p-6 space-y-6">
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
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-gray-500">Date de naissance</p>
                    <p>{consultation.patient.date_naissance}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p>{consultation.patient.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Groupe sanguin</p>
                    <p>{consultation.patient.groupe_sanguin || "Non renseigné"}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-gray-500">Téléphone</p>
                    <p>{consultation.patient.telephone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Adresse</p>
                    <p>{consultation.patient.adresse}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Poids</p>
                    <p>{consultation.patient.poids || "Non renseigné"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Taille</p>
                    <p>{consultation.patient.taille || "Non renseigné"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Antécédents médicaux */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Antécédents médicaux</h3>
            {consultation.patient.antecedents_medicaux && consultation.patient.antecedents_medicaux.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {consultation.patient.antecedents_medicaux.map((antecedent) => (
                  <div 
                    key={antecedent.id} 
                    className="p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          antecedent.type === 'allergie' ? 'bg-red-100 text-red-800' :
                          antecedent.type === 'maladie' ? 'bg-orange-100 text-orange-800' :
                          antecedent.type === 'chirurgie' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {antecedent.type.charAt(0).toUpperCase() + antecedent.type.slice(1)}
                        </span>
                        {antecedent.gravite && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            antecedent.gravite === 'élevée' ? 'bg-red-100 text-red-800' :
                            antecedent.gravite === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Gravité: {antecedent.gravite}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{antecedent.date}</span>
                    </div>
                    <p className="text-sm">{antecedent.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun antécédent médical enregistré</p>
            )}
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

          {/* Pièces jointes */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Pièces jointes</h3>
            {consultation.pieces_jointes && consultation.pieces_jointes.length > 0 ? (
              <div>
                {consultation.pieces_jointes.map((piece) => (
                  <div key={piece.id} className="flex items-center w-full gap-3 p-3 border rounded-lg">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium">{piece.nom}</p>
                      <p className="text-sm text-gray-500">Ajouté le {piece.date_ajout}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(piece.url, '_blank')}
                    >
                      Voir
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucune pièce jointe disponible</p>
            )}
          </div>

          {/* Bouton de rapport */}
          <div className="border-t pt-6 flex justify-center">
            <Button 
              className="flex cursor-pointer items-center gap-2 bg-[#00aed6] hover:bg-[#00aed6]/80"
              onClick={() => setIsRapportDialogOpen(true)}
            >
              <FileText size={16} />
              Rédiger le rapport
            </Button>
          </div>
        </div>
      </div>

      <RapportMedicalDialog
        isOpen={isRapportDialogOpen}
        onClose={() => setIsRapportDialogOpen(false)}
        onSubmit={handleRapportSubmit}
      />
    </div>
  )
} 