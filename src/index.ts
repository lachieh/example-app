import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/healthz', (c) => {
  return c.json({ status: 'ok' })
})
app.get('/api', (c) => {
  return c.json({ message: 'Hello from API!' })
})
app.get('/api/:name', (c) => {
  const { name } = c.req.param()
  return c.json({ message: `Hello, ${name}!` })
})

serve({
  fetch: app.fetch,
  port: Number(import.meta.env?.PORT) || Number(process.env.PORT) || 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
