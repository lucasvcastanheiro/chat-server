import app from './app'

const server = (): void => {
  const PORT = 3000

  try {
    app.server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log('Server starting ERROR: ', error)
    process.exit(1)
  }
}

server()
