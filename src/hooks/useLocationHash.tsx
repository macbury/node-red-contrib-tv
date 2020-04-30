import { useState, useLayoutEffect } from 'react'

export default function useLocationHash() {
  const [page, setPage] = useState(null)

  useLayoutEffect(() => {
    const locationHashChanged = () => {
      const p = decodeURIComponent(location.hash.slice(1, location.hash.length))
      setPage(p.length > 0 ? p : null)
    }

    window.addEventListener('hashchange', locationHashChanged, false)
    locationHashChanged()
    return () => window.removeEventListener('hashchange', locationHashChanged)
  })

  return page
}