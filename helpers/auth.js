module.exports.checkAuth = (req,res,next) => {
    const userId = req.session.userid

    if(!userId){
        res.redirect('http://localhost:3000/auth/login')
    }
    next()
}