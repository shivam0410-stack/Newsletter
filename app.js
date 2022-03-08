const express = require("express");
const app = express();
const request = require("request");
const https = require("https");
// const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  let firstName = req.body.fname;
  let lastName = req.body.lname;
  let email = req.body.email;
  // console.log(firstName,lastName,email);

  const data = {
    member: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/f6d80cc6da";

  const options = {
    method: "POST",
    auth: "Shivam:89f066b895dce0e4ade6be47603eb3a0-us14",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 2000) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

//API key
//e01dc41b0a9abc12157f9fa0020fe6f6-us14
//List ID
//3398a0a44a
//ca6b17efab35fc1cbddfe3ccd177b634-us14
//f6d80cc6da

//API-key
//89f066b895dce0e4ade6be47603eb3a0-us14
//https://us14.admin.mailchimp.com/account/api/

//Audience id
//ae28a66d51
