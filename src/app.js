/* 
    Before connecting to the database we should not start listening to the port
    Because, suppose server started listning to listening to the port 7777 and waiting for the request from the use
    but database is not connected or failed. then it will be problem 
*/

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/database");

const authRoute = require("./routes/auth.routes");
const profileRoute = require("./routes/profile.routes");
const connectionRequestRoute = require("./routes/connectionRequest.routes");

// express.json reads json  and convert it into javascript object because express can not read json directly
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoute);
app.use("/", profileRoute);
app.use("/", connectionRequestRoute)
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    success: false,
    code: err.code,
    message: err.message || "something went wrong",
  });
});

connectDb().then(() => {
  console.log("Database Connected Successfully");
  app.listen(7777, () => {
    console.log("Server Connected Successfully");
  });
});
