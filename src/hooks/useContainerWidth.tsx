import { useRef, useState, useLayoutEffect } from 'react'

export default function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const onResize = function() {
      if (ref && ref.current) {
        setWidth(ref.current.clientWidth)
      }
    }

    onResize()
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [ref])

  return { ref, width }
}