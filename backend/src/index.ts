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