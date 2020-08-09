
// Require packages and set the port
const express = require("express");
const port = 3002;
const bodyParser = require("body-parser");
const app = express();
var axios = require("axios");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxKSI2sGEmv5AK8Mnius7I0Wrs75hITF__Z8_bZI43_NeS9Ags/exec?";
// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("*", async (req, response) => {
  try {
    let newUrl = SCRIPT_URL + req.originalUrl;
    let res = await axios.get(newUrl);
    response.send(res.data);
  } catch (error) {
    response.send(error);
  }
});

app.post("*", (req, res) => {
    let newUrl = SCRIPT_URL + req.originalUrl;
    axios
    .post(newUrl, req.body)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});

app.put("*", (req, res) => {
    let newUrl = SCRIPT_URL + req.originalUrl;
    let body = req.body;
    body.method = "PUT"
    axios
    .post(newUrl, body)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});

app.delete("/", (req, res) => {
    let newUrl = SCRIPT_URL + req.originalUrl;
    let body = req.body;
    body.method = "DELETE"
    axios
    .post(newUrl, body)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});

// Start the server
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
