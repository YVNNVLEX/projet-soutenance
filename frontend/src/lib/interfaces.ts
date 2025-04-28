export interface patientProfile {
    nom: string,
    prenom : string,
    email : string,
    tel : string,
    type : string,
    password : string,
    sexe: string
}

export interface praticienProfile extends patientProfile{
    hopital_id : string,
    photo : string,
    specialite: string,
}