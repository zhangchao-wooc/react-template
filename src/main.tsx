import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd'
import store from '@models'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import routes from '@@react-pages'
import LayoutPage from '@layout'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'

import 'antd/dist/antd.less'
import '@asset/style/global.less'

moment.locale('zh-cn')

const App = () => {
  useEffect(() => {
    console.log('routes', routes)
  }, [])
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
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