const { Router } = require('express');
const Manager = require('../db/mysqlManager');

const router = Router();

// Get all rounds by tournament
router.get('/:tournamentID', (req, res, next) => {
  Manager.getRoundsByTournament(req.params.tournamentID, function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});


// Add new round
// PARAM tournamentID "the tounament the round is part of"
// PARAM round_num "the round number"
router.post('/', function(req, res, next) {

  var playerList;
  Manager.getAttendingByTournament(req.body.tournamentID,function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      playerList = rows;
    }
  });

  var tournament;
  Manager.getTournamentByID(req.body.tournamentID,function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      tournament = rows;
    }
  });

  // var roundInfo = [
  //   {
  //   "tournamentID": tournament.tournamentID,
  //   "round_num": 0,
  //   "is_complete": 'NO'
  //   }
  // ]

  // var round = Manager.addRoundToTournament(roundInfo, function(err, count) {
  //   if (err) {
  //     res.json(err);
  //   } else {
  //     res.json(req.body); //or return count for 1 & 0
  //   }
  // });

  // var currentIndex = playerList.length, temporaryValue, randomIndex, players_on_by, num_of_teams;

  // num_of_teams = Math.floor(playerList.length / tournament.teamSize);
  // players_on_by =  tournament.teamSize - (playerList.length % tournament.teamSize);

  // //Fisher-Yates (aka Knuth) Shuffle
  // // While there remain elements to shuffle...
  // while (0 !== currentIndex) {

  //   // Pick a remaining element...
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   currentIndex -= 1;

  //   // And swap it with the current element.
  //   temporaryValue = array[currentIndex];
  //   array[currentIndex] = array[randomIndex];
  //   array[randomIndex] = temporaryValue;
  // }

  // //Assign
  // for(var i=0; i < num_of_teams; i++){  //tracks team number "i"
  //     var team = Manager.addTeamToRound(tournament.tournamentID, round.roundId, function(err, count) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.json(req.body); //or return count for 1 & 0
  //       }
  //     });

  //     for(var k=(i*teamSize); k < teamSize; k++){
  //         //assign team[i] to player at playerList[k]
  //         Manager.addPlayerToTeam(playerlist[k], team.teamID, function(err, count) {
  //           if (err) {
  //             res.json(err);
  //           } else {
  //             res.json(req.body); //or return count for 1 & 0
  //           }
  //         });
  //     }
  // }

  // if(players_on_by > 0){
  //     for(var i=(playerList.length - players_on_by); i < playerList.length; i++){
  //         //assign player at playerList[i] to team and assign team a by
  //     }

  // }





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
  Manager.deleteRound(req.params.roundID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Get playerID of all playing in Round
router.get('/:roundID/attending', function(req, res, next) {
  Manager.getPlayersByRound(req.params.roundID, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});







module.exports = router;
