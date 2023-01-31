import { Layout, Popover, Tooltip, Avatar, Button, Select, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Translation } from 'react-i18next'
import { observer, useLocalObservable } from 'mobx-react'
import { globalStore } from '@/store'
import { CommonApi } from '@/request'
import styles from './index.module.less'

const { Header } = Layout

const HeaderPage = () => {
  const { t, i18n } = useTranslation()
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
    <div className={styles['user-info-element']}>
      <div className="user-name">{userInfo && userInfo.name}</div>
      <Button type="primary" onClick={loginout}>
        {t('layout.log_out')}
      </Button>
    </div>
  )

  return (
    <Header
      className={styles.header}
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
      <div className={styles['user-center']}>
        <div>
          当前环境：
          {import.meta.env.MODE}&nbsp;&nbsp;
        </div>
        <Popover
          placement="bottom"
          title={t('layout.user_info')}
          content={userInfoElement}
          trigger="click"
        >
          <Tooltip placement="bottom" title={t('layout.user_center')}>
            <Avatar
              className={styles['user-avatar']}
              src={userInfo && userInfo.avatar && userInfo.avatar.avatar_72}
            />
          </Tooltip>
        </Popover>
        <Select
          style={{ marginLeft: '20px' }}
          defaultValue={i18n.language}
          onChange={(value: string) => i18n.changeLanguage(value)}
          options={[
            {
              value: 'zh',
              label: <Translation>{(t) => t('layout.chinese')}</Translation>
            },
            {
              value: 'en',
              label: <Translation>{(t) => t('layout.english')}</Translation>
            }
          ]}
        />
      </div>
    </Header>
  )
}

export default observer(HeaderPage)
