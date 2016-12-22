var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // Nothing here. Nothing at all
  res.json({"no": "thanks"});
});

router.get('/briefing', function(req, res, next) {
  res.render('briefing');
});

router.get('/secret', function(req, res, next) {
  res.render('secret');
});

router.post('/secret', function(req, res, next) {
  var passcode = req.body.passcode;

  var config = req.app.get('gameConfig');

  // Check if the password given matches the password that is configured
  if(passcode.toLowerCase() == config.WOPR_PASSWORD.toLowerCase()) {
    res.redirect('/abort-launch');
  }
  res.render('secret', { title: 'Login', loginFailed: true });
});

router.get('/abort-launch', function(req, res, next) {
  res.render('abort-launch', { title: 'Aborting launch' });
});

router.get('/wopr', function(req, res, next) {
  res.render('wopr');
});

router.get('/sponsored-by-donald-trump', function(req, res, next) {
  res.render('the-end', { title: 'The end' });
});

router.get('/config', function(req, res, next) {
  // render the config
  res.json(req.app.get('gameConfig'));
});


module.exports = router;
