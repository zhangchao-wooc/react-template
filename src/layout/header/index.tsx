import { useEffect } from 'react'
import { Layout, Popover, Tooltip, Avatar, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { observer, useLocalObservable } from 'mobx-react'
import { globalStore } from '@/store'
import { CommonApi } from '@/request'

const { Header } = Layout
const HeaderPage = () => {
  const navigate = useNavigate()
  const { setStore, userInfo } = useLocalObservable(() => globalStore)

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
  )
}

export default observer(HeaderPage)
