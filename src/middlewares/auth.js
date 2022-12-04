const jwt = require('jsonwebtoken')
const {User} = require('../controllers/UserController')
require('dotenv').config()

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        let user = await User.findOne({
            _id: decoded._id
        })
    
        if(!user) res.status(404).send({error: 'Not Logged'})
    
        req.token = token
        req.user = user
        next()
    }
    catch (err) {
        console.log(err)
        res.status(401).send({err})
    }
}
