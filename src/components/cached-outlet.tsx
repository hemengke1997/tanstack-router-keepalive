import { getRouterContext, Outlet } from '@tanstack/react-router'
import cloneDeep from 'lodash/clonedeep'
import { useContext, useMemo, useRef } from 'react'

export default function CachedOutlet() {
  const RouterContext = getRouterContext()

  const routerContext = useContext(RouterContext)
  const renderedContext = useRef(routerContext)

  renderedContext.current = useMemo(() => cloneDeep(routerContext), [routerContext])

  return (
    <RouterContext.Provider value={renderedContext.current}>
      <Outlet />
    </RouterContext.Provider>
  )
}
