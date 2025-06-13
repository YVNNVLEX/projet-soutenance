"use client";
'use'

import Header from "@/components/header";
import MapComponent from "@/components/ui/MapComponent";
import Image from "next/image";
import { Calendar, CreditCard, Info, MapPin } from "lucide-react";
import { useState } from "react";
import { DoctorsBySpecialty } from "@/api/fakedata";
import React from "react";

// Fonction utilitaire pour normaliser les chaînes (accents, espaces, majuscules, etc.)
function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ReservationPage({ params }: { params: Promise<{ specialite: string; nom: string }> }) {
  const { specialite, nom } = React.use(params);
  // Recherche du praticien avec normalisation
  const praticiens = DoctorsBySpecialty[specialite] || [];
  const praticien = praticiens.find(p => normalize(p.nom) === nom && normalize(p.specialite) === specialite);
  const [isForProche, setIsForProche] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [useProcheNumero, setUseProcheNumero] = useState(false);

  if (!praticien) {
    return <div>Praticien non trouvé</div>;
  }

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
              <span className="text-base font-semibold">{praticien.prix_consultation} FCFA</span>
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
            <li>Merci d&apos;arriver 10 minutes avant l&apos;heure du rendez-vous.</li>
            <li>Munissez-vous de votre pièce d&apos;identité et de votre carnet de santé.</li>
            <li>Le paiement s&apos;effectue sur place, en espèces ou mobile money.</li>
            <li>Annulation possible jusqu&apos;à 24h avant la consultation.</li>
          </ul>
        </div>
        {/* Formulaire de réservation */}
        <div className="bg-white rounded-2xl shadow p-6 w-full max-w-full mx-auto">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#00aed6]" />Réserver une consultation</h2>
          <form className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium">Pour qui ?</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${!isForProche ? 'bg-[#00aed6] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setIsForProche(false)}
                >
                  Pour moi
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-medium ${isForProche ? 'bg-[#00aed6] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setIsForProche(true)}
                >
                  Pour un proche
                </button>
              </div>
            </div>
            {isForProche && (
              <div>
                <label className="block text-sm font-medium mb-1">Nom complet du proche</label>
                <input type="text" className="w-full border rounded-md px-3 py-2" required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aed6]" required>
                <option value="">Sélectionnez une date</option>
                {praticien.creneaux.filter(c => c.disponible).map((c, i) => (
                  <option key={i} value={c.date}>{c.date}</option>
                ))}
              </select>
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
            {isForProche && (
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm font-medium">Numéro de téléphone</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium ${!useProcheNumero ? 'bg-[#00aed6] text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setUseProcheNumero(false)}
                  >
                    Mon numéro
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md text-sm font-medium ${useProcheNumero ? 'bg-[#00aed6] text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setUseProcheNumero(true)}
                  >
                    Numéro du proche
                  </button>
                </div>
              </div>
            )}
            {isForProche && useProcheNumero && (
              <div>
                <label className="block text-sm font-medium mb-1">Numéro du proche</label>
                <input type="tel" className="w-full border rounded-md px-3 py-2" required />
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <label className="text-sm font-medium">Consultation urgente ?</label>
              <button
                type="button"
                className={`px-4 py-2 rounded-md text-sm font-medium ${isUrgent ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setIsUrgent(!isUrgent)}
              >
                {isUrgent ? 'Oui' : 'Non'}
              </button>
            </div>
            <button type="submit" className="bg-[#00aed6] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0095b6] transition">Confirmer la réservation</button>
          </form>
        </div>
      </div>
    </div>
  );
} 