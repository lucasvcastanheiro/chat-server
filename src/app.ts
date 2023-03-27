import express, { type Application, json } from 'express'
import routes from './routes/routes'
import cors from 'cors'

class App {
  express: Application

  constructor() {
    this.express = express()

    this._routes()
    this._middlewares()
  }

  _middlewares(): void {
    this.express.use(json())
    this.express.use(cors())
  }

  _routes(): void {
    this.express.use(routes)
  }
}

export default new App().express
