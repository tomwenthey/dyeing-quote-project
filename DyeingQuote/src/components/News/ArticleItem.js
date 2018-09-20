import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ArticleItem = class ArticleItem extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Article")}
        style={styles.articleWrapper}
      >
        <View>
          <Text style={styles.articleTitle}>什么是磨毛面料，你真的知道么</Text>
        </View>
        <View style={styles.articleInfo}>
          <View style={styles.articleType}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>资讯</Text>
          </View>
          <Text style={styles.articleTime}>发布于 2018-7-19 18:36</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

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
    backgroundColor: "#3572A5",
    width: 50,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  }
});

export default ArticleItem;
