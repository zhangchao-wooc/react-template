import { observable, action, computed, makeObservable } from 'mobx'

const a = 10

class Store {
  @observable count = 1

  constructor() {
    makeObservable(this)
  }

  @computed get computedCount() {
    return this.count + a
  }

  @action.bound
  add() {
    this.count += 1
  }
}

const homeStore = new Store()

export default homeStore
