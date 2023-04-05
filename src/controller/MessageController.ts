import MessageService from '../service/MessageService'
import Wss from '../websocket'

class MessageController {
  newMessage(ws, data, cmd): void {
    const { message, id } = data

    try {
      MessageService.newMessage(message, id)
      Wss.sendWs(cmd, { message, userId: id })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getAllMessages(ws, _data, cmd): void {
    try {
      const messages = MessageService.getAllMessages()
      Wss.sendWs(cmd, { messages }, ws.id)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new MessageController()
