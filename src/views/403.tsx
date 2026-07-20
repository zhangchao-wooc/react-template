import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Result } from 'antd'

const App: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle={t('auth.can_not_access_page')}
      extra={
        <Button type="primary" onClick={() => navigate('/home')}>
          {t('common.back_home')}
        </Button>
      }
    />
  )
}

export default App
