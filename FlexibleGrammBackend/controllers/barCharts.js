import BarChartModel from "../models/barCharts.js";
import UserModel from "../models/userModel.js";

export const createBarCharts = async (req, res, next) => {
  const { code } = req.body;

  try {
    const user = req.user ? await UserModel.findById(req.user) : null;

    const newEntry = new BarChartModel({
      userId: user ? user._id : null,
      code,
      date: new Date(),
    });

    const entry = await newEntry.save();

    res.status(201).json({
      message: "Saved Entry",
      content: entry,
      isSuccess: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Entry can't be saved",
      content: null,
      isSuccess: false,
    });
  }
};

export const getEntry = async (req, res, next) => {
  try {
    const entry = await BarChartModel.find({});

    res.json({
      message: "Entry found",
      content: entry,
      isSuccess: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error try agian",
      content: null,
      isSuccess: false,
    });
  }
};

export const deleteEntry = async (req, res, next) => {
  try {
    const deletePost = req.body;
    const entry = await BarChartModel.findById(deletePost.id);

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
        content: null,
        isSuccess: false,
      });
    }

    await BarChartModel.findByIdAndDelete(deletePost.id);

    res.status(200).json({
      message: "Eintrag erfolgreich gelöscht",
      content: entry,
      isSuccess: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server-Fehler, bitte erneut versuchen",
      content: null,
      isSuccess: false,
    });
  }
};
