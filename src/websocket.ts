import Websocket from 'ws'
import { type Server } from 'http'

class Wss {
  wss: Websocket.Server
  connections: Websocket[] = []

  constructor(server: Server) {
    this.wss = new Websocket.Server({
      server
    })

    this.wss.on('connection', (ws: Websocket, _req: any) => {
      this.saveConnection(ws)

      ws.on('message', (message: string) => { this._onMessage(ws, message) })
      ws.on('error', this._onError)
    })
  }

  _onMessage(ws: Websocket, message: string): void {
    for (const connection of this.connections) {
      connection.send(message)
    }
  }

  _onError(err: Error): void {
    console.log(`onError: ${err.message}`)
  }

  sendWs(cmd: string, data: object, id?: string): void {
    if (Object.values(this.connections).length === 0) {
      return
    }

    const formatedData = JSON.stringify({ cmd, data })

    if (id) {
      this.connections[id].send(formatedData)
    } else {
      this.connections.forEach(connection => {
        connection.send(formatedData)
      })
    }
  }

  _createWsId(): string {
    const randomDate = new Date().getTime()
    return `#${randomDate}`
  }

  saveConnection(ws: Websocket): void {
    const id = this._createWsId()

    this.connections[id] = ws

    this.sendWs('conexao', { id }, id)
  }
}

export default Wss
