import axios from "axios";
import { BASE, userApi, newsApi } from "../constants";

export function userLogin(data) {
  return axios.post(BASE + userApi.login, data);
}

export function createUser(data) {
  return axios.post(BASE + userApi.users, data);
}

export function resetPassword(data) {
  return axios.post(BASE + userApi.resetPassword, data);
}

export function savePersonInfo(id, data) {
  return axios.post(BASE + userApi.user + id, data);
}

export function getPersonInfo(id) {
  return axios.get(BASE + userApi.user + id);
}

export function getArticles() {
  return axios.get(BASE + newsApi.articles);
}

export function getArticle(id) {
  return axios.get(BASE + newsApi.article + id);
}

export function getLatestNews() {
  return axios.get(BASE + newsApi.news);
}

export function getNowLatestNews(id) {
  return axios.get(BASE + newsApi.news + id);
}
