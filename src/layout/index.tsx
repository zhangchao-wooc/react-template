import React, { useState, useEffect } from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Popover,
  Tooltip,
  Avatar,
  Button,
  message
} from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { observer, useLocalObservable } from 'mobx-react'
import { globalStore } from '@models'
import { CommonApi } from '@request'
import './index.less'

interface item {
  item?: any
  key?: string
  keyPath?: string[]
  selectedKeys?: string[]
  domEvent?: any
}

const { Header, Content, Sider } = Layout

const LayoutPage = (props: any) => {
  const navigate = useNavigate()
  const { menuList, selectedMenu, setStore, openkeys, userInfo } =
    useLocalObservable(() => globalStore)
  const [collapsed, setCollapsed] = useState(false)
  const [layoutStyle, setLayoutStyle] = useState({
    padding: '24px',
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
      userInfoApi()
    }
  }, [])

  const userInfoApi = () => {
    CommonApi.userInfoApi().then((res: any) => {
      if (res.msgCode === 'SUCCESS') {
        setStore('userInfo', res.responseData)
      } else {
        message.error(res.msgInfo)
      }
    })
  }

  const onSelectMenu = ({ item, selectedKeys, keyPath, domEvent }: item) => {
    const { route } = item.props
    console.log(item.props)

    setStore('selectedMenu', keyPath || [])
    localStorage.setItem('selectedMenuRoute', route)
    route && navigate(route)
  }

  const onOpenChange = (openKeys: string[]) => {
    setStore('openkeys', openKeys)
  }

  const onCollapse = (v: boolean) => {
    setCollapsed(v)
    setLayoutStyle({
      padding: '24px',
      margin: v ? '64px 0 0 80px' : '64px 0 0 200px',
      transition: 'all 0.25s'
    })
  }

  const loginout = () => {
    localStorage.clear()
    CommonApi.loginOut().then((res: any) => {
      if (res.msgCode === 'SUCCESS') {
        message.success('已登出！')
      } else {
        message.warning('登出失败！')
      }
      console.log('loginout', res)
    })
  }

  const userInfoElement = (
    <div className="userInfoElement">
      <div className="userName">{userInfo && userInfo.name}</div>
      <Button type="primary" onClick={loginout}>
        登出
      </Button>
    </div>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="header"
        style={{ position: 'fixed', zIndex: 1, width: '100%' }}
      >
        <h1
          className="logo"
          onClick={() => {
            navigate('/')
            setStore('selectedMenu', [])
            setStore('openkeys', [])
          }}
        >
          Template
        </h1>
        <div className="userCenter">
          <Popover
            placement="bottom"
            title={'个人信息'}
            content={userInfoElement}
            trigger="click"
          >
            <Tooltip placement="bottom" title={'个人中心'}>
              <Avatar
                className="user-avatar"
                src={userInfo && userInfo.avatar && userInfo.avatar.avatar_72}
              />
            </Tooltip>
          </Popover>
        </div>
      </Header>
      <Sider
        width={200}
        className="site-layout-background"
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        trigger={
          <div style={{ transition: 'all 0.5s' }}>
            {!collapsed ? (
              <>
                <DoubleLeftOutlined />
                <span>&nbsp;&nbsp;收起侧边栏</span>
              </>
            ) : (
              <DoubleRightOutlined />
            )}
          </div>
        }
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 64
        }}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={openkeys}
          selectedKeys={selectedMenu}
          style={{ height: '100%', borderRight: 0 }}
          items={menuList}
          onOpenChange={onOpenChange}
          onSelect={onSelectMenu}
        />
      </Sider>
      <Layout style={layoutStyle}>
        <Content
          className="site-layout-background"
          style={{
            padding: '0px 25px 25px',
            minHeight: '280px'
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default observer(LayoutPage)
