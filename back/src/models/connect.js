const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const connect=async ()=>{
    await mongoose.connect(process.env.mongoURI)
    console.log('conectado a mongo')
}

module.exports={connect}