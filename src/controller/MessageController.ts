import MessageService from '../service/MessageService'
import Wss from '../websocket'

class MessageController {
  newMessage(ws, data, cmd): void {
    const { message, id } = data

    try {
      MessageService.newMessage(message, id)
      Wss.sendWs(cmd, { message, userId: id })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MessageController()
