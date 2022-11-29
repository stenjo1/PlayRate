
const http = require('http');
const app = require('./src/app.js')

const server = http.createServer(app);
const port = process.env.PORT || 3000;

console.log(process.env.PORT);

server.listen(port);
server.once('listening', () => {
    console.log(`The server is running at http://localhost:${port}`);
});

