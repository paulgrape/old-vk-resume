import { useEffect, useState } from 'react'
import { LocaleProvider } from './i18n/LocaleContext'
import { ResumePage } from './pages/ResumePage/ResumePage'
import { getResumeRouteIdFromHash } from './data/resumeRoutes'

export default function App() {
  const [routeId, setRouteId] = useState(() => getResumeRouteIdFromHash(window.location.hash))

  useEffect(() => {
    function handleHashChange() {
      setRouteId(getResumeRouteIdFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <LocaleProvider>
      <ResumePage routeId={routeId} />
    </LocaleProvider>
  )
}
