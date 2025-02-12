import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flowChart = new Schema({
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

const FlowChartModel = mongoose.model("FlowChart", flowChart);
export default FlowChartModel;