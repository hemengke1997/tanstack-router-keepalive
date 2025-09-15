import type { AliveRoutes } from '@/contexts/keep-alive'
import { useMemo } from 'react'
import { useKeepAliveContext } from '@/contexts/keep-alive'
import { useEventListener } from './use-event-listener'
import { useUpdate } from './use-update'

export function useKeepAlive() {
  const { aliveRoutes: _aliveRoutes, deleteAliveRoutes } = useKeepAliveContext()

  const aliveRoutes = useMemo(() => {
    return Object.entries(_aliveRoutes).reduce((acc, [key, value]) => {
      if (value.staticData?.keepAlive) {
        acc[key] = value
      }
      return acc
    }, {} as AliveRoutes)
  }, [_aliveRoutes])

  const update = useUpdate()

  useEventListener({
    on: {
      activeChange: () => {
        update()
      },
    },
  })

  const destroy = (pathname: string | string[]) => {
    pathname = Array.isArray(pathname) ? pathname : [pathname]
    deleteAliveRoutes(pathname)
  }

  const destroyAll = () => {
    deleteAliveRoutes(Object.keys(aliveRoutes))
  }

  return {
    aliveRoutes,
    destroy,
    destroyAll,
  }
}
