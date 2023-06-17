import express, { Express, Request, Response } from "express";
import { Logger } from "./logging/Logger";
import { discoverRunning } from "./services/discovery.service";
const port = 8888;

const app: Express = express();

// app configuration

// app base routes
app.get("/", (req: Request, res: Response) => {
    res.send(discoverRunning())
})

// run app
app.listen(port, () => {
    Logger.Info("MinerInsight running on port: " + port)
})