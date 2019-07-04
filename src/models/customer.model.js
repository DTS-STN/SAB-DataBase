let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/3001");

mongoose.connection
  .once("open", function() {
    console.log("connection has been made");
  })
  .on("error", function(error) {
    console.log("Connection error:;, error");
  });

let CustomerSchema = new mongoose.Schema({
  name: String,
  CIC: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Customer", CustomerSchema);
