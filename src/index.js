const express = require('express')
const port = 3000
const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Hi, I'm working!")
})

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})