import user from "../model/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js"



export const signup=async(req,res)=>{
    try {
        const {fullname,username,password,gender}=req.body

    const user=await user.findOne({username})
    if(user){
        return res.status(400).send('user already exist')
    }
    
    const profileBoy=`https://avatar.iran.liara.run/public/boy?username=${username}`
    const profileGirl=`https://avatar.iran.liara.run/public/boy?username=${username}`

    const profilePic=gender=='male'?profileBoy:profileGirl
    const passwordHash=await bcrypt.hash(password,10)
    const newUser=new user({fullname,username,passwordHash,gender,profilepic:profilePic})
    await newUser.save()
    await generateToken(newUser._id)
    res.status(201).json({user:newUser,message:'user created'})
        
    } catch (error) {
       res.status(500).json({message:error.message})  
    }
}

export const login=async(req,res)=>{
    try {
        const {username,password}=req.body
        const user=await user.findOne({username})
        if(!user){
            return res.status(400).send('user not found')
        }
        const isMatch=await bcrypt.compare(password,user.passwordHash)
        if(!isMatch){
            return res.status(400).send('password is not correct')
        }
        await generateToken(user._id)
        res.status(200).json({user:user,message:'user logged in'})
        
    } catch (error) {
         res.status(500).json({message:error.message})
    }
}

export const logout=(req,res)=>{
    try {
        res.clearCookie('jwt')
        res.status(200).json({message:'user logged out'})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        

    }
}