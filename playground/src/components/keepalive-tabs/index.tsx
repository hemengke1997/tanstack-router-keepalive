import type { TabsProps } from 'antd'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Tabs } from 'antd'
import classNames from 'classnames'
import { useMemo } from 'react'

import { useKeepAlive } from 'tanstack-router-keepalive'
import styles from './index.module.css'

export default function KeepAliveTabs() {
  const { destroy, aliveRoutes } = useKeepAlive()

  const aliveRoutesList = useMemo(
    () =>
      Object.entries(aliveRoutes).map(([pathname, value]) => ({
        ...value.staticData,
        pathname,
      })),
    [aliveRoutes],
  )

  const tabs: TabsProps['items'] = aliveRoutesList.map((t) => {
    return {
      key: t.pathname,
      label: t.title,
    }
  })

  const pathname = useLocation({ select: location => location.pathname })
  const navigate = useNavigate()

  const onChange = (key: string) => {
    navigate({ to: key })
  }

  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove') {
      if (tabs.length > 1) {
        if (targetKey === pathname) {
          const index = tabs.findIndex(tab => tab.key === targetKey)

          const exist = tabs[index + 1] || tabs[index - 1] || tabs[0]
          navigate({ to: exist?.key as string })
        }
        destroy(targetKey as string)
      }
      else {
        console.error('At least one tab page is required')
      }
    }
  }

  return (
    <div className={classNames(styles.tabs)}>
      <Tabs
        hideAdd
        className="py-0"
        items={
          tabs.length > 1
            ? [...tabs]
            : tabs.map(t => ({
                ...t,
                closable: false,
              }))
        }
        onChange={onChange}
        activeKey={pathname}
        type="editable-card"
        onEdit={onEdit}
        size="small"
      />
    </div>
  )
}
