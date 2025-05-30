import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Check, EditIcon, MapPin, Navigation, Search } from "lucide-react";

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
  initialLocation?: { lat: number; lng: number };
  idCx?: string;
  initialAddress?: string;
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
function Map({
  onLocationSelect,
  initialLocation,
  initialAddress,
}: MapComponentProps) {
  const [searchQuery, setSearchQuery] = useState(initialAddress?.trim());
  const [map, setMap] = useState<L.Map | null>(null);
  const [position, setPosition] = useState<L.LatLng>(
    L.latLng(
      initialLocation?.lat || center.lat,
      initialLocation?.lng || center.lng
    )
  );

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setPosition(L.latLng(location.lat, location.lng));
  };

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchQuery
          )}&key=AIzaSyD1AunFh7l1TlZjxhQTuBlP-NqL1M61n_4`
        );
        const results = await response.json();

        if (results.results.length > 0) {
          let newPosition = null;

          if (results.results[0] && results.results[0]?.geometry.location) {
            const { lat, lng } = results.results[0]?.geometry.location;
            newPosition = L.latLng(parseFloat(lat), parseFloat(lng));
          } else if (results.results[0]?.navigation_points[0]?.location) {
            const { latitude, longitude } =
              results.results[0].navigation_points[0].location;
            newPosition = L.latLng(parseFloat(latitude), parseFloat(longitude));
          }

          setPosition(newPosition as any);
          if (map) {
            map.setView(newPosition as any, 13);
          }
        }
      } catch (error) {
        console.error("Error al buscar la locación:", error);
      }
    }
  };

  useEffect(() => {
    if (initialAddress && map) {
      setTimeout(() => {
        handleSearch();
      }, 1000);
    }
  }, [map, initialAddress]);

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
    <div className="w-full h-full flex flex-col gap-2">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold">Seleccionar ubicación</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Busca una dirección o haz clic en el mapa para seleccionar la
          ubicación
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ outline: "none", boxShadow: "none" }}
            className="pl-9 pr-4 py-2 h-10 focus:outline-none"
            placeholder="Buscar dirección"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Buscar
        </Button>
      </div>

      <div className="h-[280px]">
        <MapContainer
          center={position}
          zoom={13}
          style={{ borderRadius: "10px", height: "250px", width: "100%" }}
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
        onClick={handleCurrentLocation}
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <Navigation className="h-4 w-4 text-orange-500" />
        Ir a mi ubicación
      </Button>

      <Button
        onClick={(e) => {
          e.preventDefault();
          if (position) {
            onLocationSelect({ lat: position.lat, lng: position.lng });
          }
        }}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        disabled={!position}
      >
        <Check className="h-4 w-4 mr-2" />
        Confirmar ubicación
      </Button>
    </div>
  );
}

// Componente principal que verifica si estamos en el cliente
export function LocationGps({
  onLocationSelect,
  initialLocation,
  idCx,
  initialAddress,
}: MapComponentProps) {
  const [open, setOpen] = useState(false);

  const [enableByDefault] = useState(idCx && initialLocation?.lat);
  return (
    <div className="">
      <Dialog
        open={open}
        onOpenChange={(value) => value === false && setOpen(false)}
      >
        <DialogTrigger asChild>
          {enableByDefault || initialLocation?.lat ? (
            <div className="mb-4 relative ">
              <p className="flex items-center gap-2">
                Lat: {Number(initialLocation?.lat).toFixed(2)} / Lng:{" "}
                {Number(initialLocation?.lng).toFixed(2)}
                {!enableByDefault && (
                  <EditIcon
                    onClick={() => setOpen(true)}
                    className=" cursor-pointer"
                  />
                )}
              </p>
            </div>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              className="w-full bg-fanafesa"
            >
              Abrir
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <div className="h-[550px] w-full mt-5">
            {open && (
              <Map
                initialAddress={initialAddress}
                onLocationSelect={(e) => {
                  onLocationSelect(e);
                  setOpen(false);
                }}
                initialLocation={initialLocation}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
