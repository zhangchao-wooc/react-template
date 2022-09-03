import { observable, action, makeObservable } from 'mobx'
import { items2 } from '@/layout/config'

class Store {
  @observable selectedMenu = ['']
  @observable openkeys = ['']
  @observable menuList = items2
  @observable userInfo: any = {
    name: '默认',
    avatar: {
      avatar_72: 'https://joeschmoe.io/api/v1/random'
    }
  }

  // 数据更改后触发页面响应
  constructor() {
    makeObservable(this)
  }

  // 计算函数写法
  // @computed get menuList() {
  //   return dynamicMenu(this.selectedPlatform[0])
  // }

  @action.bound
  setStore(key: string, v: string[]) {
    console.log('setStore', key, v)
    if (key === 'selectedMenu') {
      this.selectedMenu = v
      localStorage.setItem('selectedMenu', JSON.stringify(v))
    }

    if (key === 'openkeys') {
      this.openkeys = v
      localStorage.setItem('openkeys', JSON.stringify(v))
    }

    if (key === 'userInfo') {
      this.userInfo = v
      localStorage.setItem('userInfo', JSON.stringify(v))
    }
  }
}

const globalStore = new Store()

export default globalStore
