const passport = require('passport')
const User=require('../models/user')
require('../utils/passport')

const login = (req, res) => {
    try {
        req.session.user = req.user;
        req.login(req.user, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }
            if (!req.user) {
                console.log('user not found')
                return res.status(404).send('User not found');
            } else {
                return res.status(200).json(req.user);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};


const signUp=(req,res)=>{
try{
    res.status(200).send(req.user)
}catch(err){
    res.status(400).json(err)
}
}

const loginPage= async (req,res)=>{
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){

        const userId=req.session.passport.user
        const user=await User.findById(userId)
        console.log(user)
        res.json(user)
    }else{
        console.log('error')
        res.status(404).send('usuario no autenticado')
    }

}

const logout=(req,res)=>{
    req.session.destroy()
    res.send('logout')
}

const update=async (req,res)=>{
    try{
        const userId=req.params.userId
        const points=req.body.points
        console.log(userId,points)
        const user=await User.findById(userId)
        if(!user){
            return res.status(400).json({message:'Usuario no encontrado'})
        }

        user.points=points
        await user.save()
        return res.status(200).json({message:'Puntaje actualizado'})
    }catch(err){
        return res.status(500).json({message:'Error al actualizar'})
    }
}

module.exports={login,signUp,loginPage,logout,update}