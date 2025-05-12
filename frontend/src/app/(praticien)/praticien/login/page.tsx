import Image from "next/image"
import LoginForm from "@/components/login/loginPraticienForm"

export const metadata = {
  title: "Connexion | BookMyDoctor",
  description: "Connectez-vous à votre compte BookMyDoctor",
}

export default function LoginPraticienPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 z-0">
        <Image src="/img/bg_prat.jpg" alt="Arrière-plan médical" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <LoginForm />
    </main>
  )
}
