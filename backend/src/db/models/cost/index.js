const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const costSchema = new Schema({
    text: String,
    summa: Number
  });

  module.exports = Cost = mongoose.model('costs', costSchema);