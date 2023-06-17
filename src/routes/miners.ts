import { Logger } from "../logging/Logger"
import { identifyApi } from "../services/identification.service"
import express, { Request, Response, Router } from "express"

const router: Router = express.Router()

router.post('/add', (req: Request, res: Response) => {
    console.log(req.body)
    identifyApi(req.body.link).then((res) => {
        Logger.Dev(res);
    })
    res.status(200)
})

export default router;