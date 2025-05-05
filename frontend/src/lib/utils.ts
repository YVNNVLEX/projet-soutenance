import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fadeUpRightVariants = {
  hidden: { opacity: 0, x: -20, y: 20 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 20, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
}

