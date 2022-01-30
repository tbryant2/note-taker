const express = require("express");
const routes = require("./routes/api")
const viewroutes = require("./routes/view")

// Set up Express "port 3000"
let app = express();
let PORT = process.env.PORT || 3000;

// Express app -> data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", routes);
app.use("/", viewroutes);
app.listen(PORT, () => {
  console.log("app is listening")
}); 
