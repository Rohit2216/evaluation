const express = require("express")

const { UserModel } = require("../model/users.model")
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//register

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body;
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            // Store hash in your password DB.

            const user = new UserModel({ name, email, gender, age, city, is_married, password: hash })
            await user.save()
            res.status(200).send({ "msg": "Users Register Successfully!" })

        });
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

// login

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                // result == true
                result ? res.status(200).send({ "msg": "Users login succesfully", token: jwt.sign({ foo: 'bar' }, 'shhhhh') }) : res.status(400).send({ "msg": "Users Wrong Credentials" })

            });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})


userRouter.get("/details", (req, res) => {
    // const {token}=req.query;
    const token = req.headers.authorization
    jwt.verify(token, 'shhhhh', function (err, decoded) {
        decoded ? res.status(200).send("users details") : res.status(400).send({ "msg": "login required,users details not match" }) // bar

    });
})
module.exports = {
    userRouter
}
