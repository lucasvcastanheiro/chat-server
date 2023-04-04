import MessageRepository from '../repository/MessageRepository'

class MessageService {
  newMessage(message, userId): void {
    const messages = MessageRepository.getMessages()

    if (messages.length === 100) {
      messages.shift()
    }

    MessageRepository.createMessage(message, userId)
  }
}

export default new MessageService()
