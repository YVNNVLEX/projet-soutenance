"use client"

import Header from "@/components/header"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DoctorsBySpecialty } from "@/api/fakedata"
import CardPraticien from "@/components/ui/card"
import { getWeekDays } from "@/lib/utils"
import Image from "next/image"
import { Praticien } from "@/types/praticien"

const SearchResultsPage = () => {
  const searchParams = useSearchParams()
  const [filteredDoctors, setFilteredDoctors] = useState<Praticien[]>([])
  const { weekDays, weekDates } = getWeekDays()

  useEffect(() => {
    const specialite = searchParams.get("specialite") || ""
    const localite = searchParams.get("localite") || ""
    const date = searchParams.get("date") || "" // format YYYY-MM-DD

    let initialResults: Praticien[] = []

    if (specialite && DoctorsBySpecialty[specialite]) {
      initialResults = DoctorsBySpecialty[specialite]
    } else {
      // Si aucune spécialité n'est spécifiée ou valide, recherche dans toutes les spécialités
      for (const key in DoctorsBySpecialty) {
        initialResults = initialResults.concat(DoctorsBySpecialty[key])
      }
    }

    // Filtrer par localité sur les résultats initiaux
    let resultsByLocality = initialResults
    if (localite) {
      const lowerCaseLocalite = localite.toLowerCase()
      resultsByLocality = initialResults.filter(
        (doctor) =>
          doctor.ville.toLowerCase().includes(lowerCaseLocalite) ||
          doctor.quartier.toLowerCase().includes(lowerCaseLocalite)
      )
    }

    let finalResults: Praticien[] = resultsByLocality

    // Filtrer par date si une date est spécifiée
    if (date) {
      const dateFiltered = resultsByLocality.filter(doctor => 
        doctor.creneaux.some((creneau: { date: string; heure: string; disponible: boolean }) => 
          creneau.disponible && creneau.date === date
        )
      )

      // Logique de repli: si la recherche par date ne donne aucun résultat, 
      // mais qu'une spécialité a été choisie, affiche tous les médecins de cette spécialité et localité.
      if (dateFiltered.length === 0 && specialite) {
        finalResults = resultsByLocality // Reviens aux résultats filtrés par spécialité/localité sans date
      } else {
        finalResults = dateFiltered
      }
    }

    setFilteredDoctors(finalResults)
  }, [searchParams])

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Résultats de recherche</h1>
        {filteredDoctors.length > 0 ? (
          <div className="flex flex-col gap-6">
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
              src="/img/no-results.png" // Assurez-vous d'avoir une image pour aucun résultat
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