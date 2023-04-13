function auth(req,res,next) {
    if(req.session.status){
      next()
    }
    else{
      res.redirect('/login')
    }
  }

  module.exports= auth