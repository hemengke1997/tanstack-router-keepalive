import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { KeepAliveProvider } from 'tanstack-router-keepalive'

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />

      <KeepAliveProvider>
        <Outlet />
      </KeepAliveProvider>

      <TanStackRouterDevtools />
    </>
  ),
  head: () => ({
    meta: [
      {
        title: 'KeepAlive Demo',
      },
    ],
  }),
})
