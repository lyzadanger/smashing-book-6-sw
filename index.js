const express = require('express');
const http    = require('http');
const path    = require('path');

const port = 3003;
const app = new express();
const server = new http.Server(app);
app.use(express.static(path.join(__dirname, '/examples')));
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
