const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const PostRoute = require('./routes/PostRoute');
const GenerateImageRoute = require('./routes/GenImgRoute');
require('dotenv').config()

// Mongo DB Connections
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(express.json({ limit: "10mb" }));

// Routes
app.use('/api/post', PostRoute)
app.use('/api/generateImage', GenerateImageRoute)


// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT,'0.0.0.0', ()=>{
    console.log('App running in port: '+PORT)
})