import Websocket from 'ws'
import { type Server } from 'http'

class Wss {
  wss: Websocket.Server
  connections: Websocket[] = []
  commands: Record<string, Function> = {}

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
    const { cmd, data }: { cmd: string, data: object } = JSON.parse(message)

    if (!cmd) {
      ws.send(this._createStringData('error', { error: 'command not informed' }))
      return
    }

    try {
      this.commands[cmd](ws, data)
    } catch (error) {
      ws.send(this._createStringData('error', { error: `command '${cmd}' isn't valid` }))
    }
  }

  _onError(err: Error): void {
    console.log(`onError: ${err.message}`)
  }

  sendWs(cmd: string, data: object, id?: string): void {
    if (Object.values(this.connections).length === 0) {
      return
    }

    const stringData = this._createStringData(cmd, data)

    if (id) {
      this.connections[id].send(stringData)
    } else {
      this.connections.forEach(connection => {
        connection.send(stringData)
      })
    }
  }

  _createStringData(cmd: string, data: object): string {
    return JSON.stringify({ cmd, data })
  }

  _createWsId(): string {
    const randomDate = new Date().getTime()
    return `#${randomDate}`
  }

  saveConnection(ws: Websocket): void {
    const id = this._createWsId()

    this.connections[id] = ws

    this.sendWs('connection', { id }, id)
  }
}

export default Wss
