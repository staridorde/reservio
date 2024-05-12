const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.get('/test-request', (req, res) => {
    console.log('GET request received on /test-request')
    res.send({ empty: 'json' })
})

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
