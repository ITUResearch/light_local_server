const consts = require("../config/consts");

var PORT = consts.ENV.boradPort;
var dgram = require("dgram");
var client = dgram.createSocket("udp4");

client.on("listening", function() {
  var address = client.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  client.setBroadcast(true);
});

client.on("message", function(message, rinfo) {
  console.log(
    "Message from: " + rinfo.address + ":" + rinfo.port + " - " + message
  );
});

client.bind(PORT);