import axios from "axios";
import {
  BASE,
  userApi,
  newsApi,
  turingApi,
  turingApiCreater
} from "../constants";

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

export function getTuringRobotReply(text) {
  return axios.post(turingApi, turingApiCreater(text));
}

export function getQuoteResult(requirements) {
  return axios.post(BASE + "quote/isQualified", requirements);
}

export function getQuotes(userId) {
  return axios.get(BASE + "quotes/" + userId);
}

export function createQuote(requirements) {
  return axios.post(BASE + "quote", requirements);
}
