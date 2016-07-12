var express = require('express');
var app = express();
var fs = require('fs-extra');

app.use(express.static('./client'));


require('./api/routes')(app)

app.use(function(req,res,next){
    next();
});



app.get('*', function (req, res) {
  	res.sendFile('/client/views/index.html', { root: __dirname });
})
app.listen(8080, function () {
  console.log('Server is running.')
});