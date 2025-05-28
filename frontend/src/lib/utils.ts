import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fadeUpRightVariants = {
  hidden: { opacity: 0, x: -20, y: 20 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 20, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
}

export const getWeekDays = () => {
  const today = new Date();
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  

  const currentDay = today.getDay();
  const daysUntilMonday = currentDay === 0 ? 1 : currentDay === 6 ? 2 : 0;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + daysUntilMonday);
  
  const weekDays = [];
  const weekDates = [];
  

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    weekDays.push(days[date.getDay()]);
    weekDates.push(`${date.getDate()} ${months[date.getMonth()]}`);
  }
  
  return { weekDays, weekDates };
};