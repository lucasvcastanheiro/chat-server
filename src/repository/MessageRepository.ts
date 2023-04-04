class MessageRepository {
  _messages: object[] = []

  createMessage(message, userId): void {
    this._messages.push({
      message,
      userId
    })
  }

  getMessages(): object[] {
    return this._messages
  }
}

export default new MessageRepository()
