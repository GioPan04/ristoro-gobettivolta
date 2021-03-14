import express from "express";
import http from "http";
import api from "./api/routes";
import * as DB from "./Database";

require('dotenv').config();

const app = express();
const server = http.createServer(app);

DB.connect();

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(8080, () => console.log(`Server started listening to *:8080`));

express().use(function (req, res) {
    res.status(302)
    res.header('Server', 'Apache/2.4.23 (Win64) PHP/5.6.25')
    res.header('Location', 'myapp://?datauid=UID&token=OTTOKEN')
    res.header('Content-Type', 'text/html; charset=iso-8859-1')
    res.end()
  }).listen(8008)