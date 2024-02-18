import { Session } from '@supabase/supabase-js'
import { StateCreator } from 'zustand'

export type SessionSlice = {
    session: Session | null,
    setSession: (s: Session) => void
}

export const createSessionSlice: StateCreator<SessionSlice> = ((set) => ({
  session: null,
  setSession: (session) => set((state) => ({ session })),
}))