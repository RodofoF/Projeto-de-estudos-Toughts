const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { use } = require('../routes/authRoutes')

module.exports = class AuthController {

    static login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        const {email, password} = req.body

        // validações
        // find user
        const user = await User.findOne({where: {email:email}})
        if(!user){
            req.flash('message', 'Email não cadastrado, crie uma contar')
            res.render('auth/login')
            return
        }
        // check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch){
            req.flash('message', 'Email ou senha não conferem com o banco de dados!')
            res.render('auth/login')
            return
        }
        // initialize session
        req.session.userid = user.id

        req.flash('message', 'Login feito com sucesso!')

        req.session.save(() => {
            res.redirect('/')    
        })
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
    static logout(req,res){
        req.session.destroy()
        res.redirect('/')
    }
}