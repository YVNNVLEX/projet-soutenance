"use client";
'use'

import Header from "@/components/header";
import MapComponent from "@/components/ui/MapComponent";
import Image from "next/image";
import { Calendar, CreditCard, Info, MapPin, FileText, X, Search } from "lucide-react";
import { useState } from "react";
import { DoctorsBySpecialty } from "@/api/fakedata";
import React from "react";
import { commonSymptoms } from "@/api/symptom";
import { normalize } from "@/lib/utils";

export default function ReservationPage({ params }: { params: Promise<{ specialite: string; nom: string }> }) {
  const { specialite, nom } = React.use(params);
  // Recherche du praticien avec normalisation
  const praticiens = DoctorsBySpecialty[specialite] || [];
  const praticien = praticiens.find(p => normalize(p.nom) === nom && normalize(p.specialite) === specialite);
  const [isForProche, setIsForProche] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [useProcheNumero, setUseProcheNumero] = useState(false);
  const [symptomInput, setSymptomInput] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  // Symptômes avec icônes
  

  const filteredSymptoms = commonSymptoms.filter(
    s => s.label.toLowerCase().includes(symptomInput.toLowerCase()) && !selectedSymptoms.includes(s.label)
  );

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptomInput("");
    }
  };
  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

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

            {/* Sélection des symptômes améliorée */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                <Info className="w-4 h-4 text-[#00aed6] mr-1" />
                Symptômes observés
              </label>
              <div className="mb-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </span>
                <input
                  type="text"
                  className="w-full border rounded-md pl-10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aed6]"
                  placeholder="Rechercher ou ajouter un symptôme..."
                  value={symptomInput}
                  onChange={e => setSymptomInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && symptomInput.trim()) {
                      addSymptom(symptomInput.trim());
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedSymptoms.map(symptom => (
                  <span key={symptom} className="flex items-center bg-red-400 text-white rounded-full px-3 py-1 text-sm font-medium">
                    {commonSymptoms.find(s => s.label === symptom)?.icon}
                    {symptom}
                    <button type="button" className="ml-2" onClick={() => removeSymptom(symptom)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mb-2">
                <span className="block text-sm font-semibold mb-1">Symptômes courants :</span>
                <div className="flex flex-wrap gap-2">
                  {filteredSymptoms.map(symptom => (
                    <button
                      type="button"
                      key={symptom.label}
                      className="bg-red-300 hover:bg-red-400 text-white rounded-full px-3 py-1 text-sm font-medium transition flex items-center"
                      onClick={() => addSymptom(symptom.label)}
                    >
                      {symptom.icon}
                      {symptom.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input fichier amélioré */}
            <div>
              <label className="block text-sm font-medium mb-1">Pièce jointe (examens, ordonnances, etc.)</label>
              <div className="relative flex items-center">
                <span className="absolute left-3">
                  <FileText className="w-5 h-5 text-[#00aed6]" />
                </span>
                <input
                  type="file"
                  className="pl-10 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aed6] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#00aed6]/10 file:text-[#00aed6]"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Formats acceptés : PDF, JPG, PNG</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes supplémentaires</label>
              <textarea 
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aed6]"
                rows={4}
                placeholder="Décrivez vos symptômes ou ajoutez des informations importantes..."
              />
            </div>

            <button type="submit" className="bg-[#00aed6] text-white px-4 py-2 rounded-md font-medium hover:bg-[#0095b6] transition">Confirmer la réservation</button>
          </form>
        </div>
      </div>
    </div>
  );
} 