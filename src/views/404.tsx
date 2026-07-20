import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Result } from 'antd'

const App: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  console.log('404.tsx')

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/home')}>
          {t('common.back_home')}
        </Button>
      }
    />
  )
}

export default App
