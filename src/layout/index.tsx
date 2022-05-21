import React from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, Breadcrumb } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, NotificationOutlined } from '@ant-design/icons'
import './index.less'

const { Header, Content, Sider } = Layout

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`
}))

const items2 = [
  {
    key: '1',
    icon: React.createElement(UserOutlined),
    label: 'home',
    route: '/home'
  },
  {
    key: '2',
    icon: React.createElement(NotificationOutlined),
    label: 'list',
    route: '/list'
  }
]

const LayoutPage = (props: any) => {
  const navigate = useNavigate()

  const onSelect = ({ item }: { item: any }) => {
    navigate(item.props.route)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="header"
        style={{ position: 'fixed', zIndex: 1, width: '100%' }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
        />
      </Header>
      <Sider
        width={200}
        className="site-layout-background"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 64,
          bottom: 0
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items2}
          onSelect={onSelect}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 50,
            margin: '0 0 0 200px',
            minHeight: 280
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default LayoutPage
