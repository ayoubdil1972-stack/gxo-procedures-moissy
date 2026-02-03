import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './pages/home'
import { ReceptionPage } from './pages/reception'
import { CaristePage } from './pages/cariste'
import { ManutentionPage } from './pages/manutention'
import { ChefEquipePage } from './pages/chef-equipe'
import { NouveauPage } from './pages/nouveau'
import { AnomaliesPage } from './pages/anomalies'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer middleware
app.use(renderer)

// Routes
app.get('/', (c) => c.render(<HomePage />))
app.get('/reception', (c) => c.render(<ReceptionPage />))
app.get('/cariste', (c) => c.render(<CaristePage />))
app.get('/manutention', (c) => c.render(<ManutentionPage />))
app.get('/chef-equipe', (c) => c.render(<ChefEquipePage />))
app.get('/nouveau', (c) => c.render(<NouveauPage />))
app.get('/anomalies', (c) => c.render(<AnomaliesPage />))

export default app
