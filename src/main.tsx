import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import store from '@models'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import routes from '~react-pages'
import './index.css'

const App = () => {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider {...store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)
