const express=require('express')
const UserRouter=express.Router()
const passport=require('passport')
require('../utils/passport')
const session=require('express-session')

const {
    login,
    signUp,
    loginPage,
    logout,
    update}=require('../controllers/users')


UserRouter.get('/google/login',passport.authenticate('google', 
 { scope: ['profile', 'email'] }),login)
 UserRouter.get('/google/login/callback',passport.authenticate('google'))
 UserRouter.post('/api/login',passport.authenticate('login',{
    failureRedirect:'/fail.html',
    session:false
 }),login)
UserRouter.post('/api/signup',passport.authenticate('signup',{
    failureRedirect:'/fail.html',
    session:false
}),signUp)
UserRouter.get('/profile',loginPage)
UserRouter.post('/logout',logout)
UserRouter.put(`/users/:userId`,update)

module.exports=UserRouter

