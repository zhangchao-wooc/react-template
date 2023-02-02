import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { ConfigProvider, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import './locales/index'
import store from '@/store'
import {
  BrowserRouter as Router,
  useRoutes,
  useNavigate
} from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import routes from '@@react-pages'
import LayoutPage from '@/layout'
import zhCN from 'antd/lib/locale/zh_CN'
import 'normalize.css/normalize.css'
import '@/assets/styles/global.less'
// import 'antd/dist/antd.less'
import '@/assets/styles/theme.less'

const App = () => {
  const { t } = useTranslation()
  const navigator = useNavigate()

  useEffect(() => {
    console.log('routes', routes)
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
          <Spin tip={t('common.loading')} size="large"></Spin>
        </div>
      }
    >
      {useRoutes(routes)}
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider {...store}>
      <Router>
        <ConfigProvider locale={zhCN}>
          <LayoutPage>
            <App />
          </LayoutPage>
        </ConfigProvider>
      </Router>
    </Provider>
  </React.StrictMode>
)
