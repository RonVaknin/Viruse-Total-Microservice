//modules
const express = require("express");
const app = express();
//internal
const { fileRoute, urlRoute } = require("./routes/index");
const auth = require("./middleware/auth");
//environment variables
const port = process.env.VT_PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  next();
});
app.use(auth);

app.use("/file", fileRoute);
app.use("/url", urlRoute);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
