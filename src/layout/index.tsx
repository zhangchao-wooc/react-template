import React, { useState, useEffect } from 'react'
import { Layout, Breadcrumb, message } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { globalStore } from '@/store'
import { CommonApi } from '@/request'
import HeaderPage from './header'
import MenuPage from './menu'
import './index.less'

const { Content } = Layout

const LayoutPage = (props: any) => {
  const { t } = useTranslation()
  const { setStore } = useLocalObservable(() => globalStore)
  const [layoutStyle, setLayoutStyle] = useState({
    padding: '15px',
    margin: '64px 0 0 200px',
    transition: 'all 0.3s'
  })

  useEffect(() => {
    const sm = localStorage.getItem('selectedMenu')
    const ok = localStorage.getItem('openkeys')
    const ui = localStorage.getItem('userInfo')

    sm && setStore('selectedMenu', JSON.parse(sm) || [])
    ok && setStore('openkeys', JSON.parse(ok) || [])
    console.log('ok', ok)

    if (ui !== null) {
      setStore('userInfo', JSON.parse(ui) || {})
    } else {
      // userInfoApi()
    }
  }, [])

  const userInfoApi = async () => {
    CommonApi.userInfoApi().then((res: any) => {
      if (res.msgCode === 'SUCCESS') {
        setStore('userInfo', res.responseData)
      } else {
        message.error(res.msgInfo)
      }
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderPage />
      <MenuPage cb={(v) => setLayoutStyle(v)} />
      <Layout style={layoutStyle}>
        <Content
          className="site-layout-background"
          style={{
            padding: '0px 25px 25px',
            minHeight: '280px',
            borderRadius: '5px'
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{t('layout.home_page')}</Breadcrumb.Item>
          </Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default observer(LayoutPage)
