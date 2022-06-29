const http = require("http");

const url = require("url");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  const q = url.parse(req.url, true).query;
  console.log(q);
  if (q.uname == "admin" && q.upwd == "admin") {
    res.write("<h1> Login Success </h1> ");
  } else {
    res.write("<h1> Login Fail</h1>");
  }
  res.end();
});

server.listen(7878, () => {
  console.log("server listening the port number 7878");
});
