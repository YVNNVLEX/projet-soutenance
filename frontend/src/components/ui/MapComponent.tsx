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
        let photoUrl = doctor.photo;
        if (photoUrl && !photoUrl.startsWith('http') && !photoUrl.startsWith('/')) {
          photoUrl = '/' + photoUrl;
        }
        new mapboxgl.Marker()
          .setLngLat([doctor.longitude, doctor.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div style="min-width:220px;max-width:260px;background:#fff;border-radius:18px;box-shadow:0 2px 16px rgba(0,0,0,0.15);padding:12px 12px 12px 12px;display:flex;gap:12px;align-items:center;">
              <img src='${photoUrl}' alt='${doctor.nom}' style="width:56px;height:56px;object-fit:cover;border-radius:12px;border:2px solid #00aed6;flex-shrink:0;" onerror="this.onerror=null;this.src='/img/default-doctor.png';" />
              <div style="flex:1;">
                <div style="font-weight:600;font-size:1rem;line-height:1.2;">${doctor.nom}</div>
                <div style="font-size:0.95rem;color:#00aed6;font-weight:500;">${doctor.specialite}</div>
                <div style="font-size:0.92rem;color:#666;">${doctor.quartier}, ${doctor.ville}</div>
              </div>
            </div>
          `))
          .addTo(map.current!);
      }
    });
  }, [doctors]);

  return (
    <div className="w-full h-full" ref={mapContainer} />
  );
};

export default MapComponent; 