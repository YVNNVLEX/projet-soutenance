"use client";

import { useState, useEffect } from "react";
import { Loader } from "@/components/ui/loader";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(2000); // Temps par défaut

  useEffect(() => {
    const simulateLoading = async () => {
      try {
        const startTime = performance.now();
        await fetch('/api/ping');
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Ajuster le temps de chargement en fonction de la latence
        const minLoadingTime = 2000;
        const maxLoadingTime = 5000;
        const calculatedLoadingTime = Math.min(Math.max(loadTime * 2, minLoadingTime), maxLoadingTime);
        
        setLoadingTime(calculatedLoadingTime);

        setTimeout(() => {
          setIsLoading(false);
        }, calculatedLoadingTime);
      } catch (error) {
        setLoadingTime(2000);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    simulateLoading();
  }, []);

  return isLoading ? <Loader loadingTime={loadingTime} /> : <>{children}</>;
} 