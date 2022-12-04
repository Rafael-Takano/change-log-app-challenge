const express = require('express')
const app = express()
require('./database/mongoose')

const port = process.env.PORT

const user = require('./routes/User')
const auth = require('./middlewares/auth')
const update = require('./routes/Update') 
const project = require('./routes/Project')

app.use(express.json())


app.get('/', (req,res) => {
    res.send("Hi, I'm working!")
})

app.use('/user', user)
app.use('/project', project)
app.use('/update', update)


app.use('/auth', auth, (req,res) => {
    res.send("Hi, I'm working!\nI'm Authorized")
})

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})