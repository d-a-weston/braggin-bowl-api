const { Router } = require('express');
const Manager = require('../db/mysqlManager');

const router = Router();


// Add team to round
// PARAM tournamentID 
// PARAM roundID
router.post('/', function(req, res, next) {
    Manager.addTeamToRound(req.body, function(err, count) {
      if (err) {
        res.json(err);
      } else {
        res.json(count);
      }
    });
  });

  // Add player to team
// PARAM playerID 
// PARAM teamID
router.post('/player/', function(req, res, next) {
    Manager.addPlayerToTeam(req.body, function(err, count) {
      if (err) {
        res.json(err);
      } else {
        res.json(count);
      }
    });
  });

  router.get('/:roundID', function(req, res, next) {
    Manager.getTeamsByRound(req.params.roundID, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });



  module.exports = router;