/**
 * Created by garusis on 22/06/17.
 */

/*
 *  This file create and expose all the parts to create and use our server.
 *
 *  When you *require* this file the first time its contain is executed and the result
 *  is cached in the *exports* object. When you *require* the second time it's not executed,
 *  just return the *exports* object previously cached. In this way you can share items,
 *  settings or functions between different modules.
 */

var express = require('express');

var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("src/client"))


exports.app = app;
exports.http = http;
exports.io = io;