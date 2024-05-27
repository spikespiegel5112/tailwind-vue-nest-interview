import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, dsadasdas: 'dasdasda' }),
  getters: {
    double: (state: any) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
