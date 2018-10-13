const { Router } = require('express');
const Manager = require('../db/mysqlManager');
const bcrypt = require('bcryptjs');

const router = Router();

router.get('/login', function(req, res, next) {
  Manager.getPlayerByGamertag(req.header('gamertag'), function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      bcrypt.compare(req.header('password'), rows[0].password, (err, result) => {
        if (result) {
          res.json(rows[0].playerID);
        } else {
          res.json(err)
        }
      });
    }
  });
});

router.get('/tag/:gamertag', function(req, res, next) {
  Manager.getPlayerByGamertag(req.params.gamertag, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows[0]);
    }
  });
});

// Get all players or player by ID
router.get('/:playerID?', (req, res, next) => {
  if(req.params.playerID) {
    Manager.getPlayerByID(req.params.playerID, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Manager.getAllPlayers(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

// Add new player
// PARAM gamertag "Gamertag of player"
// PARAM photo "Not sure how this'll work yet" (OPTIONAL)
router.post('/', function(req, res, next) {
  bcrypt.hash(req.body.password, 3, (err, hash) => {
    req.body.password = hash;

    Manager.addPlayer(req.body, function(err, count) {
      if (err) {
        res.json(err);
      } else {
        res.json(req.body); //or return count for 1 & 0
      }
    });
  });
});

// Delete player by ID
router.delete('/:playerID', function(req, res, next) {
  Manager.deletePlayer(req.params.playerID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Alter player by ID
// PARAM gamertag "Gamertag of player"
// PARAM photo "Not sure how this'll work yet" (OPTIONAL)
router.put('/:playerID', function(req, res, next) {
  Manager.updatePlayer(req.params.playerID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

// Find all events and tournaments player has/is attending
router.get('/:playerID/attending', function(req, res, next) {
  Manager.getAttendingByPlayer(req.params.playerID, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put('/:playerID/reset', function(req, res, next) {
  bcrypt.hash(req.header('password'), 3, (err, hash) => {
    Manager.updatePassword(req.params.playerID, hash, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });
});

module.exports = router;
