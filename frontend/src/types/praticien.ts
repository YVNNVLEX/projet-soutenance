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