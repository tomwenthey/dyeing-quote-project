import React, { Component } from "react";
import { StyleSheet, Image, View, Dimensions, ScrollView } from "react-native";
import { Carousel } from "antd-mobile-rn";

import ArticleItem from "../common/ArticleItem";

export default class HomeScreen extends Component {
  render() {
    const screenWidth = Dimensions.get("window").width;
    return (
      <View style={styles.homeScreen}>
        <Carousel style={styles.carouselWrapper} autoplay infinite dots={false}>
          <View>
            <Image
              source={require("./img/carousel1.jpg")}
              style={{ height: 200, width: screenWidth }}
            />
          </View>
          <View>
            <Image
              source={require("./img/carousel2.jpg")}
              style={{ height: 200, width: screenWidth }}
            />
          </View>
          <View>
            <Image
              source={require("./img/carousel3.jpg")}
              style={{ height: 200, width: screenWidth }}
            />
          </View>
        </Carousel>
        <ScrollView>
          <ArticleItem>aa</ArticleItem>
          <ArticleItem>aa</ArticleItem>
          <ArticleItem>aa</ArticleItem>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: "#EEEEEE",
    flex: 1
  },
  carouselWrapper: {
    backgroundColor: "#FFFFFF",
    height: 200
  }
});
