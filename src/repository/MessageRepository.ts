class MessageRepository {
  _messages: object[] = []

  createMessage(message, userId): void {
    this._messages.push({
      message,
      userId
    })
  }

  getAllMessages(): object[] {
    return this._messages
  }
}

export default new MessageRepository()
