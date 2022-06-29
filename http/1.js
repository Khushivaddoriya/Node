const http = require("http");

const server = http.createServer((req,res) =>{
    res.setHeader("Content-type","text/html");
    res.write("<h1>welcome to HTTP Server !!! </h1>")
    res.write("request URL" +req.url);
    res.write("Request Method"+req.method);
    res.end();
});

server.listen(4040,()=>{
    console.log("server listening the port number 4040");
});