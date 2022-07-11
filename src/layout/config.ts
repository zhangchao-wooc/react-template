import React from 'react'
import type { MenuProps } from 'antd'
import { UserOutlined, NotificationOutlined } from '@ant-design/icons'

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

export { items1, items2 }
