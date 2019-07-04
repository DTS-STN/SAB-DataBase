let express = require("express");
let app = express();
let personRoute = require("./routes/person");
let customerRoute = require("./routes/customer");
let path = require("path");
let bodyParser = require("body-parser");

app.use(bodyParser.json());
//see the request on console
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next(); // breaks the pipeline request
});

app.use(personRoute);
app.use(customerRoute);
app.use(express.static("public"));

//handler for 404 - resources not found
app.use((req, res, next) => {
  res.status(404).send("we think you are lost");
});

// Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "../public/500.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
