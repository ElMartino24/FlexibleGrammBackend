import { check, validationResult } from "express-validator";

export const userValidation = [
  check("vorname")
    .trim()
    .isLength({ min: 2, max: 20 })
    .isString()
    .withMessage("Vorname kann nicht kleiner als 2 oder größer als 20 sein"),
    check("nachname")
    .trim()
    .isLength({ min: 2, max: 20 })
    .isString()
    .withMessage("Nachname kann nicht kleiner als 2 oder größer als 20 sein"),
  check("email").isEmail().normalizeEmail().withMessage("email format ist nicht korrekt"),
  check("password").trim().isLength({ min: 8 }).isString(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "E-Mail oder Passwort ist falsch",
        content: errors,
        isSuccess: false,
      });
    }
    next();
  },
];

export const loginValidation = [
  check("email").isEmail().normalizeEmail().withMessage("Die eingegebene E-Mail-Adresse ist nicht korrekt."),
  check("password").trim().isLength({ min: 8 }).isString(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "E-Mail oder Passwort ist falsch",
        content: errors,
        isSuccess: false,
      });
    }
    next();
  },
];
