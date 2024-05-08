const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BodyPartsSchema = new Schema({
  head: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  oral_cavity: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  eyes: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  nose: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  ears: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  neck_or_throat: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  chest: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  upper_abdomen: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  mid_abdomen: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  lower_abdomen: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  sexual_organs: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  thigh: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  knee: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  lower_leg: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  foot: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  nape_of_neck: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  back: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  lower_back: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  buttocks: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  anus: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  upper_arm: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  forearm: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  hand: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  },
  elbow: {
    T1: [{ type: String }],
    T2: [{ type: String }]
  }
});

const BodyPartsModel = mongoose.model('BodyParts', BodyPartsSchema);

module.exports = BodyPartsModel;
