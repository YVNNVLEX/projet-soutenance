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
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        creneaux: [
          { heure: "07:00", disponible: true },
          { heure: "07:30", disponible: true },
          { heure: "08:00", disponible: false },
          { heure: "08:30", disponible: true },
          { heure: "09:00", disponible: true },
          { heure: "09:30", disponible: false },
          { heure: "10:00", disponible: true },
          { heure: "10:30", disponible: true },
          { heure: "11:00", disponible: false },
          { heure: "11:30", disponible: true },
          { heure: "12:00", disponible: false },
          { heure: "12:30", disponible: false },
          { heure: "13:00", disponible: true },
          { heure: "13:30", disponible: true },
          { heure: "14:00", disponible: false },
          { heure: "14:30", disponible: true },
          { heure: "15:00", disponible: true },
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
          { heure: "08:00", disponible: true },
          { heure: "08:30", disponible: true },
          { heure: "09:00", disponible: false },
          { heure: "09:30", disponible: true },
          { heure: "10:00", disponible: true },
          { heure: "10:30", disponible: false },
          { heure: "11:00", disponible: true },
          { heure: "11:30", disponible: true },
          { heure: "12:00", disponible: false },
          { heure: "12:30", disponible: false },
          { heure: "13:00", disponible: true },
          { heure: "13:30", disponible: true },
          { heure: "14:00", disponible: false },
          { heure: "14:30", disponible: true },
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
          { heure: "11:00", disponible: true },
          { heure: "12:00", disponible: true },
          { heure: "-", disponible: false },
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
          { heure: "08:30", disponible: true },
          { heure: "-", disponible: false },
          { heure: "10:00", disponible: true },
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
          { heure: "15:00", disponible: true },
          { heure: "16:00", disponible: true },
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
          { heure: "13:00", disponible: true },
          { heure: "14:00", disponible: true },
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
          { heure: "10:00", disponible: true },
          { heure: "11:30", disponible: true },
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