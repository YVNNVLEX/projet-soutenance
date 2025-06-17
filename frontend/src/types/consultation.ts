export interface Consultation {
    patient: string;
    date: string;
    heure: string;
    motif: string;
    status: 'en attente' | 'terminé' | 'en cours' | 'annulé';
}

export interface ConsultationPatient {
    id: number;
    nomPraticien: string;
    specialite: string;
    photoPraticien: string;
    date: string;
    heure: string;
    motif: string;
    statut: 'en attente' | 'terminé' | 'en cours' | 'annulé';
    adresse: string;
}