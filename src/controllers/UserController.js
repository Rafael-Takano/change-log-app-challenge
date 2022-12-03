const User = require('../database/models/user')

const login = async (req,res) => {
    try{
        let user = await User.findByCredentials(req.body.login, req.body.password)
        if(!user) return res.status(404).send({error: "Wrong Credentials"})

        const token = await user.generateAuthToken();

        return res.status(200).send({
            token, 
            login: user.login
        })
    }
    catch (error) {

        return res.status(500).send({error})
    }
}

const createUser = async (req,res) => {
    
    let exists = await User.findOne({ login: req.body.login })
    if(exists) return res.status(400).send({error: `User ${req.body.login} already exists`})

    try {
        const user = new User({
            login: req.body.login,
            password: req.body.password,
            role: req.body.role
        })

        await user.save();
        const token = await user.generateAuthToken();

        return res.status(201).send({
            token,
            login: user.login
        })
    }
    catch (error) {

        return res.status(400).send({error});
    }
}

const deleteUser = async (req,res) => {
    try{
        let user = await User.findByCredentials(req.body.login, req.body.password)
        if(!user) return res.status(404).send({error: "Wrong Credentials"})

        console.log(user)

        User.deleteMany({login: user.login}, function (err) {
            if (err) console.log(err);
        })

        return res.status(200).send({
            "message": `User ${user.login} removed.`
        })
    }
    catch (error) {

        return res.status(500).send({error})
    }
}

const testRoute = async (req, res) => {
    return res.status(200).send(`Seja bem vindo ${req.body.login}!`);
}

module.exports = {login, createUser, testRoute, deleteUser, User}