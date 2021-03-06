var express = require("express");

var router = express.Router();
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {

  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  db.Burger.findAll().then(function(data){
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  })
});


// post route -> back to index
router.post("/burgers/create", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name
  }).then(function(){
    res.redirect("/");
  })
  // takes the request object using it as input for buger.addBurger
    // burger.create(req.body.burger_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
  //   console.log(result);
  //   res.redirect("/");
  // });

});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
  db.Burger.update({
    devoured: true
  }, {where: { id: req.body.burger_id}
}).then(function(){
  res.redirect("/");
})
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
  //   console.log(result);
  //   res.redirect("/");
  // });

});

module.exports = router;
