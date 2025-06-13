"use client"

import Header from "@/components/header"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DoctorsBySpecialty } from "@/api/fakedata"
import CardPraticien from "@/components/ui/card"
import { getWeekDays } from "@/lib/utils"
import Image from "next/image"
import { Praticien } from "@/types/praticien"
import MapComponent from "@/components/ui/MapComponent"
import { X, MapIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SearchResultsPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filteredDoctors, setFilteredDoctors] = useState<Praticien[]>([])
  const { weekDays, weekDates } = getWeekDays()
  const [showMap, setShowMap] = useState(false)

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
                    onReserve={() => {
                      const specialiteSlug = normalize(doctor.specialite);
                      const nomSlug = normalize(doctor.nom);
                      router.push(`/patient/consultations/${specialiteSlug}/${nomSlug}`);
                    }}
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

          {/* Bouton avec animation */}
          <motion.button
            onClick={() => setShowMap(!showMap)}
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#00aed6] cursor-pointer text-white shadow-lg flex items-center justify-center
              ${showMap ? 'w-12 h-12 rounded-full' : 'px-6 py-3 rounded-full'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {showMap ? (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X />
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <MapIcon />
                <span className="text-sm">Voir la carte</span>
              </motion.div>
            )}
          </motion.button>

          {/* Carte avec animation */}
          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5
                }}
                className="fixed inset-4 md:inset-8 bg-white z-10 rounded-3xl shadow-xl"
              >
                <MapComponent doctors={filteredDoctors} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage 