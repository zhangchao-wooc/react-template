import { useEffect } from 'react'
import { HomeApi } from '@request'
import { REG } from '@util'
import { Statistic, Row, Col, Button, Input, message } from 'antd'
import { Observer, useLocalStore } from 'mobx-react'
import { homeStore } from '@models'
import './index.module.less'

interface Props {
  [x: string]: any
}

function Home(props?: Props) {
  const localStore = useLocalStore(() => homeStore)

  useEffect(() => {
    HomeApi.demo().then((res: any) => {
      console.log('api', res)
    })
  }, [])

  const set = (e) => {
    const v = e.target.value
    console.log(v, REG.numReg.test(v))

    REG.numReg.test(v)
      ? localStore.set(Number(v))
      : message.warning('请输入数字！')
  }

  const html = () => {
    return (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Active Users" value={localStore.activeUsers} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Account Balance (CNY)"
              value={localStore.activeUsers}
              precision={2}
            />
            <Button style={{ marginTop: 16 }} type="primary">
              Recharge
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
                reset
              </Button>
            </Input.Group>
          </Col>
        </Row>
      </>
    )
  }

  return <Observer>{() => html()}</Observer>
}

export default Home
