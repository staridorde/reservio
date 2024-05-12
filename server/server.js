const express = require('express')
const cors = require('cors')
const { mongoose } = require('mongoose')

const PORT = process.env.PORT || 8001
const server_url = 'mongodb+srv://starcevicmilos2:t5Am98cmHq5dPkCd@cluster0.wpqt4m9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// database
mongoose.connect(server_url)
    .then(() => console.log('DB Connected'))
    .catch(error => console.log('DB NOT Connected'))

// server app
const app = express()
app.use(cors())
app.get('/test-request', (req, res) => {
    console.log('GET request received on /test-request')
    res.send({ empty: 'json' })
})

// init server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
