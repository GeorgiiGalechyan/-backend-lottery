// Adding Current Environment Variable
import { environment } from './src/utils/currentEnvironment.js'

import fastify from 'fastify'
import { Pino } from './src/services/pino/index.js' // Pino congiguration

// Create server
const serverOpts = { logger: Pino[environment] ?? { level: 'info' } }
export const app = fastify(serverOpts)

export async function start() {
  try {
    await app.ready().then(() => {
      app.log.info('Plugins registration completed! ====\n')
    })
    await app.listen({
      port: process.env.HTTP_PORT || 5000,
      listenTextResolver: (address) => `Server listening on address ${address}`,
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
