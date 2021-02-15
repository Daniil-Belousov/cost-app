const Cost = require('../../db/models/cost/index');

module.exports.getAllCosts = ("/allCosts", (req, res, next) => {
  Cost.find().then((result) => {
    res.send({ data: result });
  });
});

module.exports.addNewCost = ("/addNewCost", (req, res, next) => {
  const cost = new Cost(req.body);
  cost.save().then((result) => {
    res.send({ result });
  });
});

module.exports.editCost = ("/editCost", (req, res, next) => {
  Cost.updateOne({ _id: req.body._id }, req.body).then((result) => {
    Cost.find().then((result) => {
      res.send({ data: result });
    });
  });
});

module.exports.deleteCost = ("/deleteCost", (req, res, next) => {
  Cost.deleteOne({ _id: req.query._id }).then((result) => {
    Cost.find().then((result) => {
      res.send({ data: result });
    });
  });
});