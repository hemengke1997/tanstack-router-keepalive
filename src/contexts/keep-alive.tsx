import type { StaticDataRouteOption } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

type KeepAliveProviderProps = {
  children: ReactNode
  defaultAliveRoutes?: AliveRoutes
}

type AliveRouteData = {
  staticData: StaticDataRouteOption
  element?: ReactNode
}

export type AliveRoutes = {
  [key: string]: AliveRouteData
}

export type KeepAliveContextState = {
  aliveRoutes: AliveRoutes
  setAliveRoutes: (pathname: string, data: AliveRouteData) => void
  deleteAliveRoutes: (pathname: string[]) => void
}

const KeepAliveContext = createContext<KeepAliveContextState>({
  aliveRoutes: {},
  setAliveRoutes: () => {},
  deleteAliveRoutes: () => {},
})

export function KeepAliveProvider({ children, defaultAliveRoutes = {} }: KeepAliveProviderProps) {
  const [aliveRoutes, _setAliveRoutes] = useState<AliveRoutes>(defaultAliveRoutes)

  const setAliveRoutes = (key: string, value: AliveRouteData) => {
    _setAliveRoutes((state) => {
      return { ...state, [key]: value }
    })
  }

  const deleteAliveRoutes = (keys: string[]) => {
    _setAliveRoutes((state) => {
      const newState = { ...state }
      keys.forEach((key) => {
        delete newState[key]
      })
      return newState
    })
  }

  return (
    <KeepAliveContext.Provider value={{ aliveRoutes, setAliveRoutes, deleteAliveRoutes }}>
      {children}
    </KeepAliveContext.Provider>
  )
}

export function useKeepAliveContext() {
  return useContext(KeepAliveContext)
}
