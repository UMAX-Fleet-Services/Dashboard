import { useEffect, useSyncExternalStore } from 'react'
import { io, type Socket } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || ''

let socket: Socket | null = null
let isConnected = false
const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) {
    listener()
  }
}

function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    })
    socket.on('connect', () => { isConnected = true; notify() })
    socket.on('disconnect', () => { isConnected = false; notify() })
  }
  return socket
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => { listeners.delete(callback) }
}

function getSnapshot() {
  return isConnected
}

export function useSocket() {
  const s = getSocket()
  const connected = useSyncExternalStore(subscribe, getSnapshot)

  useEffect(() => {
    // Ensure socket is initialized
    getSocket()
  }, [])

  return { socket: s, connected }
}
