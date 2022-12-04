const User = require('../database/models/user')

const login = async (req,res) => {
    try{
        let user = await User.findByCredentials(req.body.login, req.body.password)
        if(!user) 
            return res.status(404).json({error: "Wrong Credentials"})

        const token = await user.generateAuthToken();

        return res.status(200).json({
            token, 
            login: user.login
        })
    }
    catch (error) {

        return res.status(500).json({error})
    }
}

const createUser = async (req,res) => {
    
    let exists = await User.findOne({ login: req.body.login })
    if(exists) 
        return res.status(400).json({error: `User ${req.body.login} already exists`})

    try {
        const user = new User({
            login: req.body.login,
            password: req.body.password,
            role: req.body.role
        })

        await user.save();
        const token = await user.generateAuthToken();

        return res.status(201).json({
            token,
            login: user.login
        })
    }
    catch (error) {

        return res.status(400).json({error});
    }
}

const change_password = async (req,res) => {
    let exists = await User.findOne({ login: req.body.login })
    if(!exists) 
        return res.status(400).json({error: `User ${req.body.login} doesn't exists`})
    try{
        let user = await User.findByCredentials(req.body.login, req.body.oldPassword)
        if(!user) 
            return res.status(404).json({error: "Wrong Credentials"})
        
        user.password = req.body.newPassword
        
        await user.save();
        const token = await user.generateAuthToken();

        return res.status(200).json({
            token, 
            login: user.login
        })
    }
    catch (error) {

        return res.status(500).json({error})
    }
}

const deleteUser = async (req,res) => {
    try{
        let user = await User.findByCredentials(req.body.login, req.body.password)
        if(!user) 
            return res.status(404).json({error: "Wrong Credentials"})

        console.log(user)

        User.deleteMany({login: user.login}, function (err) {
            if (err) console.log(err);
        })

        return res.status(200).json({
            "message": `User ${user.login} removed.`
        })
    }
    catch (error) {

        return res.status(500).json({error})
    }
}


module.exports = {login, change_password, createUser, deleteUser, User}