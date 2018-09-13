import { observable, action, decorate, flow } from "mobx";

import { FETCHING_STATE } from "../../constants";
import {
  userLogin,
  createUser,
  resetPassword,
  savePersonInfo,
  getPersonInfo
} from "../../util/api";

class UserStore {
  fetchState = "";
  alertMessage = "";
  user = null;

  clearState() {
    this.fetchState = "";
    this.alertMessage = "";
  }

  logout() {
    this.clearState();
    this.user = null;
    // AsyncStorage 中清除user信息
    console.log("注销");
  }

  fetch = flow(function*(data, type) {
    this.fetchState = FETCHING_STATE.PENDING;
    try {
      let res;
      switch (type) {
        case "login":
          res = yield userLogin(data);
          break;
        case "reg":
          res = yield createUser(data);
          break;
        case "password_reset":
          res = yield resetPassword({ id: this.user._id, ...data });
          break;
        case "person_info":
          res = yield savePersonInfo(this.user._id, data);
          break;
        case "get_person_info":
          res = yield getPersonInfo(this.user._id);
          break;
      }
      const { message, status, user } = res.data;
      this.fetchState = FETCHING_STATE.DONE;
      if (status) {
        user ? (this.user = user) : null;
        this.fetchState = FETCHING_STATE.SUCCESS;
      }
      this.alertMessage = message;
    } catch (error) {
      this.fetchState = FETCHING_STATE.ERROR;
      this.alertMessage = error.message;
    }
  });
}

decorate(UserStore, {
  fetchState: observable,
  user: observable,
  alertMessage: observable,
  clearState: action,
  logout: action
});

export default new UserStore();
