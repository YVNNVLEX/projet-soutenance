export interface Praticien {
    nom: string;
    specialite: string;
    ville: string;
    quartier: string;
    centre: string;
    photo: string;
    creneaux: Array<{ heure: string; disponible: boolean }>;
}