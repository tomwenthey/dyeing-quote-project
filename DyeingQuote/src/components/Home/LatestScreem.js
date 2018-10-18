import React, { Component } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { WhiteSpace, Toast } from "antd-mobile-rn";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";

import { FETCHING_STATE, BASE } from "../../constants";
import { _iso8601_to_standard_date } from "../../util/util";

const LatestScreen = inject("newsStore")(
  observer(
    class LatestScreen extends Component {
      constructor(props) {
        super(props);
        this.state = {
          news: null
        };
      }

      getNowLatestNews = async _id => {
        this.props.newsStore.fetchState = FETCHING_STATE.PENDING;
        await this.props.newsStore.fetchNowLatestNews(_id);
        let contentSplit = this.props.newsStore.nowNews.content.split("    ");
        autorun(() => {
          const fetchState = this.props.newsStore.fetchState;
          if (fetchState === FETCHING_STATE.ERROR) {
            Toast.fail("获取资讯失败", 1);
          } else if (fetchState === FETCHING_STATE.SUCCESS) {
            Toast.hide();
          }
        });
        this.setState({
          news: Object.assign(
            { ...this.props.newsStore.nowNews },
            {
              content: contentSplit
                .map(item => item.trim())
                .filter(item => item != "")
            }
          )
        });
      };

      componentDidMount() {
        this.getNowLatestNews(this.props.newsStore.nowNews._id);
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

      render() {
        const news = this.state.news;
        const screenWidth = Dimensions.get("window").width;
        return news ? (
          <ScrollView style={styles.LatestWrapper}>
            <WhiteSpace size="lg" />
            <View>
              <Text style={styles.LatestTitle}>{news.title}</Text>
            </View>
            <WhiteSpace />
            <View>
              <Text style={styles.LatestInfo}>
                发布于 {_iso8601_to_standard_date(news.time)}
              </Text>
            </View>
            <WhiteSpace size="lg" />
            <View>
              {news.image.map((e, k) => (
                <View key={k} style={styles.LatestImage}>
                  <Image
                    source={{
                      uri: BASE + e
                    }}
                    style={{
                      width: screenWidth * 0.8,
                      height: screenWidth * 0.6
                    }}
                  />
                  <WhiteSpace size="lg" />
                </View>
              ))}
              <WhiteSpace size="lg" />
              {this.state.news.content.map((item, index) => (
                <View key={index}>
                  <Text style={styles.LatestContent}>{item}</Text>
                  <WhiteSpace />
                </View>
              ))}
            </View>
            <WhiteSpace size="lg" />
          </ScrollView>
        ) : null;
      }
    }
  )
);

const styles = {
  LatestWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ffffff"
  },
  LatestTitle: {
    fontSize: 24,
    fontWeight: "700"
  },
  LatestInfo: {
    fontSize: 14,
    color: "#777777"
  },
  LatestContent: {
    fontSize: 16,
    lineHeight: 20
  },
  LatestImage: {
    alignItems: "center"
  }
};

export default LatestScreen;
