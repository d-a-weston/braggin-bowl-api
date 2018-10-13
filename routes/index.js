const { Router } = require('express');
const player = require('./player');
const events = require('./events');
const poll = require('./poll');
const tournament = require('./tournament');
const organiser = require('./organiser');

const router = Router();

router.use('/player', player);
router.use('/events', events);
router.use('/poll', poll);
router.use('/tournament', tournament);
router.use('/organiser', organiser);

module.exports = router;
