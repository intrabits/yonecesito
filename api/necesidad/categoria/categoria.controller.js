var Categoria = require('./categoria.model');
var Necesidad = require('./../necesidad.model');

// jshint ignore:start
exports.load = async function (req,res) {



  try {
    let categoria = await Categoria.findOne({where:{clave:req.params.clave}});
    if(!categoria) throw 'No existe dicha categoría';

    let query = {
      where:{categoriaId:categoria.id},
      orderBy:['createdAt DESC']
    };
    let necesidades = await Necesidad.findAll(query);

    res.json({
      categoria:categoria,
      necesidades:necesidades
    });

  } catch (e) {
    console.error(e);
    res.status(500).send('Error al cargar las necesidades de esta categoría');
  }



};
// jshint ignore:end

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
