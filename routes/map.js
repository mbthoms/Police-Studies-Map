var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) {
    res.render('map', { title: 'Map - Police Studies Map' });
});

module.exports = router;