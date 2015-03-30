require('toffee');
var app = require('express')();

app.set('view engine', 'toffee');

app.get('/', function(_, res) {
  var assets = require('./assets');
  res.render('index', { layout: 'views/layout.toffee', skyAssets: assets });
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
