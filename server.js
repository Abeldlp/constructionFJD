const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/message", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: req.body.subject,
    html:
      "<h3>Nombre: " +
      req.body.name +
      "</h3></br><p>Email: " +
      req.body.email +
      "</p></br><p>Lugar: " +
      req.body.subject +
      "</p></br><p>La obra seria para " +
      req.body.when +
      "</p></br><p>" +
      req.body.message +
      "</p>",
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error occurs: ", err);
    } else {
      console.log("Message sent");
    }
  });
});

const PORT = process.env.PORT || 8000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
