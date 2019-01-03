import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl
} from "react-native";
import {
  WhiteSpace,
  WingBlank,
  Button,
  Toast,
  Card,
  List
} from "antd-mobile-rn";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";

import { _retrieveData } from "../../util/util";
import { FETCHING_STATE } from "../../constants";

const ListItem = List.Item;
const ListBrief = ListItem.Brief;

const QuoteScreen = inject("quoteStore", "userStore")(
  observer(
    class QuoteScreen extends Component {
      constructor(props) {
        super(props);
        this.state = {
          userId: "",
          quotes: []
        };
      }

      componentDidMount() {
        const { userStore } = this.props;
        autorun(() => {
          if (userStore.user) {
            this.setState({ userId: userStore.user._id });
            this.getQuotes(userStore.user._id);
          } else {
            this.setState({ userId: "" });
          }
        });
      }

      getQuotes = async userId => {
        this.setState({ isRefreshing: true });
        this.props.quoteStore.fetchState = FETCHING_STATE.PENDING;
        await this.props.quoteStore.fetchQuotes(userId);
        autorun(() => {
          const fetchState = this.props.quoteStore.fetchState;
          if (fetchState === FETCHING_STATE.ERROR) {
            Toast.fail("获取历史报价信息失败", 1);
          } else if (fetchState === FETCHING_STATE.SUCCESS) {
            Toast.hide();
          }
        });
        this.setState({
          quotes: this.props.quoteStore.quotes,
          isRefreshing: false
        });
      };

      handleClick = () => {
        const { navigation } = this.props;
        this.state.userId
          ? navigation.navigate("IMScreen")
          : Toast.fail("请先登录", 1);
      };

      render() {
        return (
          <ScrollView
            style={styles.quoteScreen}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.getQuotes(this.state.userId)}
              />
            }
          >
            <WhiteSpace />
            <View>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>报价咨询</Text>
              </View>
              <WingBlank>
                <WhiteSpace size="lg" />
                <Button type="warning" onPressIn={this.handleClick}>
                  立即咨询
                </Button>
              </WingBlank>
            </View>
            <WhiteSpace size="lg" />
            <View>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>历史报价信息</Text>
              </View>
              <View>
                {this.state.userId ? (
                  this.state.quotes.map(item => (
                    <View key={item._id} style={styles.quoteItem}>
                      <Card>
                        <Card.Header title={"编号： " + item._id} />
                        <Card.Body>
                          <List renderHead="产品需求">
                            <ListItem>
                              产品型号
                              <WhiteSpace size="xs" />
                              <ListBrief>
                                {item.requirements.specification}
                              </ListBrief>
                            </ListItem>
                            <ListItem>
                              质量要求-外观
                              <WhiteSpace size="xs" />
                              <ListBrief>
                                执行标准：
                                {
                                  item.requirements.appearance_quality[
                                    "执行标准"
                                  ]
                                }
                              </ListBrief>
                              <WhiteSpace size="xs" />
                              <ListBrief>
                                质量要求：
                                {
                                  item.requirements.appearance_quality[
                                    "质量要求"
                                  ]
                                }
                              </ListBrief>
                            </ListItem>
                            <ListItem>
                              质量要求-内在
                              <WhiteSpace size="xs" />
                              <ListBrief>
                                pH值：
                                {item.requirements.intrinsic_quality["pH值"]}
                              </ListBrief>
                              <WhiteSpace size="xs" />
                              <ListBrief>
                                克重：
                                {item.requirements.intrinsic_quality["克重"]}
                              </ListBrief>
                              <ListBrief>
                                织物幅宽：
                                {
                                  item.requirements.intrinsic_quality[
                                    "织物幅宽"
                                  ]
                                }
                              </ListBrief>
                              <ListBrief>
                                （国、日标）耐洗色牢度变色/沾色：
                                {
                                  item.requirements.intrinsic_quality[
                                    "（国、日标）耐洗色牢度变色/沾色"
                                  ]
                                }
                              </ListBrief>
                              <ListBrief>
                                耐干摩/湿摩色牢度：
                                {
                                  item.requirements.intrinsic_quality[
                                    "耐干摩/湿摩色牢度"
                                  ]
                                }
                              </ListBrief>
                            </ListItem>
                            <ListItem>
                              包装要求
                              <WhiteSpace size="xs" />
                              <ListBrief>
                                {item.requirements.packaging}
                              </ListBrief>
                            </ListItem>
                            <ListItem>
                              备注
                              <WhiteSpace size="xs" />
                              <ListBrief>{item.requirements.remark}</ListBrief>
                            </ListItem>
                          </List>
                        </Card.Body>
                        {item.price ? (
                          <Card.Footer extra={"报价：" + item.price} />
                        ) : (
                          <Card.Footer extra="等待客服报价" />
                        )}
                      </Card>
                    </View>
                  ))
                ) : (
                  <View style={styles.quoteInfo}>
                    <Text style={styles.quoteInfoText}>
                      您还没有登录，登录后才能使用报价功能。
                    </Text>
                  </View>
                )}
              </View>
              <WhiteSpace size="lg" />
            </View>
          </ScrollView>
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  quoteScreen: {
    backgroundColor: "#eeeeee",
    flex: 1
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
  quoteInfo: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1
  },
  quoteInfoText: {
    color: "#777",
    fontSize: 16
  },
  quoteItem: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  }
});

export default QuoteScreen;
