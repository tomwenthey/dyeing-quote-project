import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Carousel } from "antd-mobile-rn";

import ArticleItem from "../common/ArticleItem";

export default class NewsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.NewsScreen}>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
        <ArticleItem>aa</ArticleItem>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  NewsScreen: {
    backgroundColor: "#EEEEEE",
    flex: 1
  }
});
