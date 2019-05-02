import { version } from "../package.json";

export default {
  name: "huey",
  version: version,
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 3,
  tags: ["top", "basics"],
  optionGroups: {
    fit: [
      "bicepsEase",
      "chestEase",
      "cuffEase",
      "collarEase",
      "shoulderEase",
      "waistEase",
      "hipsEase",
      "ribbingStretch"
    ],
    style: [
      "lengthBonus",
      "sleeveLengthBonus",
      "ribbing",
      "pocket",
      "ribbingHeight",
      "pocketHeight",
      "pocketWidth",
      "hoodHeight",
      "hoodCutback",
      "hoodClosure",
      "hoodDepth",
      "hoodAngle"
    ],
    advanced: [
      "acrossBackFactor",
      "armholeDepthFactor",
      "backNeckCutout",
      "frontArmholeDeeper",
      "shoulderSlopeReduction",
      "sleeveWidthGuarantee",
      {
        sleevecap: [
          "sleevecapEase",
          "sleevecapTopFactorX",
          "sleevecapTopFactorY",
          "sleevecapBackFactorX",
          "sleevecapBackFactorY",
          "sleevecapFrontFactorX",
          "sleevecapFrontFactorY",
          "sleevecapQ1Offset",
          "sleevecapQ2Offset",
          "sleevecapQ3Offset",
          "sleevecapQ4Offset",
          "sleevecapQ1Spread1",
          "sleevecapQ1Spread2",
          "sleevecapQ2Spread1",
          "sleevecapQ2Spread2",
          "sleevecapQ3Spread1",
          "sleevecapQ3Spread2",
          "sleevecapQ4Spread1",
          "sleevecapQ4Spread2"
        ]
      }
    ]
  },
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "headCircumference",
    "hipsCircumference",
    "naturalWaist",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToShoulder",
    "shoulderToWrist",
    "wristCircumference"
  ],
  dependencies: {
    backBase: "base",
    frontBase: "backBase",
    sleevecap: "frontBase",
    sleeveBase: "sleevecap",
    back: "backBase",
    front: "frontBase",
    sleeve: "sleeveBase",
    pocket: "front"
  },
  inject: {
    backBase: "base",
    frontBase: "backBase",
    sleeveBase: "sleevecap",
    back: "backBase",
    front: "frontBase",
    sleeve: "sleeveBase",
    pocket: "front"
  },
  hide: ["base", "sleevecap", "backBase", "frontBase", "sleeveBase"],
  parts: ["hood", "waistband", "cuff"],
  options: {
    // Constants
    brianFitSleeve: true,
    brianFitCollar: true,
    collarFactor: 4.8,

    // Options inherited from Brian
    acrossBackFactor: { pct: 97, min: 93, max: 100 },
    armholeDepthFactor: { pct: 65, min: 50, max: 70 },
    backNeckCutout: { pct: 5, min: 2, max: 8 },
    bicepsEase: { pct: 20, min: 0, max: 50 },
    chestEase: { pct: 8, min: -4, max: 20 },
    collarEase: { pct: 25, min: 20, max: 30 },
    cuffEase: { pct: 20, min: 0, max: 200 },
    frontArmholeDeeper: { pct: 0.5, min: 0, max: 1.5 },
    lengthBonus: { pct: 10, min: 5, max: 15 },
    shoulderEase: { pct: 0, min: -2, max: 6 },
    shoulderSlopeReduction: { pct: 0, min: 0, max: 8 },
    sleeveLengthBonus: { pct: 0, min: -40, max: 10 },
    sleevecapEase: { pct: 0, min: 0, max: 10 },
    sleevecapTopFactorX: { pct: 50, min: 25, max: 75 },
    sleevecapTopFactorY: { pct: 100, min: 35, max: 165 },
    sleevecapBackFactorX: { pct: 60, min: 35, max: 65 },
    sleevecapBackFactorY: { pct: 33, min: 35, max: 65 },
    sleevecapFrontFactorX: { pct: 55, min: 35, max: 65 },
    sleevecapFrontFactorY: { pct: 33, min: 35, max: 65 },
    sleevecapQ1Offset: { pct: 3, min: 0, max: 7 },
    sleevecapQ2Offset: { pct: 5.5, min: 0, max: 7 },
    sleevecapQ3Offset: { pct: 4.5, min: 0, max: 7 },
    sleevecapQ4Offset: { pct: 1, min: 0, max: 7 },
    sleevecapQ1Spread1: { pct: 6, min: 4, max: 20 },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread2: { pct: 10, min: 4, max: 20 },
    sleevecapQ3Spread1: { pct: 10, min: 4, max: 20 },
    sleevecapQ3Spread2: { pct: 8, min: 4, max: 20 },
    sleevecapQ4Spread1: { pct: 7, min: 4, max: 20 },
    sleevecapQ4Spread2: { pct: 7, min: 4, max: 20 },
    sleeveWidthGuarantee: { pct: 90, min: 25, max: 100 },

    // Options specific to Huey
    ribbing: { bool: true },
    pocket: { bool: true },

    ribbingHeight: { pct: 10, min: 5, max: 15 },
    pocketHeight: { pct: 30, min: 25, max: 35 },
    pocketWidth: { pct: 60, min: 50, max: 70 },
    waistEase: { pct: 12, min: 4, max: 20 },
    hipsEase: { pct: 8, min: 4, max: 12 },
    hoodHeight: { pct: 59, min: 55, max: 65 },
    hoodCutback: { pct: 10, min: 5, max: 15 },
    hoodClosure: { pct: 13.5, min: 10, max: 15 },
    hoodDepth: { pct: 8.5, min: 5, max: 12 },
    ribbingStretch: { pct: 15, min: 0, max: 30 },

    hoodAngle: { deg: 5, min: 2, max: 8 }
  }
};
