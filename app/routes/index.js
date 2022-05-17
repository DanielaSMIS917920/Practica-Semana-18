var express = require('express');
var router = express.Router();
const data = require('../userData');
const methods = require('../methods')


//rutas
const registerRoute = "../views/pages/register";
const loginRoute = "../views/pages/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Programacion Computacional IV - Daniela Alvarez - SMIS917920' });
});

router.get('/home', function(req, res, next){
  res.render('home', ({title: "Bienvenidos"}))
});

router.get('/register', (req, res) =>{
  res.render(registerRoute);
})

router.get('/login', (req, res) =>{
  res.render(loginRoute);
})

router.post('/register', (req, res) =>{
  const {fullname, email, password, confirmpassword} = req.body;

  //verificar si el password coincide
  if (password === confirmpassword){
    //verificar si el correo esta registrado
    if(data.data.find(dat => dat.email === email)){
      res.render(registerRoute, {
        message: "Esta correo ya se encuentra registrado",
        messageClass: "alert-danger"
      });

    }
    //encriptamos la contraseña
    const hashedPassword = methods.getHashedPassWord(password);

    data.data.push({
      fullname,
      email,
      password: hashedPassword
    });
    res.render(loginRoute, {
      message: "El registro se a completado",
      messageClass: "alert-danger"
    })

  }else{
    res.render(registerRoute, {
      message: "La contraseña no coincide",
      messageClass: "alert-danger"
    })
  }

});

router.post('/login', (req, res) =>{
  const { email, password} = req.body;
  const hashedPassword = methods.getHashedPassWord(password);

  const dataUser = data.data.find(u=>{
    return u.email === email && hashedPassword === u.password;
  });

  if(dataUser){
    const authToken = methods.generateAuthToken();
    //almacenar el token de autenticacion
    methods.authTokens[authToken] = dataUser;
    res.cookie('AuthToken', authToken);
    res.redirect("/home");
  }else{
    res.render(loginRoute, {
      message: "Email y contraseña invalidos",
      messageClass: "alert-danger"
    });
  }
})
module.exports = router;
