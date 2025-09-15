import { UserOutlined } from '@ant-design/icons'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/user')({
  component: RouteComponent,
  staticData: {
    title: 'User',
    icon: <UserOutlined />,
  },
})

function RouteComponent() {
  return <Outlet />
}
