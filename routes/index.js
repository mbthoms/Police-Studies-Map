/**
 * Created by matthewthoms on 2016-04-15.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Home - Police Studies Map'
    });
});

module.exports = router;
