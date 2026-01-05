"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, ImageOverlay, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import L, { LatLngBoundsExpression } from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom Location Marker Icon
const locationIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

// Custom User Marker Icon
const userIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

interface MapViewProps {
    targetLocation?: [number, number]
    targetName?: string
}

function LocationMarker() {
    const [position, setPosition] = useState<L.LatLng | null>(null)
    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    // Locate user on load
    useEffect(() => {
        map.locate()
    }, [map])

    return position === null ? null : (
        <Marker position={position} icon={userIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function RecenterController({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap()
    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], 16)
        }
    }, [lat, lng, map])
    return null
}

export function MapView({ targetLocation, targetName }: MapViewProps) {
    // Approximate bounds for JNTUH (Top-Left to Bottom-Right)
    // Adjust these to match the image overlay perfectly over the real map tile
    const bounds: LatLngBoundsExpression = [
        [17.5020, 78.3850], // Top Left
        [17.4900, 78.4000], // Bottom Right
    ]

    const center: [number, number] = targetLocation || [17.495, 78.392]

    return (
        <div className="h-full w-full relative z-0">
            <MapContainer center={center} zoom={15} scrollWheelZoom={true} className="h-full w-full rounded-lg">
                {/* Real Map Tiles (OpenStreetMap) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Custom Image Overlay */}
                <ImageOverlay
                    url="/maps/jntuh-map.png"
                    bounds={bounds}
                    opacity={0.8}
                    zIndex={10}
                />

                {/* Target Marker */}
                {targetLocation && (
                    <>
                        <Marker position={targetLocation} icon={locationIcon}>
                            <Popup>
                                <div className="font-bold text-center">
                                    {targetName}<br />
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${targetLocation[0]},${targetLocation[1]}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline text-xs block mt-1"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                        <RecenterController lat={targetLocation[0]} lng={targetLocation[1]} />
                    </>
                )}

                {/* User Location */}
                <LocationMarker />
            </MapContainer>
        </div>
    )
}
