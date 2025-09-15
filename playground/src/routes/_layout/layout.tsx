import type { MenuDataItem } from '@ant-design/pro-components'
import { CodeSandboxOutlined } from '@ant-design/icons'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { createFileRoute, Link, useLocation, useRouter } from '@tanstack/react-router'
import { KeepAliveOutlet } from 'tanstack-router-keepalive'
import KeepAliveTabs from '@/components/keepalive-tabs'

function formatPathname(pathname: string) {
  return pathname
    .replace(new RegExp(`^${import.meta.env.BASE_URL}`), '/')
    .replace(/\/$/, '')
}

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const pathname = formatPathname(useLocation({
    select: location => location.pathname,
  }))

  const router = useRouter()

  const getMenuFromRoutes = () => {
    type MenuItem = MenuDataItem & {
      id: string
      parent:
        | {
          id: string
          path: string
        }
        | undefined
    }
    const menuItems: MenuItem[] = []

    for (const route of router.flatRoutes) {
      const staticData = route.options?.staticData

      const menuItem: MenuItem = {
        path: (route.fullPath as string).replace(/\/$/, ''),
        name: staticData?.title as string,
        icon: staticData?.icon,

        id: route.id,
        parent: route.parentRoute
          ? {
              id: route.parentRoute.id,
              path: route.parentRoute.fullPath,
            }
          : undefined,
      }

      menuItems.push(menuItem)
    }

    const organizeMenuItems = (items: MenuItem[]): MenuDataItem[] => {
      const rootItems: MenuDataItem[] = []
      const itemMap = new Map<string, MenuDataItem>()
      const childrenMap = new Map<string, Set<string>>()

      for (const item of items) {
        const menuItem: MenuDataItem = {
          ...item,
          children: [],
        }
        itemMap.set(item.id, menuItem)

        if (item.parent) {
          const parentId = item.parent.id
          if (!childrenMap.has(parentId)) {
            childrenMap.set(parentId, new Set<string>())
          }
          childrenMap.get(parentId)!.add(item.id)
        }
        else {
          rootItems.push(menuItem)
        }
      }

      for (const [parentId, childrenIds] of childrenMap.entries()) {
        const parentItem = itemMap.get(parentId)

        if (parentItem) {
          for (const childId of childrenIds) {
            const childItem = itemMap.get(childId)
            if (childItem) {
              parentItem.children!.push(childItem)
            }
          }
          parentItem.children?.sort((a, b) => a.order - b.order)
        }
        else {
          for (const childId of childrenIds) {
            const childItem = itemMap.get(childId)
            if (childItem && !rootItems.includes(childItem)) {
              rootItems.push(childItem)
            }
          }
        }
      }

      return rootItems.sort((a, b) => a.order - b.order)
    }

    const menus = organizeMenuItems(menuItems)
    return menus
  }

  return (
    <ProLayout
      fixedHeader={true}
      locale="en-US"
      className="h-screen"
      breakpoint="md"
      title="Tanstack Router KeepAlive Demo"
      logo={<CodeSandboxOutlined />}
      layout="mix"
      menu={{
        locale: false,
        request: async () => {
          const menu = getMenuFromRoutes()
          console.log(menu, 'menu')
          return menu
        },
      }}
      menuItemRender={(menuItem, dom) => {
        return <Link to={menuItem.path}>{dom}</Link>
      }}
      location={{
        pathname,
      }}
      breadcrumbRender={false}
      token={{
        pageContainer: {},
      }}
    >
      <PageContainer
        header={{
          children: <KeepAliveTabs />,
          title: false,
          style: {
            paddingTop: 0,
          },
        }}
      >
        <KeepAliveOutlet />
      </PageContainer>
    </ProLayout>
  )
}
