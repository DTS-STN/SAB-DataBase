let express = require("express");
let router = express.Router();

// QueryString => query property on the request object
// localhost:3001/person?name=thomas&age=20
router.get("/person", (req, res) => {
  if (req.query.name) {
    res.send(`You have requested a person ${req.query.name}`);
  } else {
    res.send("You have requested a person");
  }
});

// // Params property on the request object
// // localhost:3001/person/thomas
router.get("/person/:name", (req, res) => {
  res.send(`You have requested a person ${req.params.name}`);
});

router.get("/error", (req, res) => {
  throw new Error("This is a forced error.");
});

module.exports = router;
