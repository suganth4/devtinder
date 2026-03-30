const express = require("express");

const app = express(); // created app instance

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send("test success");
});

// This will match all the HTTP method API call to /test
app.use("/test", (req, res) => {
  res.send("request recevied successfully");
});

app.get("/user", (req, res) => {}); // route handler should respond to API Request otherwise API request will keep waiting for the response

// we can write as many as route handler in the app.use()

app.use(
  "/user",
  () => {
    console.log("user1");
    res.send("handled user1");
  },
  () => {
    console.log("user2");
    res.send("handled user2");
  },
);

// output
// user1
// response: handled user1

app.get(
  "/user",
  (req, res) => {
    console.log("user1");
  },
  () => {
    console.log("user2");
    res.send("handled user2");
  },
);

// output
// user1 // in the server console
// API request will hang. node will not automatically goes to next route handler suppose if you think if we don't handle route in the first handler with res.send()

// To go next route handler we need to use next()

app.get(
  "/user",
  (req, res, next) => {
    console.log("user1");
    next();
  },
  () => {
    console.log("user2");
    res.send("handled user2");
  },
);

// output
// user1 // in the server console
// user2 // in the server console
// handled user2 // response to the API request

app.get(
  "/user",
  (req, res, next) => {
    console.log("user1");
    res.send("handled user1");
    next();
  },
  () => {
    console.log("user2");
    res.send("handled user2");
  },
);

// output
// user1
// handled user // // response to the API request
// user2
// error // in the server console
// error will come because once the response send back to api. TCP connection will disconnect and we can not send response again.

// we can send array of funcations also

app.get("/user", [
  (req, res, next) => {
    console.log("user1");
    res.send("handled user1");
    next();
  },
  () => {
    console.log("user2");
    res.send("handled user2");
  },
]);

// this also possible
// app.use("/user", routHandler, [routHandler, routHandler], routHandler, routHandler, routHandler, [routHandler])

// There is one more way to define rounte other above

app.get("/user", [
  (req, res, next) => {
    console.log("user1");
    next();
  },
]);

app.get("user", () => {
  console.log("user2");
  res.send("handled user2");
});

// output
// user1
// user2
// handled user2 // response to the API request

// order matters

app.get("user", () => {
  console.log("user2");
  res.send("handled user2");
});

app.get("/user", [
  (req, res, next) => {
    console.log("user1");
    next();
  },
]);

// output
// user2
// handled user2 // response to the API request

// function that actually sends the response is called request handler
// function that are called middle of the request chain called middleware

// What is Middleware?

// In Node.js, middleware is simply a function that runs between the request and the response.

// Think of it like a pipeline:

// Client Request → Middleware → Middleware → Route Handler → Response

app.get("/user", [
  (req, res, next) => {
    // this is middleware
    console.log("user1");
    next();
  },
  () => {
    console.log("user2"); // this is middleware
    next();
  },
  () => {
    console.log("user2"); // this is middleware
    next();
  },
  () => {
    console.log("user2"); // this is middleware
    next();
  },
  () => {
    // this is request handler
    console.log("user2");
    res.send("handled user2");
  },
]);

// Why do we need Middleware?

// Without middleware, you’d repeat the same logic in every API.

// Middleware helps you centralize common logic.

/* 
How to handle error?

if getUser api throws error, express will go to other in order wise, as '/' will check all the API so we can use err parameter to handled the 
throwed before at place.

don't change the order

best way to handle error is try catch
*/

app.get("/getUser", () => {
  throw new Error();
});

app.use("/", (err, req, res, next) => {
  // order matter when we write parameter
  if (err) {
    res.status(500).send("something went wrong");
  }
  res.status();
});

// output
// something went wrong

app.use("/", (err, req, res, next) => {
  // order matter when we write parameter
  if (err) {
    res.status(500).send("something went wrong");
  }
  res.status();
});

app.get("/getUser", () => {
  try {
    throw new Error();
  } catch (err) {
    res.status(500).send("handled error in catch block");
  }
});

//output
// handled error in catch block

// what happens is when getUser API is called, express start checking the mathched routes in the order, eventhough first route matches, it
// does not throw error because there is no error. so it will move to next route, in the we have handled the error and carch block will
// return error.

app.listen(7777, () => {
  console.log("Server running on port 7777");
});
// What each part does:
// app → your Express application instance
// listen() → a method that starts a web server
// 7777 → the port number where the server will run
