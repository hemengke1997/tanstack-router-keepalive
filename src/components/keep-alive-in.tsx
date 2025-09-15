import type { StaticDataRouteOption } from '@tanstack/react-router'
import { Outlet, useLocation, useMatches } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { useKeepAliveContext } from '@/contexts/keep-alive'
import CachedOutlet from './cached-outlet'
import OffScreen from './off-screen'

function KeepAliveIn() {
  const { aliveRoutes, setAliveRoutes } = useKeepAliveContext()

  const routerPathname = useLocation({
    select: location => location.pathname,
  })

  const matches = useMatches()
  const mathcedKeys = useMemo(() => {
    return matches.map(match => match.id)
  }, [matches])

  useEffect(() => {
    Promise.resolve().then(() => {
      let staticData: StaticDataRouteOption | undefined
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]

        if (!match.staticData?.keepAlive)
          continue
        staticData = match.staticData
        break
      }

      if (staticData?.keepAlive) {
        setAliveRoutes(routerPathname, {
          staticData,
          element: <CachedOutlet />,
        })
      }
      else {
        setAliveRoutes(routerPathname, {
          ...aliveRoutes[routerPathname],
          staticData: staticData || {},
        })
      }
    })
  }, [mathcedKeys])

  return (
    <>
      {Object.entries(aliveRoutes).map(([pathname, route]) =>
        route.staticData.keepAlive
          ? (
              <OffScreen
                key={pathname}
                pathname={pathname}
                mode={routerPathname === pathname ? 'visible' : 'hidden'}
              >
                {route.element}
              </OffScreen>
            )
          : (
              pathname === routerPathname && <Outlet key={pathname} />
            ),
      )}
    </>
  )
}

export default KeepAliveIn
