const http 		= require('http');
const app 		= require('./app.js');

const server 	= http.createServer(app);
const port 		= 3010;

server.listen(port);


console.log("***************************");
console.log(" ");
console.log("API Started on Port "+port);
console.log(" ");
console.log("***************************");