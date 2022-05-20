import React from 'react'
import { SmileOutlined, CrownOutlined } from '@ant-design/icons'

export default {
  route: {
    path: '/',
    routes: [
      {
        path: 'home',
        name: '欢迎',
        icon: <SmileOutlined />
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownOutlined />,
        access: 'canAdmin',
        routes: [
          {
            path: '/admin/sub-page1',
            name: '一级页面',
            icon: <CrownOutlined />
          },
          {
            path: '/admin/sub-page2',
            name: '二级页面',
            icon: <CrownOutlined />
          },
          {
            path: '/admin/sub-page3',
            name: '三级页面',
            icon: <CrownOutlined />
          }
        ]
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
