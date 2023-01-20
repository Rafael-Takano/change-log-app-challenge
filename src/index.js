const express = require('express')
const app = express()
require('./database/mongoose')

const port = process.env.PORT

const user = require('./routes/User')
const auth = require('./middlewares/auth')
const project = require('./routes/Project')

app.use(express.json())

app.use('/user', user)
app.use('/project', auth, project)

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})

// feedbacks: 
// filters on query
// shorter paths
// use auth to know which user is it
// when are getting projects send the updates as well

// swagger -> commits to 