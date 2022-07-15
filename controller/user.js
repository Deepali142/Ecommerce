const user = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (name == undefined && name == '' && name == null) {
        return res.send("Please Enter your name")
    }
    if (email == undefined && email == '' && email == null) {
        return res.send("Please Enter your email")
    }
    if (password == undefined && password == '' && password == null) {
        return res.send("Please Enter your password")
    }

    const oldUser = await user.findOne({ email: email })
    if (oldUser) {
        return res.send("Email already exists!!")
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const userData = {
        name,
        email,
        password: encryptedPassword,
    }
    const newUser = new user(userData);
    console.log(newUser, 'newUser');

    newUser.save()
        .then((user) => {
            console.log('User Created successfully');
            return res.send({
                message: 'User Created Successfully!!',
                user,
                success: true
            })
        }).catch((err) => {
            console.log(err);
            return res.send(err)
        })
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email == undefined && email == '' && email == null) {
        return res.send("Please Enter your email")
    }
    if (password == undefined && password == '' && password == null) {
        return res.send("Please Enter your password")
    }

    await user.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.send("User Doesn't exists!!")
            } else {
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.send('Password didnt match')
                } else {
                    const token = jwt.sign({ "_id": user._id }, 'anaya', {
                        expiresIn: "1d"
                    })
                    res.json({ success: true, token: token, user: user })
                }
            }
        }).catch((err) => {
            return res.json({ success: false, message: err.message })
        })
};











