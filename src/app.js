import express, { json } from 'express'
import cors from 'cors' 
import router from './routes/index.routes.js';

// config Server  
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)


// Run Server
const PORT = 5000
app.listen(PORT, () => console.log('Server Run'))

