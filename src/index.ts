import express, {type Express} from "express";
import { Logger } from "./logging/Logger";
const port = 8888;

const app: Express = express();

// app configuration

// app base routes

// run app

app.listen(port, () => {
    Logger.Info("MinerInsight running on port: " + port)
})