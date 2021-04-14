const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const statusRouter = require("./routes/status");

const app = express();

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://s.jnr.cx", "http://localhost:8003"],
    credentials: true,
  })
);

app.use("/status", statusRouter);

app.all("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "hi",
  });
});

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "404",
  });
});

app.listen(8003, function () {
  console.log("listening on port 8003");
});
