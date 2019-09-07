var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


router.get("/", function (req, res) {
  burger.all(function (data) {
    var hamburgerObj = {
      burgers: data
    };
    console.log(hamburgerObj);
    res.render("index", hamburgerObj);
  });
});


router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.post("/api/burgers", function (req, res) {
  console.log(req.body.name)
  burger.create([
    "burger_name", "devoured"
  ], [
      req.body.name, req.body.devoured
    ], function (result) {
      res.json({ id: result.insertId });
    });
});

module.exports = router;