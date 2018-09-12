import axios from "axios";

// the base uri for request
export const base = "http://localhost:4000";

// all user api in one place
export const userApi = {
  users: "/users/",
  login: "/users/login/"
};

export function userLogin(user) {
  return axios.post(base + userApi.login, user);
}

export function createUser(user) {
  return axios.post(base + userApi.users, user);
}
