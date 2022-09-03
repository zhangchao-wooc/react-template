import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { observer, useLocalObservable } from 'mobx-react'
import { globalStore } from '@/store'

interface Props {
  cb?: (v: any) => void
}

interface item {
  item?: any
  key?: string
  keyPath?: string[]
  selectedKeys?: string[]
  domEvent?: any
}

const MenuPage = (props: Props) => {
  const navigate = useNavigate()
  const { menuList, selectedMenu, setStore, openkeys } = useLocalObservable(
    () => globalStore
  )
  const [collapsed, setCollapsed] = useState(false)

  const onSelectMenu = ({ item, selectedKeys, keyPath, domEvent }: item) => {
    const { route } = item.props
    setStore('selectedMenu', keyPath || [])
    localStorage.setItem('selectedMenuRoute', route)
    route && navigate(route)
  }

  const onOpenChange = (openKeys: string[]) => {
    setStore('openkeys', openKeys)
  }

  const onCollapse = (v: boolean) => {
    setCollapsed(v)
    props.cb &&
      props.cb({
        padding: '15px',
        margin: v ? '64px 0 0 80px' : '64px 0 0 200px',
        transition: 'all 0.25s'
      })
  }
  return (
    <Layout.Sider
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
    </Layout.Sider>
  )
}

export default observer(MenuPage)
