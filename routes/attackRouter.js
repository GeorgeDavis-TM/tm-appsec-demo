const { response } = require('express');
var express = require('express');
var router = express.Router();

const cmdDeploy = require('../services/cmd-services/cmd-services.js');

router.post('/cmd', function(req, res, next) {
    var resp = cmdDeploy.cmdExec()
    res.send(resp)
    //   res.send('Command run. Thank you.');
    //   console.log("Command executed.");
    // };
    // res.send('Command failed. Try again.');
  });

  router.post('/workloadAttack', function(req, res, next) {
    var resp = cmdDeploy.workloadAttackExec()
    res.send(resp)
    //   res.send('Command run. Thank you.');
    //   console.log("Command executed.");
    // };
    // res.send('Command failed. Try again.');
  });

module.exports = router;