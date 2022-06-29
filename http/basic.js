
var http = require("http");

var server = http.createServer((Request, Response) => {
  Response.setHeader("content-type", "text/html");
  Response.write("<h1> Hello greeting </h1>");
  console.log("request rec");
});
server.listen(6565, () => {
  console.log("listening 7878");
});
