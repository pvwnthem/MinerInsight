import express, { Request, Response, Router } from "express"

const router: Router = express.Router()

router.post('/add', (req: Request, res: Response) => {
    console.log(req.body)
    res.status(200)
})

export default router;