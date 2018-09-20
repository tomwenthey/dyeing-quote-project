import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import { Carousel, Grid, WhiteSpace, Card, List } from "antd-mobile-rn";

const ListItem = List.Item;
const ListBrief = ListItem.Brief;

const carouselData = [
  { img: require("./img/carousel1.jpg") },
  { img: require("./img/carousel2.jpg") },
  { img: require("./img/carousel3.jpg") },
  { img: require("./img/carousel4.jpg") }
];

const latestNews = [
  { 
    title: "公司面料产品设计再获佳绩", 
    time: "2018-09-13", 
    content: "", 
    img: require("./img/latest1.jpg") 
  },
  { 
    title: "双重预防体系建设验收评审组走进公司", 
    time: "2018-09-13", 
    content: "", 
    img: require("./img/latest2.jpg") 
  },
  { 
    title: "内外合力助推公司稳健发展", 
    time: "2018-09-06", 
    content: "", 
    img: require("./img/latest3.jpg") 
  },
  { 
    title: "市“质量月”活动启动仪式在公司召开", 
    time: "2018-09-06", 
    content: "", 
    img: require("./img/latest4.jpg") 
  },
  { 
    title: "省总来滨调研齐鲁工匠工作 公司做专题汇报", 
    time: "2018-09-06", 
    content: "", 
    img: require("./img/latest5.jpg") 
  },
];

const dyeingWorks = [
  {
    img: require("./img/works1.jpg"),
    explain: "jel"
  },
  {
    img: require("./img/works2.jpg"),
    explain: "jel"
  },
  {
    img: require("./img/works3.jpg"),
    explain: "jel"
  },
  {
    img: require("./img/works4.jpg"),
    explain: "jel"
  },
  {
    img: require("./img/works5.jpg"),
    explain: "jel"
  },
  {
    img: require("./img/works6.jpg"),
    explain: "jel"
  },
  {
    img: require("./img/works7.jpg"),
    explain: "jel"
  },
  {
    img: require("./img/works8.jpg"),
    explain: "jel"
  }
];

const companyIntro = [
  {
    title: "公司概况",
    content:
      "华纺股份有限公司坐落于中国三角洲宜居城市滨州，至今具有41年沿革历史。是中国纺织印染行业的龙头骨干企业，资产总额达20亿元。 公司具有综合竞争优势，全力推进智慧华纺建设，是中国印染产品开发基地、山东省印染节能减排工程技术研究中心和中国质量检验协会确认的打假扶优重点保护企业。"
  },
  {
    title: "企业文化",
    content:
      "公司理念： 上善若水，厚德载物。做企业和做人一样，华纺在追求持续发展的进程中坚守立身之道，秉持对社会、对环境、对客户、对政府、对股东、对员工的责任意识，以宽厚的胸怀来承载、滋养和包容企业精神，并使之为各方带来福祉。 公司使命： 高品质纺织品缔造者 健康时尚生活倡导。"
  }
];

export default class HomeScreen extends Component {
  componentDidMount() {
    this.props.navigation.setParams({ title: "首页" });
  }

  render() {
    const screenWidth = Dimensions.get("window").width;
    return (
      <ScrollView>
        <View style={styles.homeScreen}>
          <Carousel
            style={styles.carouselWrapper}
            autoplay
            infinite
            dots={false}
          >
            {carouselData.map((item, index) => (
              <View key={`carouse${index}`}>
                <Image
                  source={item.img}
                  style={{ height: 200, width: screenWidth + 1 }}
                />
              </View>
            ))}
          </Carousel>
          <WhiteSpace size="lg" />
          <View>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>最新动态</Text>
            </View>
            <WhiteSpace />
            <List>
              {latestNews.map((item, index) => (
                <ListItem
                wrap
                extra={
                  <Image
                    source={item.img}
                    style={{ width: 120, height: 80 }}
                  />
                }
                style={styles.latestNews}
                key={`latest${index}`}
              >
                {item.title}
                <WhiteSpace />
                <ListBrief>{item.time}</ListBrief>
              </ListItem>
              ))}
            </List>
          </View>
          <WhiteSpace size="lg" />
          <View>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>产品展示</Text>
            </View>
            <WhiteSpace />
            <Grid
              data={dyeingWorks}
              columnNum={2}
              isCarousel
              carouselMaxRow={2}
              itemStyle={{ height: 150 }}
              renderItem={(el, index) => (
                <Image source={el.img} style={{ height: 150 }} />
              )}
              onClick={(el, index) => console.log(el.explain, index)}
            />
          </View>
          <WhiteSpace size="lg" />
          <View>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>公司简介</Text>
            </View>
            <WhiteSpace />
            {companyIntro.map((item, index) => (
              <View key={`intro${index}`}>
                <Card>
                  <Card.Header title={item.title} />
                  <Card.Body>
                    <View>
                      <Text style={styles.introContent}>{item.content}</Text>
                    </View>
                  </Card.Body>
                </Card>
                <WhiteSpace />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
  },
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
  introContent: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    lineHeight: 18
  },
  latestNews: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10
  }
});
