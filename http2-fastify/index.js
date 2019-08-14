const Fastify = require('fastify')

const path = require('path')
const fs = require('fs')

const rootPath = path.resolve(__dirname, '..')

const fastify = Fastify({
  http2: true,
  https: {
    key: fs.readFileSync(path.resolve(rootPath, 'cert/server.key')),
    cert: fs.readFileSync(path.resolve(rootPath, 'cert/server.crt'))
  }
})

fastify.get('/', async (req, res) => {
  const file = fs.readFileSync(path.resolve(rootPath, 'files/index.html'))

  for (let i = 1; i <= 7; i++) {
    req.raw.stream.pushStream({ ':path': `/static/${i}.jpg` }, async (err, stream) => {
      if (err) {
        request.log.warn(err); return
      }

      const img = fs.readFileSync(path.resolve(rootPath, `files/${i}.jpg`))
      stream.respond({ ':status': 200 })
      stream.end(img)
    })
  }

  res.type('text/html')
  res.send(file)
})

fastify.get('/static/:fileName', async (req, res) => {
  const file = fs.readFileSync(path.resolve(rootPath, `files/${req.params.fileName}`))
  res.send(file)
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})