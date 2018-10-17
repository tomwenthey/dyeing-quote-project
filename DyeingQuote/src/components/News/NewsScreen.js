import React, { Component } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";
import { Toast } from "antd-mobile-rn";

import ArticleItem from "./ArticleItem";
import { FETCHING_STATE } from "../../constants";

const NewsScreen = inject("newsStore")(
  observer(
    class NewsScreen extends Component {
      constructor(props) {
        super(props);
        this.state = {
          articles: []
        };
      }

      getArticles = async () => {
        this.setState({ isRefreshing: true });
        this.props.newsStore.fetchState = FETCHING_STATE.PENDING;
        await this.props.newsStore.fetchArticles();
        autorun(() => {
          const fetchState = this.props.newsStore.fetchState;
          if (fetchState === FETCHING_STATE.ERROR) {
            Toast.fail("获取资讯失败", 1);
          } else if (fetchState === FETCHING_STATE.SUCCESS) {
            Toast.hide();
          }
        });
        this.setState({
          articles: this.props.newsStore.articles,
          isRefreshing: false
        });
      };

      componentDidMount() {
        this.getArticles();
      }

      render() {
        return (
          <ScrollView
            style={styles.NewsScreen}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.getArticles}
              />
            }
          >
            {this.state.articles.map((item, index) => (
              <ArticleItem
                key={index}
                {...item}
                navigation={this.props.navigation}
              />
            ))}
          </ScrollView>
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  NewsScreen: {
    backgroundColor: "#EEEEEE",
    flex: 1
  }
});

export default NewsScreen;
