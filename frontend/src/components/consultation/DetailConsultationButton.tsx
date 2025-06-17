import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface DetailConsultationButtonProps {
  consultationId: number
}

export function DetailConsultationButton({ consultationId }: DetailConsultationButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1 text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors"
      onClick={() => router.push(`/patient/consultations/${consultationId}`)}
    >
      <FileText size={14} />
      Voir détails
    </Button>
  )
} 