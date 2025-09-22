require("dotenv").config()
const app = require("./src/app");
const { connectDB } = require("./src/config/db");
const { PORT } = require("./src/config/env");
const path = require("path");
const fs = require("fs");
const globalErrorHandlerMw = require("./src/middlewares/globalErrorHandler.mw");
const express = require("express");
const cors = require("cors");

app.use(express.json());
app.use(cors());

connectDB()

const models = path.join(__dirname, "/src/models");
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  .forEach((file) => require(path.join(models, file)));

fs.readdirSync("./src/routes").forEach((file) => {
  if (file.substr(-3) == ".js") {
    let route = require(`./src/routes/${file}`);
    let routeName = file.slice(0, -6);
    app.use(`/${routeName}`, route);
    route.stack.forEach((route) => {
      if (route.route) {
        let routePath = route.route.path;
        let routeMethod = route.route.methods;
        console.log(
          `Route: ${JSON.stringify(routeMethod)}, ${routeName}${routePath}`
        );
      }
    });
  }
});

app.use(globalErrorHandlerMw);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
