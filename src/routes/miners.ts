import { getAllData, getField } from "../services/data.service"
import { Logger } from "../logging/Logger"
import { identifyApi } from "../services/identification.service"
import express, { Request, Response, Router } from "express"
import { miners } from "../constants/miners"

const router: Router = express.Router()

router.post('/add', async (req: Request, res: Response) => {
    
    identifyApi(req.body.link).then(async (data) => {
        if (data != "Unknown mining software") {
            res.status(200).json(await getAllData(data))
        } else {
            res.status(500).json({"error": "Unknown mining software"})
        }
    })    
})

export default router;