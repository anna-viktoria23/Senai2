const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaderS: ["Content-Type","Authorization"],
    })
)

app.use(cors())
app.use(express.json())

app.use('/', routes)

module.exports = app