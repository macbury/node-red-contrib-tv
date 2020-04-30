import { useCallback, useState, useLayoutEffect } from 'react'

const LAYOUT_SAVE_KEY = '@node-red/tv'

function loadLayout() {
  if (localStorage[LAYOUT_SAVE_KEY]) {
    return JSON.parse(localStorage.getItem(LAYOUT_SAVE_KEY))
  } else {
    return []
  }
}

export default function usePersistedLayout(widgets : any[]) {
  const [loaded, setLoaded] = useState(false)
  const [layout, setLayout] = useState([])

  const onSaveLayout = useCallback((newLayout) => {
    if (loaded) {
      //console.log('Persiste layout', newLayout)
      localStorage.setItem(LAYOUT_SAVE_KEY, JSON.stringify(newLayout))
    }
  }, [loaded])

  useLayoutEffect(() => {
    if (!loaded && widgets.length > 0) {
      //console.log('Loaded layout')
      setLayout(loadLayout())
      setLoaded(true)
    }
  }, [widgets])

  return [layout, onSaveLayout]
}