var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var async   = require('async');
var busboy  = require('connect-busboy');
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
var transporter     = config.transporter;

//  Modelos
var User    = require('./../models/user.js');
var Contact  = require('./../models/contact.js');

//  Librerías
var Lib     = require('./../lib/index.js');
var gm      = require('gm').subClass({ imageMagick: true });
var moment = require('moment');
var generatePassword = require('password-generator');
var sanitizer = require('sanitizer');



router.get('/profile', ensureAuthenticated, function(req, res){
    User.profile(req.user.user_id,function (err, data) {
        if (err) {
            res.status(500).send("Error al cargar tus datos");
            console.log(err);}
        else{
            res.json(data);
        }
    });
});

router.get('/plan', ensureAuthenticated, function(req, res){
  User.plan(req.user.user_id,function (err, data) {
    if (err) {
      res.status(500).send("Error al cargar tus datos");
      console.log(err);}
      else{
        res.json(data);
      }
    });
  });

router.get('/plans', ensureAuthenticated, function(req, res){
  User.plans(function (err, data) {
    if (err) {
      res.status(500).send("Error al cargar los planes");
      console.log(err);}
      else{
        res.json(data);
      }
    });
  });

router.post('/upload', ensureAuthenticated,function(req, res) {
    var fstream;



    try {

        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename,encoding, mimetype) {

          if (mimetype=='image/png'||mimetype=='image/jpeg') {

            var date = moment().format('YYYY-MM-DD_HH:mm:ss');
            var formato;
            // if (mimetype=='image/png') {formato='.png';}
            // else{formato='.jpeg'}

            //  Usamos este formato porque es el que no da problemas al agregar la imagen al PDF
            formato = '.jpeg';

            var name = req.user.user_id+"_"+ date + formato;

            var path = 'images/users/' + filename;
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream("public/" + path);
            file.pipe(fstream);
            fstream.on('close', function () {
                gm("public/"+path)
                  .resize(250,250,"^>")
                  .gravity('Center')
                  .setFormat('jpeg')
                  .write("public/images/users/profiles/"+ name, function (error) {
                    if (error) console.log('Error - ', error)
                    else console.log("imagen recortada");
                  });
                User.picture("images/users/profiles/"+ name,req.user.user_id,function (err, data) {
                    if (err) {
                        res.send(500);
                        console.log(err);}
                    else{
                        res.json('OK');
                    }

                });
            });

          }else{
            res.send(500,"Formato inválido, solo archivos PNG o JPG");
          }

        });
    } catch (e) {
        console.log(e);
        res.send(500);
    }


});


router.get('/nick/:nick', function(req, res){
    User.nick(req.params.nick,function (err, data) {
        if (err) {console.log(err);}
        else{
            if (data) {
                res.json(data);
            } else{
                res.json('');
            }

        }
    });
});

router.post('/password', function(req, res){
    async.waterfall([
      function (done) {
        User.exist({'user_email':req.body.user_email},function (err,data) {
          if (err) {
            done(err);
          } else {
            done(null,data);
          }
        });
      },function (data,done) {
        if (data) {
          //  si el usuario existe
          var new_password = generatePassword();
          Lib.cryptPassword(new_password, function (err, pass) {
              if (err) {
                  done(err);
              } else{
                  done(null,pass,new_password);
              }
          });

        } else {
          done("Email incorrecto");
        }
      },function (pass,new_password,done) {
        // Actualizamos en la BD el password del usuario
        User.update2({'user_password':pass},{'user_email':req.body.user_email},function (err, data) {

            if (err) {
                done(err);
            } else{
                done(null,new_password);
            }
        });
      },function (new_password,done) {
        var mailOptions = {
            from: 'WebeGerente ✔ <no-reply@webegerente.com>', // sender address
            to: req.body.user_email, // list of receivers
            subject: 'WebeGerente - Nueva contraseña de acceso', // Subject line
            text: config.emailWGHeader+'<p style="color: #5C5C5C; font-family: \'Helvetica Neue\', \'Arial\', sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 14px; margin: 0; padding: 0 0 35px;" align="left">Tu nueva contraseña para iniciar sesión en WebeGerente es : '+ new_password+'</p>' +config.emailWGFooter,// html body
            html: config.emailWGHeader+'<p style="color: #5C5C5C; font-family: \'Helvetica Neue\', \'Arial\', sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 14px; margin: 0; padding: 0 0 35px;" align="left">Tu nueva contraseña para iniciar sesión en WebeGerente es : '+ new_password+'</p>' +config.emailWGFooter// html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                done(err);
            }else{
                console.log('Message sent: ' + info.response);
                done(null,info);
            }
        });
      }
      ],function (err,data) {
        if (err) {
          console.log(err);
          res.send(500,"Ocurrió un error, intenta de nuevo más tarde");
        } else {
          console.log(data);
          res.send("Se ha enviado una nueva contraseña a tu cuenta de correo");
        }
      });

});

router.post('/add',function (req, res) {
    //  Revisamos que haya información que agregar
    var error;
    async.waterfall([
      function (callback) {
        //  Verificamos que el email NO esté registrado
        User.emailTaken(req.body.user_email,function (err,existe) {
          if (err) {
            console.log(err);
            callback("Error al crear el usuario");
          } else {
            if (existe>0) {
              res.redirect('/login?err=2');
              callback(error);
            }else{
              callback();
            }
          }
        });
      },function (done) {
        //  Encriptamos la contraseña
        Lib.cryptPassword(req.body.user_password,function (err,data) {
          if (err) {
            console.log(err);
            done("Error al crear el usuario");
          } else {
            done(null,data);
          }
        });
      },function (cryptPassword,done) {
        //  Crear usuario
        var user = {
          user_email:     sanitizer.sanitize(req.body.user_email),
          user_name:      sanitizer.sanitize(req.body.user_name),
          user_surname:   sanitizer.sanitize(req.body.user_surname),
          user_nick:      sanitizer.sanitize(req.body.user_nick),
          user_password: cryptPassword
        };

        User.create(user,function (err, insertedID) {
            console.log(insertedID);
            if (err) {
              console.log(err);
              done("Error al crear el usuario");
            }else{
                console.log('User added to DB: '+req.body.user_email + ", UserID: " + insertedID);

                //  Agregamos grupos para el usuario
                user.user_id = insertedID;
                done(null,user);
                Contact.addGroup('Amigos',insertedID,function (err, data) {
                    if (err) {console.log(err);}});
                Contact.addGroup('Compañeros de trabajo',insertedID,function (err, data) {
                    if (err) {console.log(err);}});
                Contact.addGroup('Familia',insertedID,function (err, data) {
                    if (err) {console.log(err);}});

            }

        });

      },function (user,done) {
        //  Enviar correo
        console.log("Enviando correo");
        var emailContent;
        var fake_id = user.user_id * 18037; //  Hacemos esto para que no sea obvio el ID del usuario y cómo validarlo... pero lo ideal sería encriptarlo totaaaalmente
        var enlace = config.domain+"api/user/validate/"+fake_id;

        emailContent = config.emailWGHeader;
        emailContent += "<h1>Bienvenido a Webe Gerente</h1>";
        emailContent += "<p class=\"instructions\" style=\"color: #222222; font-family: 'Helvetica Neue', 'Arial', sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 10px 0 30px;\" >Gracias por registrarte, para verificar tu cuenta debes ingresar al siguiente enlace, si no puedes ingresar copia y pega el enlace en tu navegador.</p>";
        emailContent += '<center style="width: 100%; min-width: 580px;"><table class="button verify-button" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; width: 200px; overflow: hidden; padding: 0;"><tr style="vertical-align: top; text-align: left; padding: 0;" align="left"><td style="word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; border-collapse: collapse !important; vertical-align: top; text-align: center; color: #ffffff; font-family: \'Helvetica Neue\', \'Arial\', sans-serif; font-weight: normal;line-height: 19px; font-size: 14px; display: block; width: auto !important; border-radius: 4px; background: #48A4CF; margin: 0;padding: 13px 0 12px;" align="center" bgcolor="#48A4CF" valign="top"><a href="'+enlace+'" style="color: #ffffff; text-decoration: none;font-weight: bold; font-family: Helvetica, Arial, sans-serif; font-size: 15px;">Verificar tu cuenta</a></td></tr></table></center>';
        emailContent += "<p class=\"instructions\" style=\"color: #222222; font-family: 'Helvetica Neue', 'Arial', sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 10px 0 30px;\" >Si usted no se registró a WebeGerente por favor ignore este mensaje.</p>";
        emailContent += "<p class=\"instructions\" style=\"color: #222222; font-family: 'Helvetica Neue', 'Arial', sans-serif; font-weight: normal; text-align: left; line-height: 19px; font-size: 14px; margin: 0 0 10px; padding: 10px 0 30px;\" >Webegerente.</p>";
        // emailContent += "<a href='"+enlace+"'>"+enlace+"</a>";
        emailContent += config.emailWGFooter;

        var mailOptions = {
          from: 'WebeGerente ✔ <registros@webegerente.com>', // sender address
          to: user.user_email, // list of receivers
          subject: 'Activar cuenta de WebeGerente', // Subject line
          text: 'Bienvenido a WebeGerente, para verificar tu cuenta debes de ingresar al siguiente enlace: ' + enlace,
          html: emailContent // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
              User.deleteByEmail(user.user_email,function (err) {
                if(err) console.log(err);
              });
              console.log(error);
              done("Error al enviar el correo de activación");
            }else{
              console.log("Mensaje enviado");
              console.log(info);
              done(null,user);
            }
        });
      },function (user,done) {
        //  Loguear usuario
        console.log("Logueando al usuario: "+user.user_email+":"+user.user_password);
        User.login(user.user_email,req.body.user_password,function (err,profile) {
            if (err) {
                console.log("Error de DB al loguear al usuario");
                User.deleteByEmail(user.user_email);
                console.log(err);
                done(err)
            } else{
                req.logIn(profile, function(err) {
                  if (err) {
                    console.log(err);
                    //  Si hay algún error borramos la cuenta para evitar que el usuario después vaya a tener problemas al registrarse nuevamente
                    User.deleteByEmail(user.user_email);
                    done("Error al crear el usuario");
                  }else{
                    done();
                  }
                });
            }
        });
      }
      ],function (err,data) {
        if (err) {

          console.log(err);
          err = Lib.encrypt(config.cryptKey,err);
          res.redirect('/signup?err='+err);
        } else {
          res.redirect('/');
        }
      });
});

router.get('/validate/:fake_id',function (req,res) {
  var fake_id = req.params.fake_id;

  var user_id = fake_id / 18037; // usamos este número porque es el que usamos al crear el fake_id
  User.activate(user_id,function (err,data) {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      req.user.user_checked = 1;
      res.redirect('/');
    }
  });
});


router.post('/edit',ensureAuthenticated,function (req, res) {
    //  Revisamos que haya información que agregar
    if (req.body.user_name && req.body.user_email) {
        var birthday = req.body.user_birthday;
        birthday = birthday.split('T');
        birthday = birthday[0];
        data = {
            user_name:      sanitizer.sanitize(req.body.user_name),
            user_surname:   sanitizer.sanitize(req.body.user_surname),
            user_nick:      sanitizer.sanitize(req.body.user_nick),
            user_birthday:  birthday,
            user_address:   sanitizer.sanitize(req.body.user_address),
            user_phone:     sanitizer.sanitize(req.body.user_phone),
            user_mobile:    sanitizer.sanitize(req.body.user_mobile),
            user_business_name:   sanitizer.sanitize(req.body.user_business_name),
            user_business_phone:  sanitizer.sanitize(req.body.user_business_phone),
            user_business_address:sanitizer.sanitize(req.body.user_business_address),
            user_business_website:sanitizer.sanitize(req.body.user_business_website),
            user_signature: req.body.user_signature
        }
        console.log(data);

        User.update(data,req.user.user_id,function (err, data) {
            if (err) {
                console.log(error);
                console.log(err);}
            else{
                console.log(data);
                res.json('OK');
            };
        });
    }else{
        res.send(500);
    }

});

router.post('/editPass',ensureAuthenticated,function (req, res) {

    //  Revisamos que hayan enviado TODA la info necesaria
    console.log(req.body.new_password);
    if (req.body.old_password && req.body.new_password) {
        console.log("Información llegó");

        User.updatePass(req.body.old_password,req.body.new_password,req.user.user_id,function (err, data) {
            if (err) {
                res.send(500);
                console.log(err);}
            else{
                console.log("En teoría ya están editadas"+data);
                res.json('OK');
            }
        });
    }else{
        console.log("No esta toda la info");
        res.send(500);
    }

});

router.post('/pay',ensureAuthenticated,function (req,res) {
  console.log(req.user.user_email+" está intentando comprar un paquete");
  res.send('ok');
});

router.get('/groups',ensureAuthenticated,function (req, res) {
    Contact.groups(req.user.user_id, function (err, data) {
        if (err) {console.log(err);}
        else{
            res.json(data);
        }
    });
});

module.exports = router;
