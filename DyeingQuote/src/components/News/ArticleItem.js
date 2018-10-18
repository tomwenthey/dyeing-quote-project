import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react";

import { _iso8601_to_standard_date } from "../../util/util";

const ArticleItem = inject("newsStore")(
  observer(
    class ArticleItem extends Component {
      render() {
        const { navigation, title, type, time, _id } = this.props;
        let typeBgColor;
        switch (type) {
          case "资讯":
            typeBgColor = "#3572A5";
            break;
          case "技术":
            typeBgColor = "#FFD202";
            break;
          case "发展":
            typeBgColor = "#D13F50";
            break;
        }

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Article");
              this.props.newsStore.changeNowArticle(_id);
            }}
            style={styles.articleWrapper}
          >
            <View>
              <Text style={styles.articleTitle}>{title}</Text>
            </View>
            <View style={styles.articleInfo}>
              <View
                style={{ ...styles.articleType, backgroundColor: typeBgColor }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>{type}</Text>
              </View>
              <Text style={styles.articleTime}>
                发布于 {_iso8601_to_standard_date(time)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  articleWrapper: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#ffffff",
    marginBottom: 12
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
    lineHeight: 20
  },
  articleInfo: {
    flexDirection: "row"
    // justifyContent: "space-between"
  },
  articleTime: {
    fontSize: 14,
    color: "#777777",
    lineHeight: 28,
    marginLeft: 12
  },
  articleType: {
    width: 50,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  }
});

export default ArticleItem;
