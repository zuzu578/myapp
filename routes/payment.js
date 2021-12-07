var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/payMent', function (req, res, next) {

    res.render('paymentPages/payMentSample.html');
});

router.get('/payMentSuccess', function (req, res, next) {

    res.render('paymentPages/payMentSuccess.html');
});

router.get('/payMentFail', function (req, res, next) {

    res.render('paymentPages/payMentFail.html');
});

module.exports = router;
