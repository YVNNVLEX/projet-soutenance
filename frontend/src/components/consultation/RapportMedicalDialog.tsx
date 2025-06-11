import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Stethoscope, Microscope, PillIcon, Plus, Trash2 } from "lucide-react"

interface RapportMedicalDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RapportMedicalData) => void
}

export interface RapportMedicalData {
  diagnostic: string
  examens: string[]
  medicaments: {
    nom: string
    dosage: string
    posologie: string
  }[]
}

export function RapportMedicalDialog({ isOpen, onClose, onSubmit }: RapportMedicalDialogProps) {
  const [formData, setFormData] = React.useState<RapportMedicalData>({
    diagnostic: "",
    examens: [""],
    medicaments: [{ nom: "", dosage: "", posologie: "" }]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const addMedicament = () => {
    setFormData(prev => ({
      ...prev,
      medicaments: [...prev.medicaments, { nom: "", dosage: "", posologie: "" }]
    }))
  }

  const removeMedicament = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medicaments: prev.medicaments.filter((_, i) => i !== index)
    }))
  }

  const updateMedicament = (index: number, field: keyof RapportMedicalData["medicaments"][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      medicaments: prev.medicaments.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }))
  }

  const addExamen = () => {
    setFormData(prev => ({ ...prev, examens: [...prev.examens, ""] }))
  }

  const removeExamen = (index: number) => {
    setFormData(prev => ({ ...prev, examens: prev.examens.filter((_, i) => i !== index) }))
  }

  const updateExamen = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      examens: prev.examens.map((examen, i) => 
        i === index ? value : examen
      )
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-3xl p-6 md:p-8 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">Rapport Médical</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="diagnostic" className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <Stethoscope size={20} className="text-blue-600" /> Diagnostic établi
              </Label>
              <Textarea
                id="diagnostic"
                value={formData.diagnostic}
                onChange={(e) => setFormData(prev => ({ ...prev, diagnostic: e.target.value }))}
                placeholder="Entrez le diagnostic..."
                className="mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows={4}
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <Microscope size={20} className="text-green-600" /> Examens à faire
                </Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addExamen}
                  className="flex items-center gap-1 px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
                >
                  <Plus size={16} /> Ajouter un examen
                </Button>
              </div>
              <div className="space-y-4">
                {formData.examens.map((examen, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      id={`examen-${index}`}
                      value={examen}
                      onChange={(e) => updateExamen(index, e.target.value)}
                      placeholder="Ex: Hémogramme complet"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                    {formData.examens.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExamen(index)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 border-t pt-6 border-gray-200">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <PillIcon size={20} className="text-purple-600" /> Médicaments prescrits
                </Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addMedicament}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Plus size={16} /> Ajouter un médicament
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {formData.medicaments.map((medicament, index) => (
                  <div key={index} className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800">Médicament {index + 1}</h4>
                      {formData.medicaments.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedicament(index)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} /> Supprimer
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`medicament-${index}`}>Nom du médicament</Label>
                        <Input
                          id={`medicament-${index}`}
                          value={medicament.nom}
                          onChange={(e) => updateMedicament(index, "nom", e.target.value)}
                          placeholder="Nom du médicament"
                          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                        <Input
                          id={`dosage-${index}`}
                          value={medicament.dosage}
                          onChange={(e) => updateMedicament(index, "dosage", e.target.value)}
                          placeholder="Ex: 500mg"
                          className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`posologie-${index}`}>Posologie</Label>
                      <Textarea
                        id={`posologie-${index}`}
                        value={medicament.posologie}
                        onChange={(e) => updateMedicament(index, "posologie", e.target.value)}
                        placeholder="Ex: 1 comprimé matin et soir pendant 7 jours"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Annuler
            </Button>
            <Button type="submit" className="w-full sm:w-auto px-6 py-2 bg-[#00aed6] text-white rounded-md hover:bg-[#00aed6]/80 transition-colors">
              Enregistrer le rapport
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 