import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer, inject } from "mobx-react";

import { TITLE } from "../../constants";

const Header = inject("store")(
  observer(
    class Header extends Component {
      render() {
        const { store } = this.props;
        return (
          <View style={styles.header}>
            <Text style={styles.title}>{TITLE[store.nowTab]}</Text>
          </View>
        );
      }
    }
  )
);

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

export default Header;
