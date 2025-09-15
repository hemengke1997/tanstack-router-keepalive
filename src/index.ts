export { KeepAliveOutlet } from './components/keep-alive-outlet'
export { KeepAliveProvider } from './contexts/keep-alive'
export { useActiveEffect } from './hooks/use-active-effect'
export { useKeepAlive } from './hooks/use-keep-alive'
export * from './types'

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    keepAlive?: boolean
  }
}
