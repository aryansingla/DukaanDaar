const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Chiklu@123",
  database: "dukaandaar",
});
app.get("/api", (req, res) => {
  const sqlSelect = "Select * from exmp";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
