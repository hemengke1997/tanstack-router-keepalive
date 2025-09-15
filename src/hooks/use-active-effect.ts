import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'
import { useActiveChanged } from './use-active-changed'

export function useActiveEffect(activeCallback: EffectCallback, deps?: DependencyList) {
  const returnValue = useRef<ReturnType<EffectCallback> | undefined>(undefined)

  const actived = useRef(false)

  useEffect(() => {
    if (actived.current) {
      returnValue.current = activeCallback()
    }

    return () => {
      if (actived.current) {
        returnValue.current?.()
      }
    }
  }, deps)

  useActiveChanged((active) => {
    if (active) {
      actived.current = true
      returnValue.current = activeCallback()
    }
    else {
      actived.current = false
      returnValue.current?.()
    }
  })
}
