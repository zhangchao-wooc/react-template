/*
 * select component
 *
 */
import { Select, message, Form } from 'antd'
import { useEffect, useState } from 'react'

interface Props {
  name: string
  key?: string
  value?: string
  showValue?: string
  label: string
  placeholder?: string
  rules?: [object]
  styles?: object
  fn: Promise<any> // queryData method
}

const { Option } = Select

const SelectPage = (props: Props) => {
  const {
    name,
    key = 'key',
    value = 'key',
    showValue = 'value',
    label,
    placeholder = '请选择',
    styles = { width: '100%' },
    rules = [],
    fn
  } = props
  const [state, setState] = useState([])

  useEffect(() => {
    queryList()
  }, [])

  const queryList = () => {
    fn.then((res: any) => {
      console.log(res)

      if (res.success) {
        setState(res.data)
      } else {
        message.error(res.message)
      }
    })
  }

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select placeholder={placeholder} style={styles} allowClear>
        {state.map((item: any, index: number) => {
          return (
            <Option value={item[value]} key={item[key] + index}>
              {item[showValue]}
            </Option>
          )
        })}
      </Select>
    </Form.Item>
  )
}

export default SelectPage
