import "./styles.scss"
import React from "react"
import { SocketProvider } from './hooks/useSocket'

import ErrorCatcher from './components/ErrorCatcher'
import ScreenSelector from './components/ScreenSelector'

export default function App() {
  return (
    <React.StrictMode>
      <ErrorCatcher>
        <SocketProvider>
          <ScreenSelector />
        </SocketProvider>
      </ErrorCatcher>
    </React.StrictMode>
  )
}
