import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { ConfigProvider, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { i18nReady } from '@/i18n'
import store from '@/store'
import {
  BrowserRouter as Router,
  useRoutes,
  useNavigate
} from 'react-router-dom'
import routes from '@/router/index'
import LayoutPage from '@/layout'
import zhCN from 'antd/lib/locale/zh_CN'
import 'normalize.css/normalize.css'
import '@/styles/global.css'

const App = () => {
  const { t } = useTranslation()
  const navigator = useNavigate()

  useEffect(() => {
    const router = localStorage.getItem('selectedMenuRoute')
    navigator(router || '/home')
  }, [])

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Spin description={t('common.loading')} size="large"></Spin>
        </div>
      }
    >
      {useRoutes(routes)}
    </Suspense>
  )
}

void i18nReady.then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider {...store}>
        <Router>
          <ConfigProvider
            locale={zhCN}
            theme={{
              token: {
                colorPrimary: 'ff6600'
              }
            }}
          >
            <LayoutPage>
              <App />
            </LayoutPage>
          </ConfigProvider>
        </Router>
      </Provider>
    </React.StrictMode>
  )
})
