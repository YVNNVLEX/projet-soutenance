export interface Consultation {
    patient: string;
    date: string;
    heure: string;
    motif: string;
    status: 'en attente' | 'terminé' | 'en cours' | 'annulé';
}