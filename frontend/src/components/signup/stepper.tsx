"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import type { StepperProps } from "@/types/auth"

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-md mx-auto my-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep

        return (
          <div key={index} className="flex items-center w-full">
            {/* Step circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center justify-center w-12 h-12 rounded-full z-10 
                ${isCompleted || isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {isCompleted ? <Check className="w-6 h-6" /> : <span className="text-lg font-medium">{stepNumber}</span>}
            </motion.div>

            {/* Connector line */}
            {index < totalSteps - 1 && (
              <motion.div
                initial={{ scaleX: 0 , width : 0}}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className={`flex-1 h-1 origin-left ${isCompleted ? "bg-secondary" : "bg-gray-200"}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
