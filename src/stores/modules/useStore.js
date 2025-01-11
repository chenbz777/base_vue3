import { defineStore } from 'pinia';

const useStore = defineStore('main', {
  state: () => ({
    count: 0,
    peopleData: []
  }),
  actions: {
    increment() {
      this.count++;
    },
    setCount(value) {
      this.count = value;
    },
    setPeopleData(value) {
      this.peopleData = value;
    }
  }
});

export default useStore;