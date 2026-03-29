const express = require("express");

const app = express();  // created app instance

// This will only handle GET call to /user
app.get('/user', (req, res) => {
    res.send('test success')
})

// This will match all the HTTP method API call to /test
app.use('/test', (req, res) => {
    res.send('request recevied successfully')
})

app.listen(7777, () => {
  console.log("Server running on port 7777");
});
// What each part does:
// app → your Express application instance
// listen() → a method that starts a web server
// 7777 → the port number where the server will run
