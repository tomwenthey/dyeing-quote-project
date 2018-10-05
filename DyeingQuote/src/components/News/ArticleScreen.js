import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { WhiteSpace } from "antd-mobile-rn";
const ArticleScreen = class ArticleScreen extends Component {
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
    return (
      <ScrollView style={styles.articleWrapper}>
        <WhiteSpace size="lg" />
        <View>
          <Text style={styles.articleTitle}>民间传统印染工艺——蜡染</Text>
        </View>
        <WhiteSpace />
        <View>
          <Text style={styles.articleInfo}>发布于 2018-7-19 18:36</Text>
        </View>
        <WhiteSpace size="lg" />
        <View>
          <View>
            <Text style={styles.articleContent}>
              蜡染是我国古老的民间传统纺织印染手工艺。蜡染，古称蜡，与绞缬（扎染）、夹缬（镂空印花）并称为我国古代三大印花技艺。
            </Text>
          </View>
          <WhiteSpace />
          <View>
            <Text style={styles.articleContent}>
              蜡染工艺在我国西南少数民族地区世代相传，尤其是贵州少数民族地区，继承和发扬了传统的蜡染工艺，流行很广，已成为少数民族妇女生活中不可缺少的一部分。
            </Text>
          </View>
          <WhiteSpace />
          <View>
            <Text style={styles.articleContent}>
              这里的少数民族以蜡染作装饰，她们的头巾、围腰、衣服、裙子、绑腿都是蜡染制成，其它如伞套、枕巾，饭篮盖帕、包袱、书包、背带等也都使用蜡染；有的苗族妇女把蜡染花纹装饰在衣袖、衣襟和衣服前后摆的边缘。有的蜡染还加染上红、黄、绿等色，成为明快富丽的多色蜡染。
            </Text>
          </View>
          <WhiteSpace />
          <View>
            <Text style={styles.articleContent}>
              蜡染印花有历史蜡染的历史可谓悠久，其中有几个历史节点的特点非常鲜明。
            </Text>
          </View>
          <WhiteSpace />
          <View>
            <Text style={styles.articleContent}>
              秦汉：西南少数民族利用蜂蜡作为防染的原料，利用天然的植物、矿物等作染料，对毛织、棉麻织物进行织物印染。
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
};

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
    fontSize: 18,
    lineHeight: 20
  }
};

export default ArticleScreen;
