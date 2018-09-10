import { observable, action, decorate } from "mobx";

class Store {
  nowTab = 0;

  news = [];

  changeTab(newTab) {
    this.nowTab = newTab;
  }
}

decorate(Store, {
  nowTab: observable,
  news: observable,
  changeTab: action
});

export default Store;
