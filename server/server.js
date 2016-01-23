var koa = require('koa');
var serve = require('koa-static');
var path = require('path');
var app = koa();

app.use(serve(path.join(__dirname, '../www/public/')));

app.listen(3000);
