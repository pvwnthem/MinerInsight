import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors"
import ejs from "ejs"

import { Logger } from "./logging/Logger";
import { miner } from "./types/miner.types";
import { test } from "./services/api.service";

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

app.engine('html', ejs.renderFile);


// app base routes
app.get("/", (req: Request, res: Response) => {
    res.render('index.html')
    
    
})

// run app
app.listen(port, () => {
    Logger.Info("MinerInsight running on port: " + port)
})