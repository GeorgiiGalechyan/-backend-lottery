import Fastify from 'fastify'
import Pino from './src/services/pino/index.js' // Pino congiguration

const serverOpts = {
  logger: Pino ?? { level: 'info' },
}

export const app = Fastify(serverOpts)

export async function start() {
  try {
    await app.ready().then(app.log.info('App is ready.'))
    app.listen({
      port: process.env.HTTP_PORT || 5000,
      listenTextResolver: (address) => `Server listening on address ${address}`,
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
