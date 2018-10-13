const { Router } = require('express');
const Manager = require('../db/mysqlManager');

const router = Router();

// Get all tournaments or tournament by ID
router.get('/:tournamentID?', (req, res, next) => {
  if(req.params.tournamentID) {
    Manager.getTournamentByID(req.params.tournamentID, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Manager.getAllTournaments(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

// Add new tournament
// PARAM tournament_type "SWISS or DOUBLE_ELIM"
// PARAM game "Name of the game"
// PARAM modifiers "Any additional info about the game" (OPTIONAL)
// PARAM team_size "How many players per team" (DEFAULT 1)
// PARAM year "Year of the tournament"
// PARAM legal_tournament "YES or NO" (DEFAULT NO)
router.post('/', function(req, res, next) {
  Manager.addTournament(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

// Delete tournament by ID
router.delete('/:tournamentID', function(req, res, next) {
  Manager.deleteTournament(req.params.tournamentID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Change a tournament by ID
// PARAM tournament_type "SWISS or DOUBLE_ELIM"
// PARAM game "Name of the game"
// PARAM modifiers "Any additional info about the game" (OPTIONAL)
// PARAM team_size "How many players per team" (DEFAULT 1)
// PARAM year "Year of the tournament"
// PARAM legal_tournament "YES or NO" (DEFAULT NO)
router.put('/:tournamentID', function(req, res, next) {
  Manager.updateTournament(req.params.tournamentID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

// Get playerID of all attending tournamentID
router.get('/:tournamentID/attending', function(req, res, next) {
  Manager.getAttendingByTournament(req.params.tournamentID, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

// Add attending playerID to tournamentID
// Will also add eventID if it exists
router.post('/:tournamentID/attending/:playerID', function(req, res, next) {
  Manager.addAttendingByTournament(req.params.tournamentID, req.params.playerID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

module.exports = router;
