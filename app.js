const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var shell = require('shelljs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/storage',function(req,res){
  res.sendFile(path.join(__dirname+'/storage.html'));
});

router.get('/home',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});

router.get('/users',function(req,res){
  res.sendFile(path.join(__dirname+'/users.html'));
});

router.get('/network',function(req,res){
  res.sendFile(path.join(__dirname+'/network.html'));
});


app.post('/signup', function (req, res) {
  var rgName = req.body.rgName;
  var userName = req.body.userName;
  var password = req.body.password;
  shell.exec('az group create -n' + rgName + ' -l southcentralus');
  shell.exec('az ad user create --display-name ' + userName + ' --password ' + password + ' --user-principal-name ' + userName + '@alexvo19gmail.onmicrosoft.com');
  shell.exec('az role assignment create --role owner --assignee ' + userName + '@alexvo19gmail.onmicrosoft.com');
  res.redirect('/home');
  
  
});

app.post('/blob', function (req, res) {
  var rgName2 = req.body.rgName;
  var accName = req.body.accName;
  shell.exec('az storage account create --name ' + accName + ' --location southcentralus --resource-group ' + rgName2 + ' --sku Standard_LRS --kind blobstorage --access-tier hot');
  res.send(accName + ' created Successfully!');
});

app.post('/sql', function (req, res) {
  var rgName3 = req.body.rgName;
  var serverName = req.body.serverName;
  var adminName = req.body.adminName;
  var password = req.body.password;
  var db = req.body.db;
  shell.exec('az sql server create -n ' + serverName + ' --admin-user ' + adminName + ' --admin-password ' + password + ' -g ' + rgName3 + ' -l southcentralus');
  shell.exec('az sql db create -n ' + db + ' -g ' + rgName3 + ' -s ' + serverName);
  res.send(db + ' sql database created Successfully!');
});

app.post('/createreader', function (req, res) {
  var userName = req.body.userName;
  shell.exec('az ad user create --display-name ' + userName + ' --password "Kchall2019!" --user-principal-name ' + userName + '@alexvo19gmail.onmicrosoft.com --force-change-password-next-login');
  shell.exec('az role assignment create --role reader --assignee ' + userName + '@alexvo19gmail.onmicrosoft.com');
  res.send(userName + ' reader created Successfully!');
  
});

app.post('/createwriter', function (req, res) {
  var userName = req.body.userName;
  shell.exec('az role assignment create --role writer --assignee ' + userName + '@alexvo19gmail.onmicrosoft.com');
  res.send(userName + ' upgraded to writer');
  
});

app.post('/createVM', function (req, res) {
  var vmrgName = req.body.vmrgName;
  var vName = req.body.vName;
  var subName = req.body.subName;
  var vmName = req.body.vmName;
  shell.exec('az network vnet create --resource-group ' + vmrgName + ' --name ' + vName + ' --subnet-name ' + subName);
  shell.exec('az vm create --resource-group ' + vmrgName + ' --name ' + vmName + ' --vnet-name ' + vName + ' --subnet ' + subName + ' --image UbuntuLTS --admin-username arlington');
  res.send(vName + ' and ' + vmName + ' created');
  
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');


// sudo lsof -i :3000
// kill -9 {PID}
