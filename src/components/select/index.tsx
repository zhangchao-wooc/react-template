import { Select, Spin, message, Form } from 'antd'
import type { SelectProps } from 'antd/es/select'
import type { FormItemProps } from 'antd/es/form'

import debounce from 'lodash/debounce'
import React, { useMemo, useRef, useState, useEffect } from 'react'

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>
  debounceTimeout?: number
  props: Props
}

function DebounceSelect<
  ValueType extends {
    key?: string
    label: React.ReactNode
    value: string | number
  } = any
>({
  fetchOptions,
  debounceTimeout = 100,
  props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState<ValueType[]>([])
  const fetchRef = useRef(0)

  useEffect(() => {
    loadOptions(props.customProps?.searchValue || '')
  }, [])

  const loadOptions = (value: any) => {
    fetchRef.current += 1
    const fetchId = fetchRef.current
    setOptions([])
    setFetching(true)

    fetchOptions(value).then((newOptions) => {
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return
      }

      setOptions(newOptions)
      setFetching(false)
    })
  }

  const debounceFetcher = useMemo(() => {
    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  return (
    <>
      {props.customProps?.isForm ? (
        <Form.Item {...props.formProps}>
          <Select
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props.selectProps}
            options={options}
          />
        </Form.Item>
      ) : (
        <Select
          filterOption={false}
          onSearch={debounceFetcher}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          {...props.selectProps}
          options={options}
        />
      )}
    </>
  )
}

interface Props {
  formProps?: FormItemProps
  customProps: {
    isForm?: boolean
    searchValue?: string
    label?: string
    value?: string
    fn: (data: any) => Promise<any> // queryData method
  }
  selectProps: SelectProps
}
const SearchSelectPage = (props: Props) => {
  async function remoteSearch(data: string): Promise<any[]> {
    return props.customProps
      .fn(data)
      .then((res: { msgCode: string; msgInfo: string; responseData: any }) => {
        if (res.msgCode === 'SUCCESS') {
          let data = []
          if (Array.isArray(res.responseData?.values)) {
            data = res.responseData.values
          } else if (Array.isArray(res.responseData)) {
            data = res.responseData
          } else if (Array.isArray(res.responseData?.projectTree)) {
            let list: any[] = []
            res.responseData.projectTree.map(
              (item: { sceneSetList: unknown[] }) => {
                if (Array.isArray(item?.sceneSetList)) {
                  list = [...list, ...item.sceneSetList]
                }
              }
            )
            data = list
          }
          // console.log(
          //   'selectprops',
          //   props.customProps,
          //   data.map((item: any) => {
          //     return {
          //       label: item[props.customProps?.label || 'label'],
          //       value: item[props.customProps?.value || 'value'],
          //       data: item
          //     }
          //   })
          // )
          return data.map((item: any) => {
            return {
              label: item[props.customProps?.label || 'label'],
              value: item[props.customProps?.value || 'value'],
              data: item
            }
          })
        } else {
          message.error(res.msgInfo)
        }
      })
  }

  return (
    <>
      <DebounceSelect fetchOptions={remoteSearch} props={props} />
    </>
  )
}

export default SearchSelectPage
