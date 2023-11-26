import { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { ErrorBoundary } from '@/components'
import { NotFoundPage } from '@/pages'

import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './constants'
import { publicRoutes } from './PublicRoutes'
import { privateRoutes } from './PrivateRoutes'

import { MainLayout, MinimalLayout } from '@/layouts'
import { useAuthStore } from '@/store'

const RequireAuth = () => {
  const { token } = useAuthStore()
  const location = useLocation()

  if (!token) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} />
  }

  const isAuth = token && location.pathname === PUBLIC_ROUTES.LOGIN
  if (isAuth) {
    return <Navigate to={PRIVATE_ROUTES.USERS} state={{ from: location }} />
  }

  return <Outlet />
}

const Router = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <Routes>
          <Route element={<MinimalLayout />}>
            {publicRoutes.map(route => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
            <Route path={PUBLIC_ROUTES.HOME} element={<Navigate to={PUBLIC_ROUTES.LOGIN} />} />
            <Route path={PUBLIC_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            <Route path={PUBLIC_ROUTES.ERROR} element={<NotFoundPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route element={<RequireAuth />}>
              {privateRoutes.map(route => (
                <Route key={route.path} path={route.path} element={<route.component />} />
              ))}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Router
