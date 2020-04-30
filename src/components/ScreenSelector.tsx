import React, { useState } from 'react'
import { useSocketScreensInit, TScreenInfo } from '../hooks/useSocket'
import useLocationHash from '../hooks/useLocationHash'
import { useScreen } from '../hooks/useScreenProvider'
import Grid from './Grid'

export default function ScreenSelector() {
  const [screens, setScreens] = useState<Array<TScreenInfo>>([])
  const currentScreen = useLocationHash()
  const screenId = screens.find(({ name }) => name === currentScreen)?.id
  const screen = useScreen(screenId)

  useSocketScreensInit(setScreens)

  const items = screens.map(({ id, name }) => (
    <li key={id}>
      <a href={`#${name}`}>{name}</a>
    </li>
  ))

  if (screen) {
    return (
      <Grid screen={screen} />
    )
  }

  return (
    <div className="screen-selectors">
      <ul>
        {items}
      </ul>
    </div>
  )
}