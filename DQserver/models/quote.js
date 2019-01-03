const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  userId: String,
  requirements: {
    specification: String,
    appearance_quality: {
      执行标准: String,
      质量要求: String
    },
    intrinsic_quality: {
      pH值: String,
      克重: String,
      织物幅宽: String,
      "（国、日标）耐洗色牢度变色/沾色": String,
      "耐干摩/湿摩色牢度": String
    },
    packaging: String,
    remark: String
  },
  price: Number
});

module.exports = mongoose.model("Quote", QuoteSchema);
