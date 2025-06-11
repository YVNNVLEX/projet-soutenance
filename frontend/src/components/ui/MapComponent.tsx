import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Praticien } from '@/types/praticien';

interface MapComponentProps {
  doctors: Praticien[];
}

const MapComponent: React.FC<MapComponentProps> = ({ doctors }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-4.0167); // Longitude d'Abidjan
  const [lat, setLat] = useState(5.3599); // Latitude d'Abidjan
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once when container is ready

    mapboxgl.accessToken = 'pk.eyJ1IjoieWFubmFsZXgiLCJhIjoiY204a2prbGVmMDlnMjJrc2doZG9veXJjNCJ9.CKldw9WEbHRGF65l5of9cQ';
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false
    });

    map.current.on('move', () => {
      setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
      setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
    });

  }, []);

  useEffect(() => {
    if (!map.current) return; // Wait for the map to be initialized

    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    doctors.forEach(doctor => {
      if (doctor.latitude && doctor.longitude) {
        new mapboxgl.Marker()
          .setLngLat([doctor.longitude, doctor.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${doctor.nom}</h3><p>${doctor.specialite}</p><p>${doctor.quartier}, ${doctor.ville}</p>`))
          .addTo(map.current!);
      }
    });
  }, [doctors]);

  return (
    <div className="w-full h-full" ref={mapContainer} />
  );
};

export default MapComponent; 