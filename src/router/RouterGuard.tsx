import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { observer, useLocalObservable } from 'mobx-react'
import { globalStore } from '@/store'
import routes from './index'

interface RouterGuardProps {
  children: React.ReactNode
}

const withePath = ['login', '403', '404']

const RouterGuard: FC<RouterGuardProps> = ({ children }) => {
  const localStore = useLocalObservable(() => globalStore)
  const location = useLocation()
  const navigator = useNavigate()

  useEffect(() => {
    console.log(routes, location.pathname, localStore.permissions)
    const router = getCurrentRouterMap(
      localStore.permissions.router,
      location.pathname
    )
    console.log(router)
    if (
      !router.auth.includes('admin') &&
      withePath.indexOf(location.pathname) === -1
    ) {
      navigator('/403')
    }
  }, [location.pathname])

  const getCurrentRouterMap = (routers: any[], path: string): any => {
    for (const router of routers) {
      if (router.path == path) return router
      if (router.child) {
        const childRouter = getCurrentRouterMap(router.child, path)
        if (childRouter) return childRouter
      }
    }
    return routers[routers.length - 1]
  }

  return <>{children}</>
}

export default observer(RouterGuard)
