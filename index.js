const express = require('express')
const app = express()
const server = 3306
var path = require("path");

app.get('/', (req, res) => res.send('Hello World'));

app.listen(server, () => console.log("Listening"))




var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'users',
  port:3306,
});

var db;

connection.connect();

connection.query('SELECT * FROM users', function (err, data) {
  if (err) throw err

  app.get('/users', function (req, res) {
    var allUserNames = '';
    for(let i=0; i< data.length; i+=1){
      allUserNames+= data[i].name + ', ';
    }
    res.send('Users are: ' + allUserNames);
  })
})

connection.query('SELECT * FROM users', function (err, data) {
  if (err) throw err
  for(let i=0; i< data.length; i+=1){
    app.get('/users/' + data[i].id, function(req, res){
      res.send( 'Username: ' + data[i].name + ', E-mail: ' + data[i].email + ', Adress: ' + data[i].address + ', Age: ' + data[i].age);

    })
  }
})

connection.end();