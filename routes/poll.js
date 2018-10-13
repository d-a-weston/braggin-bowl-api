const { Router } = require('express');
const Manager = require('../db/mysqlManager');

const router = Router();

// Get poll info for event
router.get('/:pollID?', function(req, res, next) {
  if(req.params.pollID) {
    Manager.getPollByID(req.params.pollID, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Manager.getAllPolls(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

// Get all polls for an event
router.get('/event/:eventID', function(req, res, next) {
  Manager.getPollByEvent(req.params.eventID, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  })
})

// Add poll for event
// PARAM result "Result" (DEFAULT NULL)
router.post('/:eventID', function(req, res, next) {
  Manager.addPoll(req.params.eventID, req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

// Delete poll for by id
router.delete('/:pollID', function(req, res, next) {
  Manager.deletePollByID(req.params.pollID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Modify poll for event
// PARAM eventID "eventID for the related event"
router.put('/:pollID', function(req, res, next) {
  Manager.updatePollByID(req.params.pollID, req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Get all options for a poll
router.get('/:pollID/options', function(req, res, next) {
  Manager.getAllOptionsByID(req.params.pollID, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

// Add option to pollID
// PARAM value "String of the option"
router.post('/:pollID/options', function(req, res, next) {
  Manager.addOptionToPollByID(req.params.pollID, req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Delete option by optionID
router.delete('/:pollID/options/:optionID', function (req, res, next) {
  Manager.deleteOptionByID(req.params.pollID, req.params.optionID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Update option by id
// PARAM value "String of the option"
router.put('/:pollID/options/:optionID', function(req, res, next) {
  Manager.updateOptionByID(req.params.pollID, req.params.optionID, req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Get all votes on current poll for event
router.get('/:pollID/votes', function(req, res, next) {
  Manager.getVoteByID(req.params.pollID, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

// Add vote to poll
// PARAM playerID 'playerID of voting player'
// PARAM vote 'optionID'
router.post('/:pollID/votes', function(req, res, next) {
  Manager.addVote(req.params.pollID, req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Delete vote on poll for player
router.delete('/:pollID/votes/:playerID', function(req, res, next) {
  Manager.deleteVote(req.params.pollID, req.params.playerID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Modify vote on poll for player
// PARAM playerID 'playerID of voting player'
// PARAM vote 'optionID'
router.put('/:pollID/votes/', function(req, res, next) {
  Manager.updateVote(req.params.pollID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
