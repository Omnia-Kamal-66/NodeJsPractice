const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
}); //on going event listener

server.listen(3000);
