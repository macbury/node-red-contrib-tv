import React, { useMemo, useEffect, createContext } from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext<any>(null)

export type TScreenInfo = {
  name: string
  id: string
}

export interface IWidget {
  node: {
    id: string
    type: string
    config: any
  },
  style: any,
  state: any
}

export interface IScreen {
  name: string
  id: string
  columns: number
  layout: any[]
  widgetHeight: number
  widgetWidth: number
}

function join(args) {
  var trimRegex = new RegExp('^\\/|\\/$','g');
  var paths = Array.prototype.slice.call(args);
  return '/'+paths.map(function(e) {
      if (e) { return e.replace(trimRegex,""); }
  }).filter(function(e) {return e;}).join('/');
}

export function SocketProvider({ children }) {
  const socket = useMemo(() => (io({
    path: join([location.pathname, 'data'])
  })), [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const socket = React.useContext(SocketContext)

  if (!socket) {
    throw new Error('Could not io provider')
  }

  return socket
}

export function useSocketEvent(event: string, callback: () => void) {
  const socket = useSocket()

  useEffect(() => {
    socket.on(event, callback)

    return () => {
      socket.off(event, callback)
    }
  }, [socket, callback, event])
}

// https://github.com/socketio/socket.io-client/blob/HEAD/docs/API.md#event-connect
export function useSocketConnectedEvent(callback: () => void) {
  useSocketEvent('connect', callback)
}

export function useSocketDisconnectedEvent(callback: () => void) {
  useSocketEvent('disconnect', callback)
}

export function useSocketWidgetsInitEvent(screenId : string ,callback: (widgets : IWidget[]) => void) {
  useSocketEvent(`widgets:${screenId}:init`, callback as any)
}

export function useSocketWidgetUpdateEvent(screenId : string, callback: (widget : IWidget) => void) {
  useSocketEvent(`widgets:${screenId}:update`, callback as any)
}

export function useSocketScreensInit(callback: (screens : TScreenInfo[]) => void) {
  useSocketEvent('screens:init', callback as any)
}

export function useSocketScreensChange(screenId : string, callback: (screen : IScreen) => void) {
  const io = useSocket()
  useSocketEvent(`screens:${screenId}:update`, callback as any)
  useEffect(() => {
    callback(null)
    io.emit('screens:fetch', { screenId })
  }, [screenId])
}