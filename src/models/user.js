const mongoose=require('mongoose')
const {Schema}=mongoose

const User=new Schema({
    googleId:String,
    email:String,
    password:String,
    points:{
        type:Number,
        default:0
    },
})

mongoose.model('User',User)
module.exports=mongoose.model('User',User)