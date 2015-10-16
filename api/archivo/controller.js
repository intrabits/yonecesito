'use strict';

var Archivo   = require('./model');
var sanitizer = require('sanitizer');
var moment    = require('moment');
var fs        = require('fs');
var colors    = require('colors');
var config    = require('./../../config/config.json');
var path      = require('path');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  var where = {};
  if (req.query.ref) {
    where = {
      where:{ref:req.query.ref}
    };
  }
  Archivo.all(where).then(function (data) {
    res.json(data);
  }).catch(function (err) {
    console.log(err);
    res.status(500).send('Error al cargar los archivos');
  });
};

exports.find = function  (req,res) {
  Archivo.all({where:{ref:req.query.ref}})
    .then(function  (data) {
      res.json(data);
    })
    .catch(function  (err) {
      console.log(err);
      res.status(500).send('Error al cargar los archivos');
    });
}

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {

  req.pipe(req.busboy);
  var dateFile = new Date();

  req.busboy.on('file', function (fieldname, file, filename,encoding, mimetype) {
    console.log('Peparandose para subir archivo');
    console.log(mimetype);
    if (mimetype=='image/png'||mimetype=='image/jpeg'||mimetype=='application/pdf') {
      dateFile = moment(dateFile);
      var path = "archivos/"+req.user.id+"_"+dateFile.format();
      switch (mimetype) {
        case 'image/png':
          path+='.png';
          break;
        case 'image/jpeg':
          path+='.jpg';
          break;
        case 'application/pdf':
          path+='.pdf';
          break;
        default:

      }
      var fstream = fs.createWriteStream(path);
      file.pipe(fstream);
      fstream.on('close', function () {
        console.log("Subiendo archivo");
        var data = {
          nombre:sanitizer.sanitize(filename),
          ruta:path,          
          userId:req.user.id
        };

        if (req.query.ref) {
          data.ref = sanitizer.sanitize(req.query.ref);
        }

        Archivo.create(data)
        .then(function (id) {
          res.json(id.id);
        }).catch(function (err) {
          console.log(err);
          res.status(500).send('Error al guardar el registro');
        });

      });
      fstream.on('error', function (err) {
        console.log('Error al subir el archivo'.red);
        console.log(err);
        res.status(500).send('Error al subir el archivo');
      });
    }else{
      res.status(500).send("Formato de archivo no válido");
    }

  });


};

/**
 * Get a single client
 */
exports.show = function (req, res, next) {
  Archivo.find({where:{id:req.params.id}})
    .then(function (data) {
      res.sendFile(path.join(__dirname, './../../',data.ruta));
    }).catch(function (err) {
      console.log(err);
      res.status(500).send('Error al abrir el archivo');
    });
};

exports.update = function (req, res, next) {
  console.log(req.params.id);
  Archivo.find({where:{id:req.params.id}})
  .then(function (Archivo) {
    if (Archivo) {
      var data = {
        nombre:sanitizer.sanitize(req.body.nombre),
        rfc:sanitizer.sanitize(req.body.rfc),
        razonSocial:sanitizer.sanitize(req.body.razonSocial)
      };

      Archivo.updateAttributes(data).then(function () {
        res.json("Listo");
      });
    } else {
      throw new Error("No existe ese Archivo");
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).send('Error al cargar el Archivo');
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Archivo.find(req.params.id).on('success', function(Archivo) {
    Archivo.destroy().then( function(u) {
        res.json('Listo');
    }).catch(function (err) {
      console.log(err);
      res.status(500).send("No se pudo eliminar");
    });
  })
  // User.findByIdAndRemove(req.params.id, function(err, user) {
  //   if(err) return res.send(500, err);
  //   return res.send(204);
  // });
};
