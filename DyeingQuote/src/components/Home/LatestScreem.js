import React, { Component } from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { WhiteSpace } from "antd-mobile-rn";
const LatestScreen = class LatestScreen extends Component {
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
    const imageUri = "./img/latest4.jpg";
    return (
      <ScrollView style={styles.LatestWrapper}>
        <WhiteSpace size="lg" />
        <View>
          <Text style={styles.LatestTitle}>公司面料产品设计再获佳绩</Text>
        </View>
        <WhiteSpace />
        <View>
          <Text style={styles.LatestInfo}>发布于 2018-09-13 15:04</Text>
        </View>
        <WhiteSpace size="lg" />
        <View>
          <View style={styles.LatestImage}>
            <Image source={require(imageUri)} />
          </View>
          <WhiteSpace size="lg" />
          <View>
            <Text style={styles.LatestContent}>
              日前，公司在2018年中国国际面料设计大赛、第40届（2019/20秋冬）中国流行面料入围评审中再获佳绩，被授予“2019/20秋冬流行面料入围企业”称号，由席亚伟、戚芳设计的“霓裳羽衣”面料产品荣获大赛优秀奖。
            </Text>
          </View>
          <WhiteSpace />
          <View>
            <Text style={styles.LatestContent}>
              中国国际面料设计大赛活动是由中国纺织工业联合会主办，中国纺织信息中心、国家纺织产品开发中心、中国国际贸易促进委员会纺织行业分会、纺织行业职业技能鉴定指导中心、中国流行色协会、法兰克福展览（香港）有限公司等单位共同承办，是中国纺织面料设计领域最具权威性和影响力的专业赛事。中国流行面料入围评审也是彰显纺织行业产品开发成果的重要活动，是优秀纺织企业展现研发实力的重要平台。
            </Text>
          </View>
          <WhiteSpace />
          <View>
            <Text style={styles.LatestContent}>
              据了解，公司多年来不断加强在产品创新研发上的投入力度，新成立的集研发、创意、生产、展示为一体的创意中心，使公司的研发能力跃上新的台阶。凭借深厚的产品研发和创新能力，公司已连续多年获此殊荣。公司设计的面料产品不仅在各类比赛中屡屡获奖，也在市场上获得越来越多的认可和欢迎。
            </Text>
          </View>
        </View>
        <WhiteSpace size="lg" />
      </ScrollView>
    );
  }
};

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
    fontSize: 18,
    lineHeight: 20
  },
  LatestImage: {
    alignItems: "center"
  }
};

export default LatestScreen;
