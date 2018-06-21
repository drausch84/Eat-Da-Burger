// Dependencies
var express = require("express");

var router = express.Router();

// Import our burger model
var burger = require("../models/burger.js");

// Creates our routes
// Get Route:
router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});
// Post Route:
    router.post("/api/burgers", function(req, res) {
        burger.create([
          "burger_name"
        ], [
          req.body.burger_name
        ], function(data) {
          res.redirect("/");
        });
      });    
// Put Route:
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.update(req.body, condition, function(result) {
        if (result.changedRows == 0) {
            // If there's no change in the rows, give a 404 not found error
            return res.status(404).end();
        } else {
          res.status(200).end();
        }
    });
});

module.exports = router;

