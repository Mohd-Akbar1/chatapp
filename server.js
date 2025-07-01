import express from 'express'
import cors from 'cors'
import authRouter from "./route/auth.route.js"
const app=express()
import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/ChatApp').then(()=>{
    console.log('db connected')
}).catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(express.json())
app.use('/auth',authRouter)
app.get('/',(req,res)=>{
    res.send('hello')
})



app.listen(8000,()=>{
    console.log('server is running on port 8000')
})