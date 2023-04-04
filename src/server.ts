import app from './app'
import Wss from './websocket'

const server = (): void => {
  const PORT = 3000

  try {
    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })

    Wss.init(server)
  } catch (error) {
    console.log('Server starting ERROR: ', error)
    process.exit(1)
  }
}

server()
