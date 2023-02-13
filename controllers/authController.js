const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req,res){
        res.render('auth/login')
    }
    static register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){
        const {name, email, password, confirmpassword} = req.body
        // Pass match validation
        if(password!=confirmpassword){
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }
        const checkIfUserExists = await User.findOne({where: {email:email}})
        if(checkIfUserExists){
            req.flash('message', 'Esse email já está em uso, tente novamente!')
            res.render('auth/register')
            return
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)
        const user = {
            name,
            email,
            password: hashedPassword,
        }
        try{
            const createdUser = await User.create(user)
            // initialiaze session
            req.session.userid = createdUser.id

            req.flash('message', 'Usuário cadastrado com sucesso!')

            req.session.save(() => {
                res.redirect('/')    
            })
        } catch(err){
            console.log(err);
        }
    }
}