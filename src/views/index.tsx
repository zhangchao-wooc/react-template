import React, { useEffect } from 'react'
import { Observer, useLocalStore } from 'mobx-react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { homeStore } from '@models'

interface Props {
  [x: string]: any
}

function Index(props: Props) {
  const navigate = useNavigate()
  const localStore = useLocalStore(() => homeStore)

  useEffect(() => {
    console.log('/', props)
  }, [])

  const jump = () => {
    navigate('/home')
  }

  const countHandle = () => {
    localStore.add()
  }

  const html = () => {
    return (
      <div className="App">
        <h1>首页</h1>
        <Button onClick={jump}> 前往 HomePage </Button>
        <div>count: {localStore.count}</div>
        <div>computed: {localStore.computedCount}</div>
        <Button onClick={countHandle}> +1 </Button>
      </div>
    )
  }

  return <Observer>{() => html()}</Observer>
}

export default Index
