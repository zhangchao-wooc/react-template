import { useEffect } from 'react'
import { HomeApi } from '@request'
import { REG } from '@util'
import {
  Statistic,
  Row,
  Col,
  Button,
  Input,
  message,
  Form,
  DatePicker
} from 'antd'
import { Observer, useLocalObservable } from 'mobx-react'
import { homeStore } from '@models'
import moment from 'moment'
import './index.module.less'

interface Props {
  [x: string]: any
}

function Home(props?: Props) {
  const [form] = Form.useForm()
  const localStore = useLocalObservable(() => homeStore)

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

  const onFinish = () => {
    const formData = form.getFieldsValue()
    const data = {
      queryStartTime:
        formData.time && moment(formData.time[0]).format('YYYY-MM-DD HH:mm:ss'),
      queryEndTime:
        formData.time && moment(formData.time[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    const endTime = moment(data.queryStartTime).valueOf() + 31536000000
    const format = moment(endTime).format('YYYY-MM-DD HH:mm:ss')
    console.log(data.queryStartTime, start, end, format)
  }

  const html = () => {
    return (
      <>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="time" label="时间区间">
            <DatePicker.RangePicker showTime />
          </Form.Item>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            查询
          </Button>
        </Form>
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
