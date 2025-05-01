import Image from "next/image"
import LoginForm from "@/components/login/loginForm"

export const metadata = {
  title: "Connexion | BookMyDoctor",
  description: "Connectez-vous à votre compte BookMyDoctor",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-md mx-auto mb-8">
        <Image src="/logo.png" alt="BookMyDoctor" width={250} height={100} className="mx-auto" />
      </div>

      <LoginForm />
    </main>
  )
}
