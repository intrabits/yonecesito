var Necesidad = require('./necesidad.model');
var User = require('./../user/user.model');
var Categoria = require('./categoria/categoria.model');
var Comentario = require('./comentario/comentario.model');
var colors = require('colors');
var shortId = require('shortid');
var fs = require('fs');
var Jimp = require('jimp');

exports.load = function (req,res) {

  var query = {
    orderBy:['fecha DESC']
  };

  Necesidad.findAll(query)
    .map(function (nec) {
      return User.findById(nec.userId).then(function (user) {
        nec = nec.dataValues;
        nec.user = user.dataValues;
        return nec;
      });
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar las necesidades');
    });

};

exports.create = function (req,res) {

  if (!req.body.categoriaId) {
    req.body.categoriaId = 3;  // si no tiene una categoría entonces lo mandamos a "otros"
  }

  var data = {
    titulo:req.body.titulo,
    userId:req.user.id,
    categoriaId:req.body.categoriaId
  };

  console.log('Agregando necesidad'.yellow);
  Necesidad.create(data)
    .then(function (data) {

      res.send(String(data.id));
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al dar de alta la necesidad :/');
    })

};

exports.update = function (req,res) {

  if (!req.body.categoriaId) {
    req.body.categoriaId = 3;  // si no tiene una categoría entonces lo mandamos a "otros"
  }

  console.log(req.user.name, ' está actualizando una necesidad'.yellow);
  Necesidad.findOne({where:{
    id:req.params.id,
    userId:req.user.id  // comprobamos que sea el dueño :)
  }})
    .then(function (data) {

      data.titulo = req.body.titulo;
      data.categoriaId = req.body.categoriaId;
      data.descripcion = req.body.descripcion;
      return data.save()
    })
    .then(function (data) {
      res.send('Necesidad actualizada correctamente');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al actualizar la necesidad :/');
    })

};

exports.show = function (req,res) {

  Necesidad.findById(req.params.id)
    .then(function (data) {
      data = data.dataValues;
      return Categoria.findById(data.categoriaId)
        .then(function (cat) {
          data.categoria = cat;
          return data;
        });
    })
    .then(function (data) {
      return User.findById(data.userId)
        .then(function (user) {
          data.user = user;
          return data;
        });
    })
    .then(function (data) {
      return Comentario.findAll({where:{necesidadId:data.id}})
        .then(function (comentarios) {
          data.comentarios = comentarios;
          return data;
        });
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar la necesidad');
    });

};

exports.upload = function (req,res) {



  Necesidad.findOne({where:{id:req.params.id,userId:req.user.id}})
    .then(function (necesidad) {
      console.log(req.user.name,' está subiendo una imagen para: ',necesidad.titulo);
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename,encoding, mimetype) {
        console.log('Peparandose para subir archivo');
        console.log(mimetype);
        if (mimetype==='image/png'||mimetype==='image/jpeg'||mimetype==='application/pdf') {
          var name = shortId.generate() + '_' + filename;
          var path = 'public/necesidades/full/' + name;
          var pathThumb = 'public/necesidades/thumbs/' + name;

          var fstream = fs.createWriteStream(path);
          file.pipe(fstream);
          fstream.on('close', function () {
            console.log('Subiendo archivo');

            // una vez subido el archivo procedemos  a crearle un thumbnail
            var lenna = new Jimp(path, function (err, image) {
              if (err) {
                return console.error(err);
              }

              this.resize(600,Jimp.AUTO) // resize
                  .crop(0, 0, 250, 250) // crop
                  .write(pathThumb); // guardar thumbnail

              necesidad.thumb = '/necesidades/thumbs/' + name;
              necesidad.foto = '/necesidades/full/' + name;
              necesidad.save()
                .then(function (data) {
                  res.send('Imagen guardada correctamente');
                })
                .catch(function (err) {
                  console.error(err);
                  res.status(500).send('Error al guardar la imagen');
                });
            });
          });

          fstream.on('error', function (err) {
            console.log('Error al subir el archivo'.red);
            console.log(err);
            res.status(500).send('Error al subir el archivo');
          });
        }else{
          res.status(500).send('Formato de archivo no válido');
        }

      });

    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar la imagen');
    });

};

exports.delete = function (req,res) {


  Necesidad.destroy({where:{id:req.params.id,userId:req.user.id}})
    .then(function (data) {
      console.log('Eliminando necesidad'.yellow);
      res.send('Necesidad eliminada correctamente');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al eliminar la necesidad');
    });

}
