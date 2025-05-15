"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fr } from "date-fns/locale";
import {  PlusIcon, TrashIcon } from "lucide-react";
import { useAuthStore } from "@/lib/zustand/auth-store";
import axios from "axios";
import Toast from "@/components/ui/Toast";

interface FormValues {
  date: Date | null;
  slots: { start: string; end: string }[];
}

interface Disponibilite {
  disponibilite_id: number;
  date_disponibilite: string;
  heure_debut: string;
  heure_fin: string;
  praticien_id: number;
}

export default function DisponibilitePage() {
  const user = useAuthStore((state) => state.user);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [mesDisponibilites, setMesDisponibilites] = useState<Disponibilite[]>([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [showToast, setShowToast] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      date: new Date(),
      slots: [{ start: "09:00", end: "12:00" }],
    },
  });
  const { control, handleSubmit, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots",
  });

  const handleCalendarSelect = (date: Date | undefined) => {
    setCalendarDate(date);
    setValue("date", date ?? null);
  };

  useEffect(() => {
    if (!user?.id) return;
    axios.get(`http://localhost:8000/disponibilite/list?praticien_id=${user.id}`)
      .then((res) => setMesDisponibilites(res.data))
      .catch(() => setMesDisponibilites([]));
  }, [user?.id]);

  const onSubmit = (data: FormValues) => {
    if (!user?.id || !data.date) return;
    const dateStr = data.date.toISOString().split("T")[0];
    const promises = data.slots.map(slot =>
      axios.post("http://localhost:8000/disponibilite/create/", {
        date_disponibilite: dateStr,
        heure_debut: slot.start,
        heure_fin: slot.end,
        praticien_id: user.id,
      })
    );
    Promise.all(promises).then(() => {
      axios.get(`http://localhost:8000/disponibilite/list?praticien_id=${user.id}`)
        .then((res) => setMesDisponibilites(res.data));
      setShowToast(true);
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/disponibilite/${id}/`);
      setMesDisponibilites(mesDisponibilites.filter((d) => d.disponibilite_id !== id));
      setShowToast(true);
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      setShowToast(true);
    }
  };

  return (
    <div className="p-6">
      <Toast show={showToast} message="Disponibilité ajoutée avec succès !" onClose={() => setShowToast(false)} type="success" />
      <h1 className="text-3xl font-bold mb-1">Gestion des disponibilités</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendrier */}
          <div className="bg-white rounded-xl border p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-1">Calendrier</h2>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={calendarDate}
                  onSelect={handleCalendarSelect}
                  locale={fr}
                  className="rounded-md border [&_.rdp-day_selected]:!bg-[#00aed6] [&_.rdp-day_selected]:!text-white"
                  disabled={(date) => date < today}
                />
              )}
            />
          </div>
          {/* Plages horaires */}
          <div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-1">Plages horaires</h2>
            <div>
              <label className="block text-xs mb-1 font-medium">Plages horaires</label>
              <div className="flex flex-col gap-2">
                {fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Controller
                      control={control}
                      name={`slots.${idx}.start`}
                      render={({ field }) => (
                        <Input type="time" {...field} className="w-28" />
                      )}
                    />
                    <span>à</span>
                    <Controller
                      control={control}
                      name={`slots.${idx}.end`}
                      render={({ field }) => (
                        <Input type="time" {...field} className="w-28" />
                      )}
                    />
                    {fields.length > 1 && (
                      <Button variant="ghost" size="icon" type="button" onClick={() => remove(idx)}>
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2 w-fit" type="button" onClick={() => append({ start: "", end: "" })}>
                  <PlusIcon className="w-4 h-4 mr-2" /> Ajouter une plage horaire
                </Button>
              </div>
            </div>
            <Button className="mt-4 w-full text-base font-medium bg-[#00aed6] hover:bg-[#00aed6]/80 cursor-pointer text-white" size="lg" type="submit">
              Enregistrer les disponibilités
            </Button>
          </div>
        </div>
      </form>
      {/* Section Mes disponibilités */}
      <div className="mt-10 border rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-2">Mes disponibilités</h2>
        {mesDisponibilites.length === 0 ? (
          <p className="text-muted-foreground">Aucune disponibilité enregistrée.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Date</th>
                  <th className="px-4 py-2 border-b text-left">Heure début</th>
                  <th className="px-4 py-2 border-b text-left">Heure fin</th>
                  <th className="px-4 py-2 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {mesDisponibilites.map((d) => (
                  <tr key={d.disponibilite_id}>
                    <td className="px-4 py-2 border-b">{d.date_disponibilite}</td>
                    <td className="px-4 py-2 border-b">{d.heure_debut}</td>
                    <td className="px-4 py-2 border-b">{d.heure_fin}</td>
                    <td className="px-4 py-2 border-b">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        type="button" 
                        onClick={() => handleDelete(d.disponibilite_id)}
                        className="group relative cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-red-500"
                      >
                        <TrashIcon className="w-4 h-4 text-black stroke-current stroke-2" />
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-6 h-6 text-white animate-fall" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 5H3M19 5V21C19 21.5304 18.7893 22.0391 18.4142 22.4142C18.0391 22.7893 17.5304 23 17 23H7C6.46957 23 5.96086 22.7893 5.58579 22.4142C5.21071 22.0391 5 21.5304 5 21V5M8 5V3C8 2.46957 8.21071 1.96086 8.58579 1.58579C8.96086 1.21071 9.46957 1 10 1H14C14.5304 1 15.0391 1.21071 15.4142 1.58579C15.7893 1.96086 16 2.46957 16 3V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
