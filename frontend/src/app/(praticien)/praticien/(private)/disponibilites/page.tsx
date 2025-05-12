"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, PlusIcon, TrashIcon } from "lucide-react";

interface FormValues {
  date: Date | null;
  repeat: string;
  duration: string;
  teleconsult: boolean;
  slots: { start: string; end: string }[];
}

export default function DisponibilitePage() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const form = useForm<FormValues>({
    defaultValues: {
      date: new Date(),
      repeat: "none",
      duration: "30",
      slots: [{ start: "09:00", end: "12:00" }],
    },
  });
  const { control, handleSubmit, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots",
  });

  // Synchroniser la date du calendrier avec le champ du formulaire
  const handleCalendarSelect = (date: Date | undefined) => {
    setCalendarDate(date);
    setValue("date", date ?? null);
  };

  const onSubmit = (data: FormValues) => {
    // Ici, tu peux envoyer les données à l'API
    console.log(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-1">Gestion des disponibilités</h1>
      <p className="text-muted-foreground mb-6">Définissez vos plages horaires de disponibilité pour les consultations</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendrier */}
          <div className="bg-white rounded-xl border p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-1">Calendrier</h2>
            <p className="text-muted-foreground mb-4 text-sm">Sélectionnez les dates pour ajouter des disponibilités</p>
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
            <p className="text-muted-foreground mb-4 text-sm">Définissez vos heures de disponibilité pour les dates sélectionnées</p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs mb-1 font-medium">Date disponibilité</label>
                <div className="relative">
                  <Input
                    type="text"
                    value={calendarDate ? format(calendarDate, "d MMMM yyyy", { locale: fr }) : ""}
                    readOnly
                    className="pr-10"
                  />
                  <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 font-medium">Type de répétition</label>
                <Controller
                  control={control}
                  name="repeat"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pas de répétition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Pas de répétition</SelectItem>
                        <SelectItem value="daily">Tous les jours</SelectItem>
                        <SelectItem value="weekly">Toutes les semaines</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1 font-medium">Durée (minutes)</label>
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="30 minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
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
              <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M5 12.75a.75.75 0 0 1 .75-.75h5.5V6.75a.75.75 0 0 1 1.5 0v5.25h5.5a.75.75 0 0 1 0 1.5h-5.5v5.25a.75.75 0 0 1-1.5 0V13.5h-5.5A.75.75 0 0 1 5 12.75Z"/></svg></span>
              Enregistrer les disponibilités
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
