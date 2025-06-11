"use client"

import Header from "@/components/header"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DoctorsBySpecialty } from "@/api/fakedata"
import CardPraticien from "@/components/ui/card"
import { getWeekDays } from "@/lib/utils"
import Image from "next/image"

const SearchResultsPage = () => {
  const searchParams = useSearchParams()
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const { weekDays, weekDates } = getWeekDays()

  useEffect(() => {
    const specialite = searchParams.get("specialite") || ""
    const localite = searchParams.get("localite") || ""
    const date = searchParams.get("date") || "" // format YYYY-MM-DD

    let results = []

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
        (doctor) =>
          doctor.ville.toLowerCase().includes(lowerCaseLocalite) ||
          doctor.quartier.toLowerCase().includes(lowerCaseLocalite)
      )
    }

    // Filtrer par date
    if (date) {
      results = results.filter(doctor => 
        doctor.creneaux.some(creneau => 
          creneau.disponible && creneau.date === date
        )
      )
    }

    setFilteredDoctors(results)
  }, [searchParams])

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Résultats de recherche</h1>
        {filteredDoctors.length > 0 ? (
          <div className="flex flex-col gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
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
    </>
  )
}

export default SearchResultsPage 