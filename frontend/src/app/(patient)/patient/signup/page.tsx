import Image from "next/image"
import InscriptionForm from "@/components/signup"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-3xl mx-auto mb-8">
        <Image src="/logo.svg" alt="BookMyDoctor" width={250} height={100} className="mx-auto" />
      </div>

      <InscriptionForm />
    </main>
  )
}
