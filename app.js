const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var shell = require('shelljs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});


app.post('/submit-student-data', function (req, res) {
  //shell.exec('az group create -n myRG -l southcentralus');
  var rgName1 = req.body.rgName;
  shell.exec('az group create -n ${rgName1} -l southcentralus');
  console.log(rgName1);
  res.redirect('/');
  // let name = 'works';
  // res.send(name + ' Submitted Successfully!');
});

app.post('/submit', function (req, res) {
  //shell.exec('az account show');
  console.log('account');
  res.redirect('/');
  // let name = 'works';
  // res.send(name + ' Submitted Successfully!');
});
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

