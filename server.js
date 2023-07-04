const express=require('express')
const passport = require('passport')
const session=require('express-session')
const cors=require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');


const app=express()
const PORT=process.env.PORT || 8080

  app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
  }))

  // app.use('/google', createProxyMiddleware({
  //   target: 'https://accounts.google.com',
  //   changeOrigin: true,
  // }));
  
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

  
  app.use(passport.initialize());
  app.use(passport.session());
  
const {connect}=require('./src/models/connect')
connect()

require('./src/utils/passport')

const UserRouter=require('./src/routes/User')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

app.use('/',UserRouter)

app.listen(PORT,()=>{
console.log(`Servidor escuchando en puerto ${PORT}`)
})