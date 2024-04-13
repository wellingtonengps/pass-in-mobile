import {create} from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"

import AsyncStorage from "@react-native-async-storage/async-storage"

export type Event = {
    id: string,
    title: string,
    details: string,
}

export type BadgeStore = {
    id: string,
    name: string,
    email: string,
    eventId: string,
    checkInUrl: string,
    image?: string
}

export type Data = {
    badge: BadgeStore,
    event: Event
}

type StateProps = {
    data: Data | null
    save: (data: Data) => void
    remove: () => void
    updateAvatar: (uri: string) => void
}

export const useBadgeStore = create(persist<StateProps>((set) => ({
    data: null,
    save: (data: Data) => set(() => ({data})),
    remove: () => set(() => ({data: null})),
    updateAvatar: (uri: string) => set((state) => ({
        data: state.data ? { ...state.data, badge: { ...state.data.badge, image: uri } } : state.data,
    }))
}), {
    name: "nlw-unite:badge",
    storage: createJSONStorage(() => AsyncStorage)
}))