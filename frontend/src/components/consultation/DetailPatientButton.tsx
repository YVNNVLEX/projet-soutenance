import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface DetailPatientButtonProps {
  consultationId: number
}

export function DetailPatientButton({ consultationId }: DetailPatientButtonProps) {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.push(`/praticien/consultations/${consultationId}`)}
      className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors cursor-pointer"
    >
      <Eye size={14} />
      Détail patient
    </button>
  )
} 