import { useEffect } from 'react'
import { Statistic, Row, Col, Button, Input, message, Form } from 'antd'
import { observer, useLocalObservable } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { HomeApi } from '@/request'
import { REG } from '@/utils'
import { homeStore } from '@/store'
import { SelectPage } from '@/components'

interface Props {
  [x: string]: any
}

function Home(props?: Props) {
  const localStore = useLocalObservable(() => homeStore)
  const { t } = useTranslation()

  useEffect(() => {
    HomeApi.demo().then((res: any) => {
      console.log('api', res)
    })
  }, [])

  const set = (e: { target: { value: any } }) => {
    const v = e.target.value
    console.log(v, REG.numReg.test(v))

    REG.numReg.test(v)
      ? localStore.set(Number(v))
      : message.warning(t('home.p_input_n'))
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title={t('home.active_users')}
            value={localStore.activeUsers}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={t('home.account_balance')}
            value={localStore.activeUsers}
            precision={2}
          />
          <Button style={{ marginTop: 16 }} type="primary">
            {t('home.recharge')}
          </Button>
        </Col>
        <Col span={12}>
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 200px)' }}
              value={localStore.activeUsers}
              onChange={set}
              maxLength={20}
            />
            <Button type="primary" onClick={() => localStore.set(0)}>
              {t('common.reset')}
            </Button>
          </Input.Group>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col style={{ display: 'flex', marginTop: 30 }}>
          <Form>
            <SelectPage
              name="demo"
              label={t('home.select_demo')}
              placeholder={t('common.please_select') || ''}
              fn={HomeApi.querySelect()}
            />
          </Form>
          <Button type="primary" htmlType="submit">
            {t('common.submit')}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default observer(Home)
