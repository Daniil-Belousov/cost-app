const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const Schema = mongoose.Schema;

const costSchema = new Schema({
  text: String,
  summa: Number
});

const url = "mongodb+srv://dbUser:dbUserPass@firstcluster.as11g.mongodb.net/<dbUserDB>?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Cost = mongoose.model("costs", costSchema);

app.use(bodyParser.json());
app.use(cors());

app.get("/allCosts", (req, res) => {
  Cost.find().then((result) => {
    res.send({ data: result });
  });
});

app.post("/addNewCost", (req, res) => {
  const cost = new Cost(req.body);
  cost.save().then((result) => {
    res.send({ result });
  });
});

app.patch("/editCost", (req, res) => {
  Cost.updateOne({ _id: req.body._id }, req.body).then((result) => {
    Cost.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.delete("/deleteCost", (req, res) => {
  Cost.deleteOne({ _id: req.query._id }).then((result) => {
    Cost.find().then((result) => {
      res.send({ data: result });
    });
  });
});

app.listen(8000, () => {
  console.log("The server is running!!!");
});
