import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";

import ArticleItem from "./ArticleItem";

export default class NewsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.NewsScreen}>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
        <ArticleItem navigation={this.props.navigation}>aa</ArticleItem>
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
