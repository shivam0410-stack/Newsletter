const express = require("express");
const app = express();
const request = require("request");
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 80, function () {
  console.log("Server is running on port 80");
});

//API-key
//89f066b895dce0e4ade6be47603eb3a0-us14
//https://us14.admin.mailchimp.com/account/api/

//Audience id
//ae28a66d51
