"use client"

import Header from "@/components/header"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle, MoveRight } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import React, { useState } from 'react';
import { getWeekDays } from '@/lib/utils';
import CardPraticien from '@/components/ui/card';
import { DoctorsBySpecialty } from '@/api/fakedata';
import { Specialite } from '@/types/specialite';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { normalize } from "@/lib/utils";
import { ConsultationsFictives, ConsultationsPatientFictives } from "@/api/fakedata";
import { DetailConsultationButton } from "@/components/consultation/DetailConsultationButton";


const Page = () => {
  const [selectedTab, setSelectedTab] = useState<string>("generaliste");
  const [specialite, setSpecialite] = useState("");
  const [localite, setLocalite] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { weekDays, weekDates } = getWeekDays();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (specialite) queryParams.append("specialite", specialite);
    if (localite) queryParams.append("localite", localite);
    if (date) queryParams.append("date", format(date, "yyyy-MM-dd"));

    router.push(`/patient/search-results?${queryParams.toString()}`);
  };

  return (
    <>
        <Header />
        {/* Hero Section */}
        <section className="w-full bg-[#00aed6] flex flex-col items-center py-8 md:py-12">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
            VOTRE RENDEZ-MEDICAL A PORTEE DE <br className="hidden md:block" /> DOIGT
          </h1>
          <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl md:rounded-full shadow-lg flex flex-col md:flex-row items-stretch md:items-center px-3 md:px-4 py-4 md:py-2 gap-4 md:gap-0 w-full max-w-3xl mx-auto"
        >
          {/* Spécialité */}
          <div className="flex-1 flex flex-col justify-center px-0 md:px-2 min-w-[150px] w-full">
            <label htmlFor="specialite" className="text-xs font-semibold text-black mb-1">
              Spécialité
            </label>
            <Select value={specialite} onValueChange={setSpecialite}>
              <SelectTrigger id="specialite" className="w-full cursor-pointer shadow-none border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="Quelles spécialités ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="generaliste">Généraliste</SelectItem>
                <SelectItem value="pediatre">Pédiatre</SelectItem>
                <SelectItem value="cardiologue">Cardiologue</SelectItem>
                <SelectItem value="dermatologue">Dermatologue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Localité */}
          <div className="flex-1 flex flex-col justify-center px-0 md:px-2 min-w-[150px] w-full md:border-l border-gray-200">
            <label htmlFor="localite" className="text-xs font-semibold text-black mb-1">
              Localité
            </label>
            <div className="flex items-center w-full">
              <svg className="text-gray-400 mr-2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
              <Input
                id="localite"
                className="cursor-pointer w-full border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                placeholder="où êtes vous ?"
                value={localite}
                onChange={e => setLocalite(e.target.value)}
              />
            </div>
          </div>
          {/* Date */}
          <div className="flex-1 flex flex-col justify-center px-0 md:px-2 min-w-[150px] w-full md:border-l border-gray-200">
            <label htmlFor="date" className="text-xs font-semibold text-black mb-1">
              Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal cursor-pointer",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: fr }) : "Sélectionnez une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Bouton recherche */}
          <div className="flex items-center justify-center w-full md:w-auto pl-0 md:pl-2 mt-2 md:mt-0">
            <Button
              type="submit"
              className="rounded-full cursor-pointer bg-[#00aed6] hover:bg-[#0095b6] text-white p-0 w-full md:w-10 h-10 flex items-center justify-center shadow-md"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </form>
        </section>
        <section className="w-full p-5">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold">Mes dernières consultations</p>
            <Button variant="outline" size="sm" className="text-xs bg-[#00aed6] text-white cursor-pointer flex items-center gap-1 hover:bg-[#0095b6] hover:text-white"
            onClick={() => router.push("/patient/consultations")}
            >
              <span>Voir tout</span>
              <MoveRight className="w-4 h-4" color="white" />
            </Button>
          </div>
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
        </section>
        <section className="w-full mt-8">
          {/* Onglets spécialités */}
          <div className="flex items-center border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {Specialite.map((tab, idx) => (
              <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                className={`px-4 py-2 text-xs cursor-pointer md:text-sm whitespace-nowrap border-b-2 transition-colors duration-200 ${selectedTab === tab.value ? 'border-[#00aed6] text-black font-semibold' : 'border-transparent text-gray-600'} ${idx === 0 ? 'ml-2' : ''}`}
              >
                {tab.label}
              </button>
            ))}
            <span className="flex-1" />
            <button className="px-2 text-gray-400 hover:text-[#00aed6]">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* Cards docteurs */}
          <div className="mt-6 flex flex-col gap-6 px-4 md:px-12">
            {DoctorsBySpecialty[selectedTab].map((doctor, idx) => (
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
        </section>
    </>
  )
}

export default Page