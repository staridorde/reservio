const { mongoose } = require('mongoose')

const server_url = 'mongodb+srv://starcevicmilos2:t5Am98cmHq5dPkCd@cluster0.wpqt4m9.mongodb.net/reservio?retryWrites=true&w=majority&appName=Cluster0'

exports.initializeDatabase = () => {
    mongoose.connect(server_url)
        .then(() => console.log('DB Connected'))
        .catch(error => console.log('DB NOT Connected'))

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}