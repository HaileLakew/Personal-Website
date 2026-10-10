'use client'
import { useSyncExternalStore } from 'react'

// Tiny loading-gate store. Kept free of three/drei so it can live in the main bundle;
// the Canvas chunk feeds it through loadingBridge.js.
let state = { progress: 0, done: false }
const listeners = new Set()

export function setLoading(next) {
  state = { ...state, ...next }
  listeners.forEach(l => l())
}

const subscribe = (l) => (listeners.add(l), () => listeners.delete(l))
const getSnapshot = () => state
const getServerSnapshot = () => state

export const useLoading = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

// Don't strand visitors on a blank page if WebGL or the model never loads.
if (typeof window !== 'undefined') setTimeout(() => setLoading({ done: true }), 20000)
