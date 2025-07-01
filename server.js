const express=require('express')
const app=express() 
const mongoose=require('mongoose')
const cors=require('cors')
const path=require('path')

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(8000,()=>{
    console.log('server is running on port 8000')
})