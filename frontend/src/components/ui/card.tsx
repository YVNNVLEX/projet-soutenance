import React from "react";

export type Creneau = { heure: string; disponible: boolean };
export type CardPraticienProps = {
  nom: string;
  specialite: string;
  ville: string;
  quartier: string;
  centre: string;
  photo: string;
  creneaux: Creneau[];
  calendrier?: boolean; // true pour afficher le calendrier compact (généraliste)
  jours?: string[]; // jours à afficher dans le calendrier
  dates?: string[]; // dates à afficher sous les jours
};

const CardPraticien: React.FC<CardPraticienProps> = ({
  nom,
  specialite,
  ville,
  quartier,
  centre,
  photo,
  creneaux,
  calendrier = false,
  jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"],
  dates = ["24 avr.", "25 avr.", "26 avr.", "27 avr.", "28 avr.", "29 avr.", "30 avr.", "1 mai", "2 mai", "3 mai", "4 mai", "5 mai"],
}) => {
  // On affiche 2 lignes de 12 créneaux si calendrier, sinon une colonne
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 rounded-xl p-4 md:p-6 shadow-sm">
      {/* Photo */}
      <img src={photo} alt={nom} className="w-28 h-28 rounded-lg object-cover mr-0 md:mr-6 mb-4 md:mb-0" />
      {/* Infos */}
      <div className="flex-1 flex flex-col items-start min-w-[220px]">
        <span className="font-bold text-lg md:text-xl mb-1">{nom}</span>
        <span className="text-gray-600 text-sm mb-2">{specialite}</span>
        <span className="text-gray-500 text-xs mb-1">{ville}, {quartier}</span>
        <span className="text-gray-500 text-xs mb-3">{centre}</span>
        <button className="bg-[#00aed6] text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-[#0095b6] transition mb-2">Prendre rendez-vous</button>
      </div>
      {/* Planning */}
      <div className={calendrier ? "flex flex-col items-center bg-white rounded-lg p-2 md:ml-8 border border-gray-200 min-w-[820px]" : "flex flex-col items-center bg-white rounded-lg p-2 md:ml-8 border border-gray-200 min-w-[100px]"}>
        {calendrier ? (
          <>
            <div className="flex gap-2 mb-1">
              {jours.map((jour, i) => (
                <span key={i} className="text-[11px] text-gray-500 w-14 text-center font-medium">{jour.slice(0,3)}<br/><span className='font-normal text-[10px]'>{dates[i]}</span></span>
              ))}
            </div>
            <div className="flex gap-2">
              {creneaux.slice(0,jours.length).map((c, i) => (
                <span key={i} className={`block w-14 text-center py-1 rounded text-xs ${c.disponible ? 'bg-[#e6f7fb] text-[#00aed6] font-semibold' : 'bg-gray-100 text-gray-400'}`}>{c.heure}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-1">
              {creneaux.slice(jours.length,jours.length*2).map((c, i) => (
                <span key={i} className={`block w-14 text-center py-1 rounded text-xs ${c.disponible ? 'bg-[#e6f7fb] text-[#00aed6] font-semibold' : 'bg-gray-100 text-gray-400'}`}>{c.heure}</span>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full items-center">
            {creneaux.map((c, i) => (
              <div key={i} className={`w-16 px-2 py-1 rounded text-xs text-center ${c.disponible ? 'bg-[#e6f7fb] text-[#00aed6] font-semibold' : 'bg-gray-200 text-gray-400'}`}>{c.heure}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPraticien; 