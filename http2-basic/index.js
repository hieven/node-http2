const http2 = require('http2')

const path = require('path')
const fs = require('fs')

const rootPath = path.resolve(__dirname, '..')

const httpServer = http2.createSecureServer(
  {
    key: fs.readFileSync(path.resolve(rootPath, 'cert/server.key')),
    cert: fs.readFileSync(path.resolve(rootPath, 'cert/server.crt'))
  },
  (req, res) => {
    res.statusCode = 200
    res.write(`Hello HTTP/2!\n`)
    res.write(`If you're using Chrome, please open Chrome Inspector and you will see the Protocol is h2 (http/2)\n`)
    res.end()
  }
)

httpServer.listen(3000, () => { console.log('server is listening on :3000') })