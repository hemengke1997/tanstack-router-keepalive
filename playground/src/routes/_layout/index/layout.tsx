import { HomeOutlined } from '@ant-design/icons'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/index')({
  component: RouteComponent,
  staticData: {
    title: 'Home',
    icon: <HomeOutlined />,
  },
})

function RouteComponent() {
  return <Outlet />
}
