import {create} from 'zustand'

interface MapRefStore{
    mapRef: any;
    setMapRef: (mapRef: any) => void;
}

export const useMapRefStore = create<MapRefStore>()(
    (set) => ({
        mapRef: null,
        setMapRef: (ref) => set({mapRef:ref}),
    })
    )