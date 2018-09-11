import React, { Component } from "react";
import { StyleSheet, Image, View, Dimensions, ScrollView } from "react-native";
import { Carousel } from "antd-mobile-rn";

export default class HomeScreen extends Component {
  componentDidMount() {
    this.props.navigation.setParams({ title: "首页" });
  }

  render() {
    const screenWidth = Dimensions.get("window").width;
    return (
      <View style={styles.homeScreen}>
        <Carousel style={styles.carouselWrapper} autoplay infinite dots={false}>
          <View>
            <Image
              source={require("./img/carousel1.jpg")}
              style={{ height: 200, width: screenWidth + 1 }}
            />
          </View>
          <View>
            <Image
              source={require("./img/carousel2.jpg")}
              style={{ height: 200, width: screenWidth + 1 }}
            />
          </View>
          <View>
            <Image
              source={require("./img/carousel3.jpg")}
              style={{ height: 200, width: screenWidth + 1 }}
            />
          </View>
        </Carousel>
        <ScrollView />
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
