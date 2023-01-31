/*
 * search component
 *
 */
import { useEffect, useState } from 'react'
import type { AxiosPromise } from 'axios'
import { Select, message, Form, AutoComplete } from 'antd'

interface Props {
  name: string
  key?: string
  value?: string
  showValue?: string
  label: string
  placeholder?: string
  rules?: [object]
  styles?: object
  fn: (searchText: any) => AxiosPromise<any> // queryData method
  onSelect?: (item: any) => void // deal select data
}

const { Option } = Select

const AutoCompletePage = (props: Props) => {
  const {
    name,
    key = 'key',
    value = 'key',
    showValue = 'value',
    label,
    placeholder = '请选择',
    styles = { width: '100%' },
    rules = [],
    fn,
    onSelect
  } = props
  const [list, setList] = useState([]) // 列表

  useEffect(() => {
    queryList('')
    console.log('autoComplete', key, value)
  }, [])

  const queryList = async (searchText?: string) => {
    fn(searchText).then((res: any) => {
      if (res.success) {
        setList(res.data.records || res.data || [])
      } else {
        message.error(res.message)
      }
    })
  }

  const onSearch = (searchText: string) => {
    console.log('onSearch', searchText, this)
    queryList(searchText)
  }

  return (
    <>
      <Form.Item name={name} label={label} rules={rules}>
        <AutoComplete
          onSearch={onSearch}
          onSelect={(v: any) => {
            onSelect && onSelect(list.filter((item) => item[value] === v))
          }}
          placeholder={placeholder}
          allowClear
          style={styles}
        >
          {list.map((item: any, index: number) => (
            <Option value={item[value]} key={item[key]}>
              {item[showValue]}
            </Option>
          ))}
        </AutoComplete>
      </Form.Item>
    </>
  )
}

export default AutoCompletePage
