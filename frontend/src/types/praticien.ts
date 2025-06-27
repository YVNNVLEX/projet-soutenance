export interface Praticien {
    nom: string;
    specialite: string;
    ville: string;
    quartier: string;
    centre: string;
    photo: string;
    prix_consultation: number;
    creneaux: Array<{ date: string; heure: string; disponible: boolean }>;
    latitude?: number;
    longitude?: number;
}

export interface Disponibilite {
    disponibilite_id: number;
    date_disponibilite: string;
    heure_debut: string;
    heure_fin: string;
    praticien_id: number;
}

export interface FormValues {
    date: Date | null;
    slots: { start: string; end: string }[];
  }