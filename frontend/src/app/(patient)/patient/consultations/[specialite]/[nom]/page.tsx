"use client";

import Header from "@/components/header";
import MapComponent from "@/components/ui/MapComponent";
import Image from "next/image";
import { Calendar, CreditCard, Info, MapPin } from "lucide-react";

const PRIX_CONSULTATION = 15000;

const praticienFictif = {
  nom: "Dr. Kouakou Albert",
  specialite: "Généraliste",
  ville: "Abidjan",
  quartier: "Yopougon",
  centre: "Centre Médical Sainte Rita",
  photo: "img/doctor1.jpg",
  creneaux: [
    { date: "2024-06-12", heure: "07:00", disponible: true },
    { date: "2024-06-12", heure: "10:30", disponible: true },
    { date: "2024-06-13", heure: "07:30", disponible: true },
    { date: "2024-06-14", heure: "08:00", disponible: false },
    { date: "2024-06-15", heure: "08:30", disponible: true },
    { date: "2024-06-16", heure: "09:00", disponible: true },
    { date: "2024-06-17", heure: "09:30", disponible: false },
    { date: "2024-06-18", heure: "10:00", disponible: true },
    { date: "2024-06-18", heure: "13:30", disponible: true },
  ],
  latitude: 5.3599,
  longitude: -4.0167,
};

export default function ReservationPage() {
  const praticien = praticienFictif;

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Header />
      <div className="container mx-auto py-8 px-2 md:px-0 flex flex-col gap-8">
        {/* Carte praticien */}
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-lg p-6 items-center">
          <Image
            src={`/${praticien.photo}`}
            alt={praticien.nom}
            width={120}
            height={120}
            className="rounded-xl object-cover border-2 border-[#00aed6] shadow-md"
          />
          <div className="flex-1 flex flex-col gap-2 min-w-[220px]">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{praticien.nom}</h1>
            <span className="text-[#00aed6] font-medium text-lg">{praticien.specialite}</span>
            <span className="text-gray-600 flex items-center gap-1"><MapPin className="w-4 h-4" /> {praticien.ville}, {praticien.quartier}</span>
            <span className="text-gray-500 text-sm">{praticien.centre}</span>
            <div className="flex items-center gap-3 mt-2">
              <CreditCard className="w-5 h-5 text-[#00aed6]" />
              <span className="text-base font-semibold">{PRIX_CONSULTATION} FCFA</span>
              <span className="text-xs text-gray-400">Consultation</span>
            </div>
          </div>
          <div className="hidden md:block w-[320px] h-[180px] rounded-xl overflow-hidden border border-gray-200">
            <MapComponent doctors={[praticien]} />
          </div>
        </div>
        {/* Carte sur mobile */}
        <div className="md:hidden w-full h-[220px] rounded-xl overflow-hidden border border-gray-200">
          <MapComponent doctors={[praticien]} />
        </div>
        {/* Infos à connaître */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-[#00aed6]" />
            <span className="font-semibold text-gray-800">Informations à connaître</span>
          </div>
          <ul className="list-disc ml-6 text-gray-600 text-sm flex flex-col gap-1">
            <li>Merci d'arriver 10 minutes avant l'heure du rendez-vous.</li>
            <li>Munissez-vous de votre pièce d'identité et de votre carnet de santé.</li>
            <li>Le paiement s'effectue sur place, en espèces ou mobile money.</li>
            <li>Annulation possible jusqu'à 24h avant la consultation.</li>
          </ul>
        </div>
        {/* Formulaire de réservation */}
        <div className="bg-white rounded-2xl shadow p-6 max-w-lg mx-auto">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#00aed6]" />Réserver une consultation</h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aed6]" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Heure</label>
              <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aed6]" required>
                <option value="">Sélectionnez une heure</option>
                {praticien.creneaux.filter(c => c.disponible).map((c, i) => (
                  <option key={i} value={c.heure}>{c.heure}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nom complet</label>
              <input type="text" className="w-full border rounded-md px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone</label>
              <input type="tel" className="w-full border rounded-md px-3 py-2" required />
            </div>
            <button type="submit" className="bg-[#00aed6] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0095b6] transition">Confirmer la réservation</button>
          </form>
        </div>
      </div>
    </div>
  );
} 