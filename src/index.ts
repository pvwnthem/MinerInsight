import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors"
import ejs from "ejs"
import bodyParser from "body-parser";

import { Logger } from "./logging/Logger";
import { miner } from "./types/miner.types";
import path from "path";
import miners from "./routes/miners";

const port = 8888;

const app: Express = express();
app.use(bodyParser.json());
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


//routes
app.use("/miners", miners)

// app base routes
app.get("/", (req: Request, res: Response) => {
    res.render('index.html')
})

app.get("/index.js", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + "/scripts/index.js"))
})

// run app
app.listen(port, () => {
    Logger.Info("MinerInsight running on port: " + port)
})