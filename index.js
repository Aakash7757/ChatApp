var express = require('express');

var app = express();

var server = app.listen(3000, () =>{
    console.log("server is  on", server.address().port);
    app.use(express.static(__dirname));
});
