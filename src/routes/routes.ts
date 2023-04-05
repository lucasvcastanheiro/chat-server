import { type Request, type Response, Router } from 'express'
import Wss from '../websocket'
import MessageController from '../controller/MessageController'

const routes = Router()

routes.get('/', (_req: Request, res: Response) => {
  res.send('opaa')
})

Wss.addCommand('newMessage', MessageController.newMessage)
Wss.addCommand('getAllMessages', MessageController.getAllMessages)

export default routes
