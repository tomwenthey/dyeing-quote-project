import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>首页</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#D13F50",
    height: 60,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#FFFFFF"
  }
});
