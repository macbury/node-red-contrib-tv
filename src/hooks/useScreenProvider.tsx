import React, { useState } from 'react'
import { IScreen, useSocketScreensChange } from './useSocket'

export function useScreen(screenId : string) {
  const [screen, setScreen] = useState<IScreen | null>(null)
  useSocketScreensChange(screenId, setScreen)

  return screen
}
