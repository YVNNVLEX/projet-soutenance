"use client"

import Header from "@/components/header"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const Page = () => {
  return (
    <>
        <Header />
        <div className="card">
          
        </div>
    </>
  )
}

export default Page