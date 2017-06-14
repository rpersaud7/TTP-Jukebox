var express = require('express');
var app = express();
//set the view engine to hbs for handlebars, ejs for ejs, or pug for pug
app.set('view engine', 'ejs');
//sets this application to look at `my-views` next to the running application
app.set('views', './views');

app.get('/home', function(req, res){
 //renders the `home-page` view in `views`
 res.render('home-page');
});

app.get('*', function(req,res){
  res.status(404).send('Page not found');
});

app.listen(3000, function() {
 console.log('Listening on port 3000')
});
