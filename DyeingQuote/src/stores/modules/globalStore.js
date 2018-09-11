import { observable, action, decorate } from "mobx";

class globalStore {
  nowTab = 0;

  changeTab(newTab) {
    this.nowTab = newTab;
  }
}

decorate(globalStore, {
  nowTab: observable,
  changeTab: action
});

export default new globalStore();
