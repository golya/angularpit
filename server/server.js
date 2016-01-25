var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router')();
var path = require('path');
var app = koa();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(serve(path.join(__dirname, '../www/public/')));

app.listen(3000);
