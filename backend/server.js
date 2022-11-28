import express, { json } from 'express'
import cors from 'cors'
import route from './Routes/routes.js'

const app = express()
app.use(cors())
app.use(json())
app.use(route)

app.listen(5000, () => {
    console.log("Server running on port 5000")
})