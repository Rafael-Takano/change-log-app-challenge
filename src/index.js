const express = require('express')
const app = express()
require('./database/mongoose')

const updateController = require('./controllers/UpdateController')

const port = process.env.PORT

const user = require('./routes/User')
const auth = require('./middlewares/auth')

app.use(express.json())


app.get('/', (req,res) => {
    res.send("Hi, I'm working!")
})

app.post('/update', updateController.addUpdate)

app.use('/user', user)

app.use('/auth', auth, (req,res) => {
    res.send("Hi, I'm working!\nI'm Authorized")
})

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})