import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { WhiteSpace, WingBlank, Button } from "antd-mobile-rn";
export default class QuoteScreen extends Component {
  render() {
    return (
      <ScrollView>
        <WhiteSpace />
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>报价咨询</Text>
          </View>
          <WingBlank>
            <WhiteSpace size="lg" />
            <Button type="warning" onPressIn={this.handleConfirm}>
              立即咨询
            </Button>
          </WingBlank>
        </View>
        <WhiteSpace size="lg" />
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>历史报价信息</Text>
          </View>
          <View style={styles.quoteInfo}>
            <Text style={styles.quoteInfoText}>
              你还没有任何历史报价信息，快去咨询吧
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  titleWrapper: {
    borderLeftColor: "#CF4747",
    borderLeftWidth: 5,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 5
  },
  title: {
    fontSize: 18,
    fontWeight: "700"
  },
  quoteInfo: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  quoteInfoText: {
    color: "#777",
    fontSize: 16
  }
};
