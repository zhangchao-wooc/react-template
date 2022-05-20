import { useEffect } from 'react'
import { HomeApi } from '@api'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import './index.module.less'

interface Props {
  [x: string]: any
}

function Home(props: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('use')

    HomeApi.demo().then((res: any) => {
      console.log('api', res)
    })
  }, [])

  const jump = () => {
    navigate('/')
  }

  return (
    <div className="App">
      <h1>Home Page</h1>
      <Button onClick={jump}>回到主页</Button>
    </div>
  )
}

export default Home
