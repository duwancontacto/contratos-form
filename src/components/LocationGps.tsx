import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Corregir el ícono por defecto
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const center = {
  lat: 19.4326,
  lng: -99.1332,
};

interface MapComponentProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation: { lat: number; lng: number };
}

function MapEvents({ onLocationSelect }: MapComponentProps) {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// Componente wrapper para el mapa
function Map({ onLocationSelect, initialLocation }: MapComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState<L.Map | null>(null);
  const [position, setPosition] = useState<L.LatLng>(
    L.latLng(
      initialLocation.lat || center.lat,
      initialLocation.lng || center.lng
    )
  );

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setPosition(L.latLng(location.lat, location.lng));
  };

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
        );
        const results = await response.json();
        if (results.length > 0) {
          const { lat, lon } = results[0];
          const newPosition = L.latLng(parseFloat(lat), parseFloat(lon));
          setPosition(newPosition);
          console.log("map", map);
          if (map) {
            map.setView(newPosition, 13);
          }
        }
      } catch (error) {
        console.error("Error al buscar la locación:", error);
      }
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = L.latLng(latitude, longitude);
          setPosition(newPosition);
          if (map) {
            map.setView(newPosition, 13);
          }
        },
        (error) => {
          console.error("Error al obtener la ubicación actual:", error);
        }
      );
    } else {
      console.error("La geolocalización no es compatible con este navegador.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 ">
      <div className="flex mb-4 items-center justify-between">
        <Input
          type="text"
          placeholder="Buscar locación..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm flex-grow focus:outline-none focus:ring-2 focus:ring-fanafesa"
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <div className="flex space-x-2 ml-2">
          <Button
            className="bg-fanafesa text-white px-4 py-2 rounded-lg shadow-md hover:bg-fanafesa-dark transition duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            Buscar
          </Button>
          <Button
            className="bg-fanafesa text-white px-4 py-2 rounded-lg shadow-md hover:bg-fanafesa-dark transition duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleCurrentLocation();
            }}
          >
            Ubicación actual
          </Button>
        </div>
      </div>
      <div className="h-[400px]">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents onLocationSelect={handleLocationSelect} />
          {position && <Marker position={position} />}
        </MapContainer>
      </div>
      <Button
        className="mt-2 bg-fanafesa"
        onClick={(e) => {
          e.preventDefault();
          if (position) {
            onLocationSelect({ lat: position.lat, lng: position.lng });
          }
        }}
      >
        Acepto esta locación
      </Button>
    </div>
  );
}

// Componente principal que verifica si estamos en el cliente
export function LocationGps({
  onLocationSelect,
  initialLocation,
}: MapComponentProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className="w-full bg-fanafesa">
            Abrir
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="h-[450px] w-full mt-5">
            <Map
              onLocationSelect={(e) => {
                onLocationSelect(e);
                setOpen(false);
              }}
              initialLocation={initialLocation}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
