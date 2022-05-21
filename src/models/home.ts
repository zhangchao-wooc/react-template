import { observable, action, computed, makeObservable } from 'mobx'

const a = 10

class Store {
  @observable activeUsers = 112893

  // 数据更改后触发页面响应
  constructor() {
    makeObservable(this)
  }

  // 计算函数写法
  @computed get computedCount() {
    return this.activeUsers + a
  }

  @action.bound
  set(n: number) {
    this.activeUsers = n
  }
}

const homeStore = new Store()

export default homeStore
