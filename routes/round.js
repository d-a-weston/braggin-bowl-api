const { Router } = require('express');
const Manager = require('../db/mysqlManager');

const router = Router();

// Get all rounds by tournament
router.get('/:roundID/:tournamentID', (req, res, next) => {
/*
if everything is good
getRoundsByTournament(roundID, tournamentID)
*/
  Manager.getRoundsByTournament(req.params.roundID, req.params.tournamentID, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});


// Add new round
// PARAM tournamentID "the tounament the round is part of"
// PARAM round_num "the round number"
router.post('/', function(req, res, next) {
  /*
if everything is good
playerlist = getplayersByTournamentID
  ---(bracket creation pseudocode)---
  find number of teams and players on bi 
  shuffle playerlist

  create a round(tournamentID, round_num)

  for each team,
    create a team(roundID)
    for each player
      add teamID and playerID to plays_for
  
  create a team(roundID, bi=YES)
  for each player on bi
    add teamID and playerID to plays_for
*/
});

// Delete round by ID
router.delete('/:roundID', function(req, res, next) {
    /*
if everything is good
deleteRound(roundID)
*/
});

// Get playerID of all playing in Round
router.get('/:roundID/attending', function(req, res, next) {
      /*
if everything is good
getPlayersByRound(roundID)
*/
});

// Add attending playerID to Match
router.post('/:matchID/attending/:playerID', function(req, res, next) {
/*
if everything is good
addPlayerToRound(roundID, playerID)
*/
});






module.exports = router;