"use client"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { StethoscopeIcon, StethoscopeIconHandle } from "./ui/stethoscope"
import { BellIcon,BellIconHandle } from "./ui/bell"
import { UserIcon, UserIconHandle } from "./ui/user"
import { useRef } from "react"

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const stethoRef = useRef<StethoscopeIconHandle>(null)
  const bellRef = useRef<BellIconHandle>(null)
  const userRef = useRef<UserIconHandle>(null)

  const handleNavigation = (path: string) => {
    setIsLoading(true)
    setIsMobileMenuOpen(false)
    router.push(path)
  }

  const isActive = (path: string) => {
    const result = pathname?.startsWith(path)
    console.log(`Path: ${path}, isActive: ${result}`)
    return result
  }

  return (
    <>
      <div className="bg-[#00aed6] flex justify-between items-center p-5">
        <Image 
          alt="logo"
          src="/logowhite.svg"
          width="100"
          height="100"
          onClick={() => handleNavigation("/patient")}
          className="cursor-pointer"
        />
        {/* Menu burger pour mobile */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
            />
          </svg>
        </button>
        {/* Menu desktop */}
        <ul className="hidden lg:flex gap-2">
          <li
            className={`btn btn-outline rounded-full border-none hover:bg-white hover:text-black flex items-center ${
              isActive("/patient/consultations") ? "bg-white !text-black" : "text-white"
            }`}
            onMouseEnter={() => stethoRef.current?.startAnimation()}
            onMouseLeave={() => stethoRef.current?.stopAnimation()}
            onClick={() => handleNavigation("/patient/consultations")}
          >
            <StethoscopeIcon ref={stethoRef}  size={20}/>
            Mes consultations
          </li>
          <li 
            className={`btn btn-outline rounded-full border-none hover:bg-white hover:text-black flex items-center ${
              isActive("/patient/notifications") ? "bg-white !text-black" : "text-white"
            }`}
            onMouseEnter={() => bellRef.current?.startAnimation()}
            onMouseLeave={() => bellRef.current?.stopAnimation()}
            onClick={() => handleNavigation("/patient/notifications")}
          >
              <BellIcon ref={bellRef} size={20}/>
            Notifications
          </li>
          <li 
            className={`btn btn-outline rounded-full border-none hover:bg-white hover:text-black flex items-center ${
              isActive("/patient/profile") ? "bg-white !text-black" : "text-white"
            }`}
            onMouseEnter={() => userRef.current?.startAnimation()}
            onMouseLeave={() => userRef.current?.stopAnimation()}
            onClick={() => handleNavigation("/patient/profile")}
          >
              <UserIcon ref={userRef} size={20}/>
            Mon profil
          </li>
        </ul>
      </div>

      {/* Menu mobile full screen */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#00aed6] z-50 flex flex-col items-center justify-center lg:hidden">
          <button 
            className="absolute top-5 right-5 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
          <ul className="flex flex-col gap-8 text-center">
            <li
              className={`text-2xl font-semibold ${
                isActive("/patient/consultations") ? "text-white" : "text-white/80"
              }`}
              onClick={() => handleNavigation("/patient/consultations")}
            >
              Mes consultations
            </li>
            <li 
              className={`text-2xl font-semibold ${
                isActive("/patient/notifications") ? "text-white" : "text-white/80"
              }`}
              onClick={() => handleNavigation("/patient/notifications")}
            >
              Notifications
            </li>
            <li 
              className={`text-2xl font-semibold ${
                isActive("/patient/profile") ? "text-white" : "text-white/80"
              }`}
              onClick={() => handleNavigation("/patient/profile")}
            >
              Mon profil
            </li>
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-white">
          <div className="h-full bg-blue-500 animate-[loading_1s_ease-in-out_infinite]"></div>
        </div>
      )}
    </>
  )
}

export default Header
