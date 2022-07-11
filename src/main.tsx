import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { ConfigProvider, Spin } from 'antd'
import store from '@models'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import routes from '@@react-pages'
import LayoutPage from '@layout'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import '@asset/style/global.less'
import 'antd/dist/antd.less'
import '@asset/style/theme.less'

moment.locale('zh-cn')

const App = () => {
  useEffect(() => {
    console.log('routes', routes)
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
          <Spin tip="加载中..." size="large"></Spin>
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
