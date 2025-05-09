"use client"

import { useState, useEffect } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement basé sur la connexion internet
    const simulateLoading = async () => {
      try {
        const startTime = performance.now();
        await fetch('/api/ping'); // Endpoint simple pour tester la connexion
        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Ajuster le temps de chargement en fonction de la latence
        const minLoadingTime = 2000; // Temps minimum de 2 secondes
        const maxLoadingTime = 5000; // Temps maximum de 5 secondes
        const loadingTime = Math.min(Math.max(loadTime * 2, minLoadingTime), maxLoadingTime);

        setTimeout(() => {
          setIsLoading(false);
        }, loadingTime);
      } catch (error) {
        // En cas d'erreur, charger pendant un temps minimum
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    simulateLoading();
  }, []);

  return isLoading;
}; 