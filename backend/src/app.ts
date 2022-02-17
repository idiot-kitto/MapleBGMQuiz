import express from "express";
import { createServer } from "http";
import path from 'path';

import socketIO from "./sockets/socketIO";

const app = express();
const port = 4000;
app.set("port", port);

app.use(express.static(path.join(__dirname, '../../frontend/build')));

const server = createServer(app);
socketIO(server);

server.listen(port, () => {
  console.log(`✅ Server Listening on : http://localhost:${port}`);
});