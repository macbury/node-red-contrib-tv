import "./styles.scss"
import React from "react"
import { SocketProvider } from './hooks/useSocket'

import ScreenSelector from './components/ScreenSelector'

export default function App() {
  return (
    <React.StrictMode>
      <SocketProvider>
        <ScreenSelector />
      </SocketProvider>
    </React.StrictMode>
  )
}
