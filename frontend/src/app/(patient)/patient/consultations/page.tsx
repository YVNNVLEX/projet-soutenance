"use client"

import Header from "@/components/header"
import { ConsultationsPatientFictives } from "@/api/fakedata"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Image from "next/image"
import { CalendarIcon, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"
import { DetailConsultationButton } from "@/components/consultation/DetailConsultationButton"

const Page = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mes consultations</h1>
        
        {ConsultationsPatientFictives.length > 0 ? (
          <div className="grid gap-4">
            {ConsultationsPatientFictives.map((consultation) => (
              <div key={consultation.id} className="bg-gray-100 rounded-lg shadow p-4 hover:shadow transition-all duration-200 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                    <Image
                      src={consultation.photoPraticien}
                      alt={`Photo de ${consultation.nomPraticien}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{consultation.nomPraticien}</h3>
                        <p className="text-gray-600 text-sm">{consultation.specialite}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        consultation.statut === 'terminé' ? 'bg-green-50 text-green-700' :
                        consultation.statut === 'en attente' ? 'bg-yellow-50 text-yellow-700' :
                        consultation.statut === 'en cours' ? 'bg-blue-50 text-blue-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {consultation.statut === 'terminé' ? <CheckCircle size={14} /> :
                         consultation.statut === 'en attente' ? <Clock size={14} /> :
                         consultation.statut === 'en cours' ? <AlertCircle size={14} /> :
                         <XCircle size={14} />}
                        {consultation.statut}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-gray-500 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{format(new Date(consultation.date), "EEEE d MMMM yyyy", { locale: fr })}</span>
                      <span className="mx-2">•</span>
                      <span>{consultation.heure}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <p className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {consultation.adresse}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Motif : {consultation.motif}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <DetailConsultationButton consultationId={consultation.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg mt-6">
            <Image
              src="/img/no-history.png"
              alt="Aucun historique de consultation"
              width={200}
              height={200}
              className="mb-4"
            />
            <p className="mt-4 text-xl font-semibold text-gray-700">Vous n&#39;avez aucun historique pour le moment.</p>
            <p className="mt-2 text-gray-500 max-w-md">Lorsque vous aurez des consultations enregistrées, elles apparaîtront ici. Commencez par prendre un rendez-vous !</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Page