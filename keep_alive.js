var http = require('http');

http.createServer(function (req, res) {
  res.write("i think im working gang");
  res.end();
}).listen(8080);
