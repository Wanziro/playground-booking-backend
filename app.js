require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

//home route
app.get("/", (req, res) => {
  res.send(`
  <h1>PLAYGROUNDS BOOKING REST APIs</h1>
  `);
});

const usersRoute = require("./routes/users");
const playgroundsRoute = require("./routes/playgrounds");
const bookingRoute = require("./routes/booking");
app.use("/api/users/", usersRoute);
app.use("/api/playgrounds/", playgroundsRoute);
app.use("/api/booking/", bookingRoute);

//404 route
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "The page does not exist on the server.",
    },
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
