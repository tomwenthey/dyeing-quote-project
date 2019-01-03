const specification = require("../db/specifications");
const QuoteModel = require("../models/quote");

const isQualified = (req, res) => {
  const { type, inputType, input } = req.body;
  let rs = { status: 0 };
  let newInput;
  switch (type) {
    case "specifications":
      // 判断输入是否是存在的型号，即输入的型号是否属于型号的集合
      newInput = input.toUpperCase().replace(/ /g, "");
      let flag = 0;
      for (let i = 0; i < specification.length; i++) {
        if (newInput === specification[i].specificaiton) {
          flag = 1;
          newInput = specification[i].specificaiton;
          break;
        }
      }
      if (!flag) {
        rs.message =
          "请输入正确的型号，例：HH1611801。您可以在官网上查看所有型号及其介绍。";
      } else {
        rs = {
          status: 1,
          type,
          result: newInput
        };
      }
      break;
    case "appearance_quality":
      rs = {
        status: 1,
        type,
        inputType
      };
      if (inputType === "执行标准") {
        if (input == 1) {
          rs.result = "国标一等";
        } else {
          rs.result = input;
        }
      } else if (inputType === "质量要求") {
        if (input == 1) {
          rs.result = "一等";
        } else {
          rs.result = input;
        }
      }
      break;
    case "intrinsic_quality":
      if (inputType === "pH值") {
        newInput = input.split("-");
        if (newInput.length === 2 && newInput[0] >= 0 && newInput[1] <= 14) {
          rs = {
            status: 1,
            type,
            inputType,
            result: input
          };
        } else {
          rs.message = "请输入正确格式的pH值，例：4-10";
        }
      } else if (inputType === "克重") {
        newInput = input.split(/-|\//g);
        let weightOne = parseFloat(newInput[0]);
        let weightTwo = parseFloat(newInput[1]);
        if (weightOne >= 0 && weightOne < weightTwo) {
          rs = {
            status: 1,
            type,
            inputType,
            result: input
          };
        } else {
          rs.message = "请输入正确格式的克重，例：1.75KGS-1.8KGS/12Y";
        }
      } else if (inputType === "织物幅宽") {
        newInput = input.split("/");
        if (
          newInput.length === 2 &&
          newInput[0] >= 0 &&
          newInput[1] >= newInput[0]
        ) {
          rs = {
            status: 1,
            type,
            inputType,
            result: input
          };
        } else {
          rs.message = "请输入正确格式的织物幅宽，例：46/47";
        }
      } else if (
        inputType === "耐干摩/湿摩色牢度" ||
        inputType === "（国、日标）耐洗色牢度变色/沾色"
      ) {
        let flag = 1;
        newInput = input.split("/");
        if (newInput.length === 2) {
          if (newInput[0].indexOf("-")) {
            newInput[0] = newInput[0].split("-").map(item => parseInt(item));
            if (newInput[0][0] <= 0 || newInput[0][0] >= newInput[0][1]) {
              flag = 0;
            }
          } else {
            if (parseInt(newInput[0]) <= 0) {
              flag = 0;
            }
          }
          if (newInput[1] && newInput[1].indexOf("-")) {
            newInput[1] = newInput[1].split("-").map(item => parseInt(item));
            if (newInput[1][0] <= 0 || newInput[1][0] >= newInput[1][1]) {
              flag = 0;
            }
          } else {
            if (parseInt(newInput[1]) <= 0) {
              flag = 0;
            }
          }
        } else {
          flag = 0;
        }

        if (flag) {
          rs = {
            status: 1,
            type,
            inputType,
            result: input
          };
        } else {
          rs.message = "请输入正确格式的耐干摩/湿摩色牢度，例：3-4级/2级";
        }
      }
      break;
    default:
      break;
  }
  res.json(rs);
};

function createQuote(req, res) {
  const QuoteEntity = new QuoteModel(req.body);
  QuoteEntity.save(err => {
    if (err) {
      res.json({ status: 0, message: err.message });
    }
    res.json({
      status: 1,
      message: "报价需求采集完毕，您可以在历史报价信息中查看报价结果。",
      quoteId: QuoteEntity
    });
  });
}

function updateQuote(req, res) {
  console.log(111);
  res.json(req.body);
}

function getQuote(req, res) {
  res.json(req.params);
}

function getQuotes(req, res) {
  const { userId } = req.params;
  let rs = { status: 0 };
  QuoteModel.find({ userId }).sort({_id:-1}).exec((err, quotes) => {
    if (err) {
      rs.message = err.message;
    } else {
      rs.status = 1;
      rs.data = quotes;
    }

    res.json(rs);
  });
}

module.exports = {
  isQualified,
  createQuote,
  updateQuote,
  getQuote,
  getQuotes
};
