import { type Request, type Response, Router } from 'express'

const routes = Router()

routes.get('/', (_req: Request, res: Response) => {
  res.send('opaa')
})

export default routes
