"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface Consultation {
  patient: string
  date: string
  heure: string
  motif: string
}

export default function Page() {
  const [consultations, setConsultations] = useState<Consultation[]>([])

  useEffect(() => {
    axios.get("/api/consultations").then((res) => {
      setConsultations(res.data)
    })
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Liste des consultations</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Patient</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Heure</th>
              <th className="text-left py-3 px-4">Motif</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation, index) => (
              <tr key={index} className="border-b hover:bg-muted/30">
                <td className="py-3 px-4">{consultation.patient}</td>
                <td className="py-3 px-4">{consultation.date}</td>
                <td className="py-3 px-4">{consultation.heure}</td>
                <td className="py-3 px-4">{consultation.motif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
