import { Praticien } from "@/types/praticien";
import { Consultation } from "@/types/consultation";

export const DoctorsBySpecialty: Record<string,Praticien[]> = {
    generaliste: [
      {
        nom: "Dr. Kouakou Albert",
        specialite: "Généraliste",
        ville: "Abidjan",
        quartier: "Yopougon",
        centre: "Centre Médical Sainte Rita",
        photo: "img/Drmodif.jpg",
        creneaux: [
          { date: "2025-01-10", heure: "07:00", disponible: true },
          { date: "2025-01-10", heure: "07:30", disponible: true },
          { date: "2025-01-10", heure: "08:00", disponible: false },
          { date: "2025-01-10", heure: "08:30", disponible: true },
          { date: "2025-01-11", heure: "09:00", disponible: true },
          { date: "2025-01-11", heure: "09:30", disponible: false },
          { date: "2025-01-11", heure: "10:00", disponible: true },
          { date: "2025-01-12", heure: "10:30", disponible: true },
          { date: "2025-01-12", heure: "11:00", disponible: false },
          { date: "2025-01-12", heure: "11:30", disponible: true },
          { date: "2025-01-13", heure: "12:00", disponible: false },
          { date: "2025-01-13", heure: "12:30", disponible: false },
          { date: "2025-01-13", heure: "13:00", disponible: true },
          { date: "2025-01-14", heure: "13:30", disponible: true },
          { date: "2025-01-14", heure: "14:00", disponible: false },
          { date: "2025-01-14", heure: "14:30", disponible: true },
          { date: "2025-01-15", heure: "15:00", disponible: true },
        ],
      },
      {
        nom: "Dr. Bomisso Fulbert",
        specialite: "Généraliste",
        ville: "Abidjan",
        quartier: "Marcory",
        centre: "Centre Médical Sainte Rita",
        photo: "img/youngdoctor.jpg",
        creneaux: [
          { date: "2025-02-01", heure: "07:00", disponible: true },
          { date: "2025-02-01", heure: "07:30", disponible: true },
          { date: "2025-02-01", heure: "08:00", disponible: false },
          { date: "2025-02-02", heure: "08:30", disponible: true },
          { date: "2025-02-02", heure: "09:00", disponible: true },
          { date: "2025-02-02", heure: "09:30", disponible: false },
          { date: "2025-02-03", heure: "10:00", disponible: true },
          { date: "2025-02-03", heure: "10:30", disponible: true },
          { date: "2025-02-03", heure: "11:00", disponible: false },
          { date: "2025-02-04", heure: "11:30", disponible: true },
          { date: "2025-02-04", heure: "12:00", disponible: false },
          { date: "2025-02-04", heure: "12:30", disponible: false },
          { date: "2025-02-05", heure: "13:00", disponible: true },
          { date: "2025-02-05", heure: "13:30", disponible: true },
          { date: "2025-02-05", heure: "14:00", disponible: false },
          { date: "2025-02-06", heure: "14:30", disponible: true },
          { date: "2025-02-06", heure: "15:00", disponible: true },
        ],
      },
      {
        nom: "Dr. Coulibaly Albertine",
        specialite: "Généraliste",
        ville: "Abidjan",
        quartier: "Yopougon",
        centre: "Centre Médical Sainte Rita",
        photo: "img/doctor.jpg",
        creneaux: [
          { date: "2025-03-01", heure: "07:00", disponible: true },
          { date: "2025-03-01", heure: "07:30", disponible: true },
          { date: "2025-03-01", heure: "08:00", disponible: false },
          { date: "2025-03-02", heure: "08:30", disponible: true },
          { date: "2025-03-02", heure: "09:00", disponible: true },
          { date: "2025-03-02", heure: "09:30", disponible: false },
          { date: "2025-03-03", heure: "10:00", disponible: true },
          { date: "2025-03-03", heure: "10:30", disponible: true },
          { date: "2025-03-03", heure: "11:00", disponible: false },
          { date: "2025-03-04", heure: "11:30", disponible: true },
          { date: "2025-03-04", heure: "12:00", disponible: false },
          { date: "2025-03-04", heure: "12:30", disponible: false },
          { date: "2025-03-05", heure: "13:00", disponible: true },
          { date: "2025-03-05", heure: "13:30", disponible: true },
          { date: "2025-03-05", heure: "14:00", disponible: false },
          { date: "2025-03-06", heure: "14:30", disponible: true },
          { date: "2025-03-06", heure: "15:00", disponible: true },
        ],
      },
    ],
    pediatre: [
      {
        nom: "Dr. Koné Mariam",
        specialite: "Pédiatre",
        ville: "Abidjan",
        quartier: "Cocody",
        centre: "Polyclinique Les Anges",
        photo: "https://randomuser.me/api/portraits/women/65.jpg",
        creneaux: [
          { date: "2025-04-10", heure: "08:00", disponible: true },
          { date: "2025-04-10", heure: "08:30", disponible: true },
          { date: "2025-04-10", heure: "09:00", disponible: false },
          { date: "2025-04-11", heure: "09:30", disponible: true },
          { date: "2025-04-11", heure: "10:00", disponible: true },
          { date: "2025-04-11", heure: "10:30", disponible: false },
          { date: "2025-04-12", heure: "11:00", disponible: true },
          { date: "2025-04-12", heure: "11:30", disponible: true },
          { date: "2025-04-12", heure: "12:00", disponible: false },
          { date: "2025-04-13", heure: "12:30", disponible: false },
          { date: "2025-04-13", heure: "13:00", disponible: true },
          { date: "2025-04-13", heure: "13:30", disponible: true },
          { date: "2025-04-14", heure: "14:00", disponible: false },
          { date: "2025-04-14", heure: "14:30", disponible: true },
        ],
      },
    ],
    dentiste: [
      {
        nom: "Dr. Yao Serge",
        specialite: "Dentiste",
        ville: "Abidjan",
        quartier: "Marcory",
        centre: "Cabinet Dentaire Marcory",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        creneaux: [
          { date: "2025-05-10", heure: "11:00", disponible: true },
          { date: "2025-05-10", heure: "12:00", disponible: true },
          { date: "2025-05-11", heure: "-", disponible: false },
        ],
      },
    ],
    cardiologue: [
      {
        nom: "Dr. Traoré Fatou",
        specialite: "Cardiologue",
        ville: "Abidjan",
        quartier: "Plateau",
        centre: "Institut du Cœur",
        photo: "https://randomuser.me/api/portraits/women/50.jpg",
        creneaux: [
          { date: "2025-06-10", heure: "08:30", disponible: true },
          { date: "2025-06-10", heure: "-", disponible: false },
          { date: "2025-06-11", heure: "10:00", disponible: true },
        ],
      },
    ],
    ophtalmologue: [
      {
        nom: "Dr. N'Dri Jean",
        specialite: "Ophtalmologue",
        ville: "Abidjan",
        quartier: "Treichville",
        centre: "Clinique de la Vue",
        photo: "https://randomuser.me/api/portraits/men/45.jpg",
        creneaux: [
          { date: "2025-07-10", heure: "15:00", disponible: true },
          { date: "2025-07-11", heure: "16:00", disponible: true },
        ],
      },
    ],
    pneumologue: [
      {
        nom: "Dr. Koffi Luc",
        specialite: "Pneumologue",
        ville: "Abidjan",
        quartier: "Adjame",
        centre: "Centre Respiratoire Abidjan",
        photo: "https://randomuser.me/api/portraits/men/60.jpg",
        creneaux: [
          { date: "2025-08-10", heure: "13:00", disponible: true },
          { date: "2025-08-11", heure: "14:00", disponible: true },
        ],
      },
    ],
    nutritionniste: [
      {
        nom: "Dr. Aka Simone",
        specialite: "Nutritionniste",
        ville: "Abidjan",
        quartier: "Koumassi",
        centre: "Centre Nutrition Santé",
        photo: "https://randomuser.me/api/portraits/women/70.jpg",
        creneaux: [
          { date: "2025-09-10", heure: "10:00", disponible: true },
          { date: "2025-09-11", heure: "11:30", disponible: true },
        ],
      },
    ],
  };

export  const ConsultationsFictives: Consultation[] = [
    {
      patient: "Kouadio Yao",
      date: "2025-03-15",
      heure: "09:00",
      motif: "Détartrage",
      status: "en attente"
    },
    {
      patient: "Traoré Awa",
      date: "2025-03-15",
      heure: "10:00",
      motif: "Extraction de dent",
      status: "en attente"
    },
    {
      patient: "Koffi N'Guessan",
      date: "2025-03-15",
      heure: "11:00",
      motif: "Consultation carie",
      status: "en attente"
    },
    {
      patient: "Bamba Mariam",
      date: "2025-03-15",
      heure: "14:00",
      motif: "Appareil dentaire",
      status: "en attente"
    },
    {
      patient: "Ouattara Issa",
      date: "2025-03-15",
      heure: "15:00",
      motif: "Blanchiment dentaire",
      status: "en attente"
    }
  ]