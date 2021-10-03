var express = require('express');
var app = express();

const router = require('./routes/api')

app.use('/',router)

app.listen(5000, function () {
})


