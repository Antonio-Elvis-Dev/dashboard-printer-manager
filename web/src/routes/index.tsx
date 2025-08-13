// import { createBrowserRouter } from 'react-router-dom'
// import { PublicLayout } from '../layouts/public'
// import { Public } from '../pages/public'
// import { AuthLayout } from '../layouts/auth'
// import { SignIn } from '../pages/sign-in'
// import { AppLayout } from '../layouts/app'
import { AppLayout } from '@/components/layout/AppLayout'
import { Home } from '../pages/home'
import { PrivateRoutes } from './private-routes'
import { createBrowserRouter } from 'react-router-dom'
import { SignIn } from '@/pages/sign-in'
import { AuthLayout } from '@/components/layout/AuthLayout'
import Error from '@/pages/Error'
import SetoresPage from '@/pages/setores-pages'
import RelatoriosPage from '@/pages/relatorios-page'
import ConfiguracoesPage from '@/pages/configuracoes-page'
import Dashboard from '@/pages/dashboard'

// import { PrivateRoutes } from './private-routes'
// import { FilterPanel } from '../pages/filter-panels'
// import { PlayerPage } from '../pages/player-page'
// import { FilterMedia } from '../pages/filter-media'

const routes = [
  {
    element: <AuthLayout />,
    errorElement:<Error/>,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
  // {
  //   element: <PublicLayout />,
  //   // errorElement:<Error/>
  //   children: [
  //     { path: '/public', element: <Public /> },
  //   ],
  // },
  {
    path: '/',
    element: (
      // :<PrivateRoutes>
        <AppLayout />
      // </PrivateRoutes>
    ),
    errorElement:<Error/>,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/setores', element: <SetoresPage /> },
      { path: '/relatorios', element: <RelatoriosPage /> },
      { path: '/configuracoes', element: <ConfiguracoesPage /> },
      // { path: '/configuracoes', element: <ConfiguracoesPage /> },
    ],
  },
  // { path: '/player/:panelId', element: <PlayerPage /> },
]

export const router = createBrowserRouter(routes)
