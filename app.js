var http = require('http');

// http.createServer(function (req, res) {
// res.writeHead(200, {'Content-Type': 'text/html'});
// res.end('Hello innomick world');
// }).listen(3001);

var mysql = require('mysql');

var conn = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "123456789@Rk",
database: "userinfo"
});

conn.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

    //show all products
    app.get('/api/user/datainfo',(req, res) => {
    let sql = "SELECT * FROM user";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
    });

    //add new product
    app.post('/api/user/datainfo',(req, res) => {
      console.log(req.body) 
        let data = {username: req.body.username, password: req.body.password, email: req.body.email, phonenumber: req.body.phonenumber, address: req.body.address, dob: req.body.dob, gender: req.body.gender, createdate: req.body.createdate, updateddate: req.body.updateddate};
      let sql = "INSERT INTO user SET ?";
      let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });
     
    //update product
    app.put('/api/user/:username',(req, res) => {
      let sql = "UPDATE user SET username='"+req.body.username+"', password='"+req.body.password+"' WHERE username="+req.params.username;
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });
     
    //Delete product
    app.delete('/api/user/:username',(req, res) => {
      let sql = "DELETE FROM user WHERE username="+req.params.username+"";
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });
    app.listen(3001,() => {
        console.log("Server is Running on port 3001.");
    });