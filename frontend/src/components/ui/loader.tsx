"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoaderProps {
  loadingTime: number;
}

export const Loader = ({ loadingTime }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const interval = loadingTime / 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="fixed inset-0 bg-[#00aed6] flex items-center justify-center z-50">
      {/* Logo au centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48"
        >
          <Image
            src="/logowhite.svg"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Cercle de progression avec pourcentage en bas à gauche */}
      <div className="absolute bottom-8 left-8">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Cercle de fond */}
            <circle
              className="stroke-white/10"
              strokeWidth="4"
              fill="none"
              cx="50"
              cy="50"
              r="45"
            />
            {/* Cercle de progression */}
            <motion.circle
              className="stroke-white"
              strokeWidth="4"
              fill="none"
              cx="50"
              cy="50"
              r="45"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1 }}
              strokeLinecap="round"
            />
            {/* Pourcentage au centre */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-xl font-bold"
            >
              {Math.round(progress)}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}; 