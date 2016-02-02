var express = require('express');
var controller = require('./admin.controller');


var router = express.Router();

router.get('/users', controller.users);
router.get('/dash', controller.dash);
router.get('/necesidades', controller.necesidades);


module.exports = router;
