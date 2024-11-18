require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const agenda = require("./agenda");

const Flow = require("./models/Flow");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Save Flow
app.post("/api/save-flow", async (req, res) => {
  const { name, nodes, edges } = req.body;
  const flow = new Flow({ name, nodes, edges });
  await flow.save();
  res.send({ message: "Flow saved successfully" });
});

// Schedule Email
app.post("/api/schedule-email", async (req, res) => {
  const { time, emailBody, subject, emailAddress } = req.body;
  const job = agenda.create("send-email", { emailBody, subject, emailAddress });
  job.schedule(time);
  await job.save();
  res.send({ message: "Email scheduled successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
