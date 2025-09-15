import type { OffScreenInProps } from './off-screen-in'
import type { ActivityMode } from '@/types'
import { Suspense, useEffect, useRef } from 'react'
import { useEventListener } from '@/hooks/use-event-listener'
import OffScreenIn from './off-screen-in'

export default function OffScreen(
  props: OffScreenInProps & { pathname: string },
) {
  const { mode, pathname } = props

  const { eventListener } = useEventListener()

  const emitted = useRef(false)

  const emitActiveChange = (_mode?: ActivityMode) => {
    eventListener.emit('activeChange', {
      pathname,
      mode: _mode ?? mode,
      callback() {
        emitted.current = true
      },
    })
  }

  useEffect(() => {
    if (mode === 'visible') {
      emitActiveChange()
    }
    else if (emitted.current) {
      emitActiveChange()
    }
  }, [mode])

  useEffect(() => {
    return () => {
      emitActiveChange('hidden')
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <OffScreenIn {...props} />
    </Suspense>
  )
}
