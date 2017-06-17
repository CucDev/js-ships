/**
 * Created by garusis on 6/06/17.
 */
var express = require('express')
var app = express()

console.log(process.cwd())
app.use(express.static("src/client"))

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})