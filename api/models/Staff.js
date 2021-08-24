const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);
