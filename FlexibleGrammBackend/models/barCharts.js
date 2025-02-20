import mongoose from "mongoose";

const Schema = mongoose.Schema;

const barChart = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },code: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const BarChartModel = mongoose.model("barChart", barChart);
export default BarChartModel;