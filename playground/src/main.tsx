import type { ReactNode } from 'react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

// theme provider
import { ThemeProvider } from '@/components/shared/ThemeProvider'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// global styles
import './index.css'

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  basepath: import.meta.env.BASE_URL,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface StaticDataRouteOption {
    /**
     * 路由标题，通常用于页面标题或者侧边栏菜单显示
     */
    title?: ReactNode
    /**
     * 菜单图标，用于侧边栏菜单项的图标显示
     */
    icon?: ReactNode
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
}
