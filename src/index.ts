import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors"
import { createProxyMiddleware } from "http-proxy-middleware"

import { Logger } from "./logging/Logger";
import { discoverRunning } from "./services/discovery.service";
import { miner } from "./types/miner.types";

const port = 8888;

const app: Express = express();

// app configuration
function customHeaders( req: Request, res: Response, next: NextFunction ){
  
    res.setHeader( 'X-Powered-By', 'MinerInsight' );
  
    next();
}

app.use(customHeaders)

app.use(cors({
    origin: '*'
}));

// app base routes
app.get("/", (req: Request, res: Response) => {
    res.send("MinerInsight server")
    
})

// run app
app.listen(port, () => {
    Logger.Info("MinerInsight running on port: " + port)
})