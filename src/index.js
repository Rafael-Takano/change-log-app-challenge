const express = require('express')
const app = express()
require('./database/mongoose')

const port = process.env.PORT

const user = require('./routes/User')

app.use(express.json())


app.get('/', (req,res) => {
    res.send("Hi, I'm working!")
})

app.use('/user', user)

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})