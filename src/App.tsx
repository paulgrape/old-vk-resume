import { useEffect, useState } from 'react'
import { ErrorBoundary } from './components/organisms/ErrorBoundary/ErrorBoundary'
import { LocaleProvider } from './i18n/LocaleContext'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { ResumePage } from './pages/ResumePage/ResumePage'
import { getResumeRouteIdFromHash } from './data/resumeRoutes'

export default function App() {
  const [routeId, setRouteId] = useState(() =>
    getResumeRouteIdFromHash(window.location.hash),
  )

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
      <ErrorBoundary>
        {routeId ? <ResumePage routeId={routeId} /> : <NotFoundPage />}
      </ErrorBoundary>
    </LocaleProvider>
  )
}
