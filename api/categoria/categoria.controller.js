var Categoria = require('./categoria.model');

exports.load = function (req,res) {

  var query = {
    orderBy:['prioridad']
  };

  Categoria.findAll(query)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar las categorias');
    });

};

exports.show = function (req,res) {

  var query = {
    where:{
      clave:req.params.clave
    }
  };
  Categoria.findOne(query)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar la categoría');
    });

};
