const express = require('express')
const app = express()

const connectDB = require('./config/db')

connectDB()

app.use(express.json({extended:true}))

app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/addProperty',require('./routes/propertys'))

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))