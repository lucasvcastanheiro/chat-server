import Websocket from 'ws'
import { type Server } from 'http'

class Wss {
  wss: Websocket.Server
  connections: Websocket[] = []
  commands: Record<string, Function> = {}

  init(server: Server): void {
    this.wss = new Websocket.Server({
      server
    })

    this.wss.on('connection', (ws: Websocket, _req: any) => {
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

    if (cmd === 'authentication') {
      this._authentication(ws, data, cmd)
      return
    }

    if (this.commands[cmd]) {
      try {
        this.commands[cmd](ws, data, cmd)
      } catch (error) {
        ws.send(this._createStringData('error', { error: error.message }))
      }
    } else {
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
      for (const connection of Object.values(this.connections)) {
        connection.send(stringData)
      }
    }
  }

  _createStringData(cmd: string, data: object): string {
    return JSON.stringify({ cmd, data })
  }

  _createWsId(): string {
    const randomDate = new Date().getTime()
    return `#${randomDate}`
  }

  _authentication(ws: any, data: any, cmd: string): void {
    let { id }: { id: string } = data

    if (!id) {
      id = this._createWsId()
      ws.send(this._createStringData(cmd, { id }))
    }

    ws.id = id

    this.connections[id] = ws
  }

  addCommand(cmd: string, action: Function): void {
    this.commands[cmd] = action
  }
}

export default new Wss()
