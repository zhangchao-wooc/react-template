import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout'
import '@ant-design/pro-layout/dist/layout.css'
import defaultProps from './_defaultprops'

const LayoutPage = (props) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true
  })
  const [pathname, setPathname] = useState('/')
  const navigate = useNavigate()
  return (
    <div
      id="layout_page"
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname
        }}
        waterMarkProps={{
          content: 'Pro Layout'
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item: any, dom: any) => (
          <a
            onClick={() => {
              navigate(item.path)
              setPathname(item.path || '/welcome')
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >
        <PageContainer>{props.children}</PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting)
        }}
        disableUrlParams={false}
      />
    </div>
  )
}
export default LayoutPage
