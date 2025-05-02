"use client"

import Image from "next/image"
import { useState , useRef } from "react"
import { Player } from '@lordicon/react'
import ICON from "./lock.json"

const Header = () => {
    const playerRef = useRef<Player>(null);
    const [hovered, setHovered] = useState(false)
    const handleMouseEnter = () => {
        playerRef.current?.playFromBeginning();
        setHovered(true)
      };
    
      const handleMouseLeave = () => {
        playerRef.current?.stop();
      };

  return (
    <div 
    className="bg-[#00aed6] flex justify-between items-center p-5"
    >
        <Image 
        alt="logo"
        src="/logowhite.svg"
        width="100"
        height="100"
        />
        <ul className="flex gap-2">
            <li className="btn btn-outline rounded-full text-white border-none hover:bg-white hover:text-black flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Player 
                    ref={playerRef} 
                    icon={ ICON }
                    colorize="#00aed6"
                    state="hover"
                />
                Mes consultations
            </li>
            <li className="btn btn-outline rounded-full text-white border-none hover:text-black">

                Notifications
            </li>
            <li className="btn btn-outline rounded-full text-white border-none hover:text-black">

                Mon profil
            </li>
        </ul>
    </div>
  )
}

export default Header