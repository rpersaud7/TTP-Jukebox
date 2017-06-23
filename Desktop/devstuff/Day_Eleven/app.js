<<<<<<< HEAD

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

var conString = 'postgres://kzqhrhldmqirpk:c0b1526e53a0ba99ab0a5fc90231d99b553debb8da78e02d36e84e5cde0564e6@ec2-54-221-254-72.compute-1.amazonaws.com:5432/d7h1jccq0bmh0f';
//initialize connection with sequelize then test connection, notify through console success/fail
const sequelize = new Sequelize(conString);
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//create and initialize table if does not already exist
const Entries = sequelize.define('entries', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull:false
  }
});

Entries.sync();

var bentries = ["no"];  //array for table contents, loaded with dummy value for bug reporting

//populates array above with all blog posts already on the database on visiting the page
Entries.findAll().then(entries => {
  bentries = entries;
});

//ejs template usage
app.set('view engine', 'ejs');
//sets this application to look at `my-views` next to the running application
app.set('views', './views');

app.use(express.static(__dirname));

app.get('/', function(req, res){
  //renders the `home-page` view in `views`
  res.render('home-page');
});

app.get('/portfolio', function(req, res){
  res.render('portfolio');
})

app.get('/blog', function(req, res){
  Entries.findAll().then(entries => {
    res.render('blog', {entries});
  });
});

app.post('/blog', function(req, res){
  //adds blog post to database
  var title = req.body.title;
  var content = req.body.content;
  Entries.sync().then(function(){
    Entries.create({
      title: title,
      content: content
    });
    console.log("Success!");
  });
  Entries.sync();
  res.redirect('/blog')
});

app.get('*', function(req,res){
  res.status(404).send('Page not found');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000')
});

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// $('#submit').on('submit', function(event) {
//   event.preventDefault();
//   $.ajax({
//     url: 'http://localhost:3000/blog',
//     data: entries,
//     method: 'POST'
//   }).then(function(response){
//   //do stuff with response
//   $('body').append(response);
// });
// });
=======

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));


//initialize connection with sequelize then test connection, notify through console success/fail
const sequelize = new Sequelize('postgres://postgres:1029384756@localhost:5432/blogpost');
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

//create and initialize table if does not already exist
var Entries= sequelize.define('entries',
{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  content: Sequelize.STRING
});

var bentries = ["no"];  //array for table contents, loaded with dummy value for bug reporting

//populates array above with all blog posts already on the database on visiting the page
Entries.findAll().then(entries => {
  bentries = entries;
});

//ejs template usage
app.set('view engine', 'ejs');
//sets this application to look at `my-views` next to the running application
app.set('views', './views');

app.use(express.static(__dirname));

app.get('/home', function(req, res){
  //renders the `home-page` view in `views`
  res.render('home-page');
});

app.get('/portfolio', function(req, res){
  res.render('portfolio');
})

app.get('/blog', function(req, res){
  Entries.findAll().then(entries => {
      res.render('blog', {entries});
  });
});

app.post('/blog', function(req, res){
  //adds blog post to database
  var title = req.body.title;
  var content = req.body.content;
  Entries.sync().then(function(){
    Entries.create({
      title: title,
      content: content
    });
    console.log("Success!");
  });
  Entries.sync();
  res.redirect('/blog')
});

app.get('*', function(req,res){
  res.status(404).send('Page not found');
});

app.listen(3000, function() {
  console.log('Listening on port 3000')
});

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// $('#submit').on('submit', function(event) {
//   event.preventDefault();
//   $.ajax({
//     url: 'http://localhost:3000/blog',
//     data: entries,
//     method: 'POST'
//   }).then(function(response){
  //   //do stuff with response
  //   $('body').append(response);
  // });
// });
>>>>>>> 71684e490c6d42b0dd76ef64d538692861cef8fd
