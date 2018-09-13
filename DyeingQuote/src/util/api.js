import axios from "axios";

// the base uri for request
export const base = "http://localhost:4000";

// all user api in one place
export const userApi = {
  user: "/user/",
  users: "/users/",
  login: "/users/login/",
  resetPassword: "/users/password_reset/"
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

export function savePersonInfo(id, data) {
  return axios.post(base + userApi.user + id, data);
}

export function getPersonInfo(id) {
  return axios.get(base + userApi.user + id);
}
