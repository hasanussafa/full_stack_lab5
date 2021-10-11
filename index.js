// Kazi Hasanus Safa, Student ID: 101275458
const express = require('express');
const path = require('path');
let app = express();
let fs = require('fs');
const router = express.Router();

// create home.html page
router.get('/home', (req, res) => {
  const filePath = path.join(__dirname, 'home.html'); // showing home.html page information
  res.sendFile(filePath);
});
// user information
router.get('/profile', (req, res) => {
  const filePath = path.join(__dirname, 'user.json');
  let data = fs.readFileSync(filePath, { encoding: 'utf8' }); // showing user.json page information
  data = JSON.parse(data);
  res.json(data);
});
// check authentication 
router.get('/login', (req, res) => {
  let { username, password } = req.query;
  const filePath = path.join(__dirname, 'user.json');
  let data = fs.readFileSync(filePath, { encoding: 'utf8' });
  const user = JSON.parse(data);
  let response;
  if (user.username == username && user.password == password) {  // checking username and password
      response = { status: true, message: 'User Is valid' }; 
  }
  else if(user.username != username){
    response = { status: false, message: 'User Name is invalid' };     
  }
   else {
    response = { status: false, message: 'Password is invalid' };
  }
  res.json(response);
});
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} logout.<b>`);
});

app.use('/', router);
app.listen(process.env.port || 8081);
console.log('Web Server is listening at port ' + (process.env.port || 8081));