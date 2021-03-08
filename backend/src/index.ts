import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(8080, () => console.log(`Server started listening to *:8080`));