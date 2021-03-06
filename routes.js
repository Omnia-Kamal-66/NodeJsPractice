const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      "<html><head><title>My First Page</title></head><body><form action ='/messages' method = 'POST'><input type ='text' name ='message'><button type = 'submit'>Send </button></form></body></html>"
    );
    return res.end();
  }
  if (url === "/messages" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    }); //event listener to data event

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("location", "/");
        return res.end();
      }); //we block ecution of the neex line until this line is done
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>My First Page</title></head><body><h1>Hello</h1></body></html>"
  );
  res.end();
};
module.exports = {
  handler: requestHandler,
  someText: "Some hard coded text",
};
