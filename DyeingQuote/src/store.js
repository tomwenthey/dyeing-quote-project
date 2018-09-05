import { observable, action, decorate } from "mobx";

class Store {
  nowTab = 0;

  changeTab(newTab) {
    this.nowTab = newTab;
  }
}

decorate(Store, {
  nowTab: observable,
  changeTab: action
});

export default Store;
