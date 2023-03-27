const express=require("express")
const {connection}=require("./data")
const app=express()

const { userRouter } = require("./routes/user.routes")
const {postRouter}=require("./routes/post.routes")
require("dotenv").config()

const cors=require("cors")
const {auth}=require("./middleware/middleware")

app.use(express.json())
app.use(cors)
app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Mongoose is connected to DB!")
    } catch (error) {
        console.log("Mongoose is not connected to DB!")
        console.timeLog(error.message)
    }
    console.log(`server is running on ${process.env.port}`)
})