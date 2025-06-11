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

const SearchResultsPage = () => {
  const searchParams = useSearchParams()
  const [filteredDoctors, setFilteredDoctors] = useState<Praticien[]>([])
  const { weekDays, weekDates } = getWeekDays()

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

  return (
    <div className="flex flex-col min-h-screen">
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
          <div className="w-full h-[500px]">
            <MapComponent doctors={filteredDoctors} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage 