import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const createAccount = async (req, res, next) => {
  const { vorname, nachname, password, email } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(422).json({
      message: "Account existiert bereits",
      content: user,
      isSuccess: false,
    });
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).json({
      message: "Account kann nicht gespeichert werden",
      content: null,
      isSuccess: false,
    });
  }

  const newUser = new UserModel({
    email,
    password: hashedPassword,
    vorname,
    nachname,
  });
  let id;
  try {
    const user = await newUser.save();

    id = user.id;

    let accessToken = jwt.sign({ userId: id }, process.env.JWT_SECRET);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      message: "Account erfolgreich gespeichert",
      content: user.id,
      isSuccess: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      content: null,
      isSuccess: false,
    });
  }
};

export const loginAction = async (req, res, next) => {
  let id;

  try {
    cookieParser()(req, res, () => {});
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(422).json({
        message: "E-Mail oder Passwort ist falsch",
        content: null,
        isSuccess: false,
      });
    }

    let hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return res.status(401).json({
        message: "E-Mail oder Passwort ist falsch",
        content: null,
        isSuccess: false,
      });
    }

    id = user.id;

    let accessToken = jwt.sign({ userId: id }, process.env.JWT_SECRET);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      message: "Erfolgreich eingellogged",
      content: user.id,
      isSuccess: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      content: null,
      isSuccess: false,
    });
  }
};
