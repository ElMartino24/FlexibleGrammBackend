import mongoose from "mongoose";

const Schema = mongoose.Schema;

const columnChart = new Schema({
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

const ColumnChartModel = mongoose.model("columnChart", columnChart);
export default ColumnChartModel;