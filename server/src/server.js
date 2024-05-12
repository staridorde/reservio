const express = require('express')
const cors = require('cors')
const database = require('./db/database')

const PORT = process.env.PORT || 8001

// database
database.initializeDatabase()

// Middleware
const app = express()
app.use(cors())
app.use(express.json())

// Route definition
const ticketTypesRoutes = require('./routes/ticketTypesRoutes')
app.use('/ticketTypes', ticketTypesRoutes)

const reservationRoutes = require('./routes/reservationRoutes')
app.use('/reservation', reservationRoutes)

const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

// init server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
