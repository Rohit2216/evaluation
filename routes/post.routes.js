const express=require("express")
const postRouter=express.Router()
const {PostModel}=require("../model/post.model")


const jwt=require("jsonwebtoken")

postRouter.get("/",async(req,res)=>{
    try {
        const user=await PostModel.find()
        res.send(user)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postRouter.get("/add",async(req,res)=>{
    const payload=req.body;
    try {
        const user=new PostModel(payload)
        await user.save()
        res.status(200).send({"msg":"Post is created Successfully!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postRouter.get("/update/:postId",async(req,res)=>{
    const postId=req.params.postId;
    const payload=req.body;

    try {
        await PostModel.findByIdAndUpdate({_id:postId},payload)
        res.status(200).send({"msg":"post updated succesfuly!"})
    } catch (error) {
        res.status(400).send({"msg":"error.message"})
    }
})

postRouter.get("/delete/:postId",async(req,res)=>{
    const postId=req.params.postId;
    // const payload=req.body;

    try {
        await PostModel.findByIdAndDelete({_id:postId})
        res.status(200).send({"msg":"post deleted succesfuly!"})
    } catch (error) {
        res.status(400).send({"msg":"error.message"})
    }
})

module.exports={
    postRouter
}