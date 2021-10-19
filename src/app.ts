import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import { router } from "./routes";

const app = express();

app.use(cors())

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log(`Usuário se conectou no socket ${socket.id}`)
})

app.use(express.json())

app.use(router)

app.get("/github", (req, resp) => {
  resp.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.get("/signin/callback", (req, resp) => {
  const { code } = req.query;

  return resp.json(code);
})

app.listen(4000, () => console.log('Rodando na porta 4000...'));
