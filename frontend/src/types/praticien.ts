export interface Praticien {
    nom: string;
    specialite: string;
    ville: string;
    quartier: string;
    centre: string;
    photo: string;
    creneaux: Array<{ date: string; heure: string; disponible: boolean }>;
    latitude?: number;
    longitude?: number;
}