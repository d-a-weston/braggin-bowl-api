const { Router } = require('express');
const Manager = require('../db/mysqlManager');

const router = Router();

// Get all events or event by ID
router.get('/:eventID?', (req, res, next) => {
  if(req.params.eventID) {
    Manager.getEventByID(req.params.eventID, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Manager.getAllEvents(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

// Add new event
// PARAM date_time "YYYY-MM-DD HH:MM:SS"
// PARAM location "Location of the event"
// PARAM tournamentID (OPTIONAL)
router.post('/', function(req, res, next) {
  Manager.addEvent(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

// Delete event by ID
router.delete('/:eventID', function(req, res, next) {
  Manager.deleteEvent(req.params.eventID, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

// Change an event by ID
// PARAM date_time "YYYY-MM-DD HH:MM:SS"
// PARAM location "Location of the event"
// PARAM tournamentID (Optional)
router.put('/:eventID', function(req, res, next) {
  Manager.updateEvent(req.params.eventID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

// Add an event and tournament
// PARAM date_time "YYYY-MM-DD HH:MM:SS"
// PARAM location "Location of the event"
// PARAM tournament_type "SWISS or DOUBLE_ELIM"
// PARAM game "Name of the game"
// PARAM modifiers "Any additional info about the game" (OPTIONAL)
// PARAM team_size "How many players per team" (DEFAULT 1)
// PARAM year "Year of the tournament"
// PARAM legal_tournament "YES or NO" (DEFAULT NO)
router.post('/tournament', function(req, res, next) {
  Manager.addEventAndTournament(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;
