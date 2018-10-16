import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { WhiteSpace } from "antd-mobile-rn";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";
import { Toast } from "antd-mobile-rn";

import { FETCHING_STATE } from "../../constants";

const ArticleScreen = inject("newsStore")(
  observer(
    class ArticleScreen extends Component {
      constructor(props) {
        super(props);
        this.state = {
          article: null
        };
      }
      static navigationOptions = {
        headerStyle: {
          backgroundColor: "#D13F50"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      };

      getArticle = async _id => {
        await this.props.newsStore.fetchArticle(_id);
        let contentSplit = this.props.newsStore.nowArticle.content.split(" ");
        this.setState({
          article: Object.assign(
            { ...this.props.newsStore.nowArticle },
            {
              content: contentSplit
                .map(item => item.trim())
                .filter(item => item != "")
            }
          )
        });
      };

      componentDidMount() {
        this.getArticle(this.props.newsStore.nowArticle._id);
        autorun(() => {
          const fetchState = this.props.newsStore.fetchState;
          if (fetchState === FETCHING_STATE.PENDING) {
            Toast.loading("加载中");
          } else if (fetchState === FETCHING_STATE.ERROR) {
            Toast.fail("获取资讯失败", 1);
          } else if (fetchState === FETCHING_STATE.SUCCESS) {
            Toast.hide();
          }
        });
      }

      render() {
        this.state.article ? console.log(this.state.article.content) : null;
        return this.state.article ? (
          <ScrollView style={styles.articleWrapper}>
            <WhiteSpace size="lg" />
            <View>
              <Text style={styles.articleTitle}>
                {this.state.article.title}
              </Text>
            </View>
            <WhiteSpace />
            <View>
              <Text style={styles.articleInfo}>
                发布于 {this.state.article.time}
              </Text>
            </View>
            <WhiteSpace size="lg" />
            {this.state.article.content.map((item, index) => (
              <View key={index}>
                <Text style={styles.articleContent}>{item}</Text>
                <WhiteSpace />
              </View>
            ))}
            <WhiteSpace size="lg" />
          </ScrollView>
        ) : null;
      }
    }
  )
);

const styles = {
  articleWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ffffff"
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: "700"
  },
  articleInfo: {
    fontSize: 14,
    color: "#777777"
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 20
  }
};

export default ArticleScreen;
