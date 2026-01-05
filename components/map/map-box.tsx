"use client"

import dynamic from "next/dynamic"

const MapView = dynamic(() => import("./map-view").then((mod) => mod.MapView), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-maroon/5 text-maroon animate-pulse">
            Loading Map...
        </div>
    ),
})

interface MapBoxProps {
    targetLocation?: [number, number]
    targetName?: string
}

export function MapBox({ targetLocation, targetName }: MapBoxProps) {
    return <MapView targetLocation={targetLocation} targetName={targetName} />
}
