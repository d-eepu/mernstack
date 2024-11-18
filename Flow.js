const mongoose = require("mongoose");

const FlowSchema = new mongoose.Schema({
  name: String,
  nodes: Array,
  edges: Array,
});

module.exports = mongoose.model("Flow", FlowSchema);
