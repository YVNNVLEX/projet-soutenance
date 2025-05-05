"use client"

import Image from "next/image"
import { StethoscopeIcon, StethoscopeIconHandle } from "./ui/stethoscope"
import { BellIcon,BellIconHandle } from "./ui/bell"
import { UserIcon, UserIconHandle } from "./ui/user"
import { useRef } from "react"

const Header = () => {
  const stethoRef = useRef<StethoscopeIconHandle>(null)
  const bellRef = useRef<BellIconHandle>(null)
  const userRef = useRef<UserIconHandle>(null)

  return (
    <div className="bg-[#00aed6] flex justify-between items-center p-5">
      <Image 
        alt="logo"
        src="/logowhite.svg"
        width="100"
        height="100"
      />
      <ul className="flex gap-2">
        <li
          className="btn btn-outline rounded-full text-white border-none hover:bg-white hover:text-black flex items-center"
          onMouseEnter={() => stethoRef.current?.startAnimation()}
          onMouseLeave={() => stethoRef.current?.stopAnimation()}
        >
          <StethoscopeIcon ref={stethoRef}  size={20}/>
          Mes consultations
        </li>
        <li className="btn btn-outline rounded-full text-white border-none hover:bg-white hover:text-black flex items-center"
            onMouseEnter={() => bellRef.current?.startAnimation()}
            onMouseLeave={() => bellRef.current?.stopAnimation()}
        >
            <BellIcon ref={bellRef} size={20}/>
          Notifications
        </li>
        <li className="btn btn-outline rounded-full text-white border-none hover:bg-white hover:text-black flex items-center"
            onMouseEnter={() => userRef.current?.startAnimation()}
            onMouseLeave={() => userRef.current?.stopAnimation()}
        >
            <UserIcon ref={userRef} size={20}/>
          Mon profil
        </li>
      </ul>
    </div>
  )
}

export default Header
