import MessageRepository from '../repository/MessageRepository'

class MessageService {
  newMessage(message, userId): void {
    if (!message || message.length === 0) {
      throw new Error("Message couldn't be empty")
    }

    const messages = MessageRepository.getAllMessages()

    if (messages.length === 100) {
      messages.shift()
    }

    MessageRepository.createMessage(message, userId)
  }

  getAllMessages(): object[] {
    const messages = MessageRepository.getAllMessages()
    return messages
  }
}

export default new MessageService()
