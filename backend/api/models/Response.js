const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      default: "Low",
    },
  },
  { timestamps: true },
  { collection: "responses" },
);

module.exports = mongoose.model("Response", ResponseSchema);
