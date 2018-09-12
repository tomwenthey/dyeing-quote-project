import axios from "axios";

// the base uri for request
export const base = "http://localhost:4000";

// all user api in one place
export const userApi = {
  users: "/users/",
  login: "/users/login/",
  resetPassword: "/users/password_reset/",
  savePersonInfo: "/users/person_info/"
};

export function userLogin(data) {
  return axios.post(base + userApi.login, data);
}

export function createUser(data) {
  return axios.post(base + userApi.users, data);
}

export function resetPassword(data) {
  return axios.post(base + userApi.resetPassword, data);
}

export function savePersonInfo(data) {
  return axios.post(base + userApi.savePersonInfo, data);
}
