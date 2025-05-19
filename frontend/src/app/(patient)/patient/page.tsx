"use client"

import Header from "@/components/header"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import CardPraticien from '@/components/ui/card';

const doctorsBySpecialty: Record<string, Array<{
  nom: string;
  specialite: string;
  ville: string;
  quartier: string;
  centre: string;
  photo: string;
  creneaux: Array<{ heure: string; disponible: boolean }>;
}>> = {
  generaliste: [
    {
      nom: "Dr. Kouakou Albert",
      specialite: "Généraliste",
      ville: "Abidjan",
      quartier: "Yopougon",
      centre: "Centre Médical Sainte Rita",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      creneaux: [
        { heure: "14:30", disponible: true },
        { heure: "16:00", disponible: true },
        { heure: "17:00", disponible: true },
        { heure: "-", disponible: false },
        { heure: "15:00", disponible: true },
        { heure: "18:00", disponible: true },
        { heure: "-", disponible: false },
        { heure: "-", disponible: false },
        { heure: "17:30", disponible: true },
        { heure: "18:30", disponible: true },
        { heure: "14:30", disponible: true },
        { heure: "16:30", disponible: true },
      ],
    },
  ],
  pediatre: [
    {
      nom: "Dr. Koné Mariam",
      specialite: "Pédiatre",
      ville: "Abidjan",
      quartier: "Cocody",
      centre: "Polyclinique Les Anges",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      creneaux: [
        { heure: "09:00", disponible: true },
        { heure: "10:30", disponible: true },
        { heure: "-", disponible: false },
        { heure: "13:00", disponible: true },
      ],
    },
  ],
  dentiste: [
    {
      nom: "Dr. Yao Serge",
      specialite: "Dentiste",
      ville: "Abidjan",
      quartier: "Marcory",
      centre: "Cabinet Dentaire Marcory",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      creneaux: [
        { heure: "11:00", disponible: true },
        { heure: "12:00", disponible: true },
        { heure: "-", disponible: false },
      ],
    },
  ],
  cardiologue: [
    {
      nom: "Dr. Traoré Fatou",
      specialite: "Cardiologue",
      ville: "Abidjan",
      quartier: "Plateau",
      centre: "Institut du Cœur",
      photo: "https://randomuser.me/api/portraits/women/50.jpg",
      creneaux: [
        { heure: "08:30", disponible: true },
        { heure: "-", disponible: false },
        { heure: "10:00", disponible: true },
      ],
    },
  ],
  ophtalmologue: [
    {
      nom: "Dr. N'Dri Jean",
      specialite: "Ophtalmologue",
      ville: "Abidjan",
      quartier: "Treichville",
      centre: "Clinique de la Vue",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      creneaux: [
        { heure: "15:00", disponible: true },
        { heure: "16:00", disponible: true },
      ],
    },
  ],
  pneumologue: [
    {
      nom: "Dr. Koffi Luc",
      specialite: "Pneumologue",
      ville: "Abidjan",
      quartier: "Adjame",
      centre: "Centre Respiratoire Abidjan",
      photo: "https://randomuser.me/api/portraits/men/60.jpg",
      creneaux: [
        { heure: "13:00", disponible: true },
        { heure: "14:00", disponible: true },
      ],
    },
  ],
  nutritionniste: [
    {
      nom: "Dr. Aka Simone",
      specialite: "Nutritionniste",
      ville: "Abidjan",
      quartier: "Koumassi",
      centre: "Centre Nutrition Santé",
      photo: "https://randomuser.me/api/portraits/women/70.jpg",
      creneaux: [
        { heure: "10:00", disponible: true },
        { heure: "11:30", disponible: true },
      ],
    },
  ],
};

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<string>("generaliste");

  return (
    <>
        <Header />
        {/* Hero Section */}
        <section className="w-full bg-[#00aed6] flex flex-col items-center py-8 md:py-12">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
            VOTRE RENDEZ-MEDICAL A PORTEE DE <br className="hidden md:block" /> DOIGT
          </h1>
          <div className="bg-white rounded-2xl md:rounded-full shadow-lg flex flex-col md:flex-row items-stretch md:items-center px-3 md:px-4 py-4 md:py-2 gap-4 md:gap-0 w-full max-w-3xl">
            <div className="flex-1 flex flex-col justify-center px-0 md:px-2 min-w-[150px] w-full">
              <label className="text-xs font-semibold text-black mb-1">Spécialité</label>
              <div className="w-full">
                <Select>
                  <SelectTrigger className="w-full">
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
            </div>
            {/* Localité */}
            <div className="flex-1 flex flex-col justify-center px-0 md:px-2 min-w-[150px] w-full md:border-l border-gray-200">
              <label className="text-xs font-semibold text-black mb-1">Localité</label>
              <div className="relative w-full">
                <svg className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
                <Input className="pl-8 w-full border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" placeholder="où êtes vous ?" />
              </div>
            </div>
            {/* Date */}
            <div className="flex-1 flex flex-col justify-center px-0 md:px-2 min-w-[150px] w-full md:border-l border-gray-200">
              <label className="text-xs font-semibold text-black mb-1">Date</label>
              <div className="w-full">
                <Input type="date" className="w-full" placeholder="Vous le voulez quand ?" />
              </div>
            </div>
            {/* Bouton recherche */}
            <div className="flex items-center justify-center w-full md:w-auto pl-0 md:pl-2 mt-2 md:mt-0">
              <Button className="rounded-full bg-[#00aed6] hover:bg-[#0095b6] text-white p-0 w-full md:w-10 h-10 flex items-center justify-center shadow-md">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full mt-8">
          {/* Onglets spécialités */}
          <div className="flex items-center border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {[
              { label: "Généraliste", value: "generaliste" },
              { label: "Pédiatre", value: "pediatre" },
              { label: "Dentiste", value: "dentiste" },
              { label: "Cardiologue", value: "cardiologue" },
              { label: "Ophtalmologue", value: "ophtalmologue" },
              { label: "Pneumologue", value: "pneumologue" },
              { label: "Nutritionniste", value: "nutritionniste" },
            ].map((tab, idx) => (
              <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                className={`px-4 py-2 text-xs md:text-sm whitespace-nowrap border-b-2 transition-colors duration-200 ${selectedTab === tab.value ? 'border-[#00aed6] text-black font-semibold' : 'border-transparent text-gray-600'} ${idx === 0 ? 'ml-2' : ''}`}
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
            {doctorsBySpecialty[selectedTab].map((doctor, idx) => (
              <CardPraticien
                key={idx}
                nom={doctor.nom}
                specialite={doctor.specialite}
                ville={doctor.ville}
                quartier={doctor.quartier}
                centre={doctor.centre}
                photo={doctor.photo}
                creneaux={doctor.creneaux}
                calendrier={selectedTab === "generaliste"}
                jours={selectedTab === "generaliste" ? ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"] : undefined}
                dates={selectedTab === "generaliste" ? ["24 avr.", "25 avr.", "26 avr.", "27 avr.", "28 avr.", "29 avr.", "30 avr.", "1 mai", "2 mai", "3 mai", "4 mai", "5 mai"] : undefined}
              />
            ))}
          </div>
        </section>
    </>
  )
}

export default Page