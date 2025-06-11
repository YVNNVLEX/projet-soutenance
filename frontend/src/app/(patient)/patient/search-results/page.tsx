"use client"

import Header from "@/components/header"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DoctorsBySpecialty } from "@/api/fakedata"
import CardPraticien from "@/components/ui/card"
import { getWeekDays } from "@/lib/utils"
import Image from "next/image"
import { Praticien } from "@/types/praticien"
import MapComponent from "@/components/ui/MapComponent"
import { X,MapIcon } from "lucide-react"

const SearchResultsPage = () => {
  const searchParams = useSearchParams()
  const [filteredDoctors, setFilteredDoctors] = useState<Praticien[]>([])
  const { weekDays, weekDates } = getWeekDays()
  const [showMap, setShowMap] = useState(false)
  const [isMapVisible, setIsMapVisible] = useState(false)

  useEffect(() => {
    const specialite = searchParams.get("specialite") || ""
    const localite = searchParams.get("localite") || ""
    const date = searchParams.get("date") || "" // format YYYY-MM-DD

    let results: Praticien[] = []

    if (specialite && DoctorsBySpecialty[specialite]) {
      results = DoctorsBySpecialty[specialite]
    } else {
      // Si aucune spécialité n'est spécifiée ou valide, recherche dans toutes les spécialités
      for (const key in DoctorsBySpecialty) {
        results = results.concat(DoctorsBySpecialty[key])
      }
    }

    // Filtrer par localité
    if (localite) {
      const lowerCaseLocalite = localite.toLowerCase()
      results = results.filter(
        (doctor: Praticien) =>
          doctor.ville.toLowerCase().includes(lowerCaseLocalite) ||
          doctor.quartier.toLowerCase().includes(lowerCaseLocalite)
      )
    }

    // Filtrer par date
    if (date) {
      results = results.filter((doctor: Praticien) => 
        doctor.creneaux.some((creneau: { date: string; heure: string; disponible: boolean }) => 
          creneau.disponible && creneau.date === date
        )
      )
    }

    setFilteredDoctors(results)
  }, [searchParams])

  useEffect(() => {
    if (showMap) {
      setIsMapVisible(true)
    } else if (isMapVisible) {
      // Attendre la fin de l'animation avant de retirer la map
      const timeout = setTimeout(() => setIsMapVisible(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [showMap])

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div className="flex-grow container mx-auto p-2 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Résultats de recherche</h1>
        <div className="flex flex-col gap-8 h-full">
          <div className="w-full overflow-y-auto max-h-[calc(100vh-250px)]">
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredDoctors.map((doctor, idx) => (
                  <CardPraticien
                    key={idx}
                    nom={doctor.nom}
                    specialite={doctor.specialite}
                    ville={doctor.ville}
                    quartier={doctor.quartier}
                    centre={doctor.centre}
                    photo={doctor.photo}
                    creneaux={doctor.creneaux}
                    calendrier={true}
                    jours={weekDays}
                    dates={weekDates}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg mt-6">
                <Image
                  src="/img/no-results.png"
                  alt="Aucun résultat trouvé"
                  width={200}
                  height={200}
                  className="mb-4"
                />
                <p className="mt-4 text-xl font-semibold text-gray-700">Aucun médecin trouvé pour votre recherche.</p>
                <p className="mt-2 text-gray-500 max-w-md">Essayez d&#39;ajuster vos critères de recherche.</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#00aed6] cursor-pointer text-white shadow-lg flex items-center justify-center
              ${showMap ? 'w-12 h-12 rounded-full' : 'px-6 py-3 rounded-full'}
            `}
          >
            {showMap ? (
              <X />
            ) : (
              <div className="flex items-center gap-2">
                <MapIcon />
                <span className="text-sm">Voir la carte</span>
              </div>
            )}
          </button>

          {/* Animation améliorée pour la map */}
          {isMapVisible && (
            <div className={`fixed inset-4 md:inset-8 bg-white z-10 rounded-3xl shadow-xl transition-all duration-500 ease-in-out
              ${showMap ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
            >
              <MapComponent doctors={filteredDoctors} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage 