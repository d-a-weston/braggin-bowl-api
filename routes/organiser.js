const { Router } = require('express');
const Manager = require('../db/mysqlManager');

const router = Router();

// Start a tournament with attendees
router.post('/', (req, res, next) => {
  res.json("Organiser Test.");
});

module.exports = router;
