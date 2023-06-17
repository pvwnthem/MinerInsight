import { Logger } from "../logging/Logger"
import { identifyApi } from "../services/identification.service"
import express, { Request, Response, Router } from "express"

const router: Router = express.Router()

router.post('/add', (req: Request, res: Response) => {
    identifyApi(req.body.link).then((data) => {
        res.json(data).status(200)
    })
})

export default router;