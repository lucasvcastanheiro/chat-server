import express, { type Application, json } from 'express'
import routes from './routes/routes'
import cors from 'cors'
import Wss from './websocket'
import { type Server, createServer } from 'http'

class App {
  express: Application
  wss: Wss
  server: Server

  constructor() {
    this.express = express()

    this._routes()
    this._middlewares()
    this._webSocket()
  }

  _routes(): void {
    this.express.use(routes)
  }

  _middlewares(): void {
    this.express.use(json())
    this.express.use(cors())
  }

  _webSocket(): void {
    this.server = createServer(this.express)
    this.wss = new Wss(this.server)
  }
}

export default new App()
