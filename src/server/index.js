/**
 * Created by garusis on 6/06/17.
 */
var serverParts = require("./server-parts");

var ShipController = require("./ShipController")

serverParts.http.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!')
})