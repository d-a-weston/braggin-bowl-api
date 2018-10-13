const db = require('./mysqlConnector');

var Manager = {
  // Player db calls
  getAllPlayers: function(callback) {
    return db.query("SELECT * FROM player", callback);
  },
  getPlayerByID: function(playerID, callback) {
    return db.query("SELECT * FROM player WHERE playerID=?", [playerID], callback);
  },
  getPlayerByGamertag: function(gamertag, callback) {
    return db.query("SELECT * FROM player WHERE gamertag=?", [gamertag], callback);
  },
  addPlayer: function(playerInfo, callback) {
    return db.query("INSERT INTO player (gamertag, photo, name, tagline, password, salt) VALUES (?, ?, ?, ?, ?, ?)", [playerInfo.gamertag, playerInfo.photo, playerInfo.name, playerInfo.tagline, playerInfo.password, playerInfo.salt], callback);
  },
  deletePlayer: function(playerID, callback) {
    return db.query("DELETE FROM player WHERE playerID=?", [playerID], callback);
  },
  updatePlayer: function(playerID, playerInfo, callback) {
    return db.query("UPDATE player SET gamertag=?, photo=?, name=?, tagline=?, password=?, salt=? WHERE playerID=?", [playerInfo.gamertag, playerInfo.photo, playerInfo.name, playerInfo.tagline, playerInfo.password, playerInfo.salt, playerID], callback);
  },
  updatePassword: function(playerID, password, callback) {
    return db.query("UPDATE player SET password=? WHERE playerID=?", [password, playerID], callback);
  },

  // Tournament db calls
  getAllTournaments: function(callback) {
    return db.query("SELECT * FROM tournament", callback);
  },
  getTournamentByID: function(tournamentID, callback) {
    return db.query("SELECT * FROM tournament WHERE tournamentID=?", [tournamentID], callback);
  },
  addTournament: function(tournamentInfo, callback) {
    return db.query("INSERT INTO tournament (tournament_type, legal_tournament, game, modifiers, tournament_date, team_size, team_num) VALUES (?, ?, ?, ?, ?, ?, ?)", [tournamentInfo.tournament_type, tournamentInfo.legal_tournament, tournamentInfo.game, tournamentInfo.modifiers, tournamentInfo.tournament_date, tournamentInfo.team_size, tournamentInfo.team_num], callback);
  },
  deleteTournament: function(tournamentID, callback) {
    return db.query("DELETE FROM tournament WHERE tournamentID=?", [tournamentID], callback);
  },
  updateTournament: function(tournamentID, tournamentInfo, callback) {
    return db.query("UPDATE tournament SET tournament_type=?, legal_tournament=?, game=?, modifiers=?, tournament_date=?, current_round=?, team_size=?, team_num=? WHERE tournamentID=?", [tournamentInfo.tournament_type, tournamentInfo.legal_tournament, tournamentInfo.game, tournamentInfo.modifiers, tournamentInfo.tournament_date, tournamentInfo.current_round, tournamentInfo.team_size, tournamentInfo.team_num,  tournamentID], callback);
  },

  // Event db calls
  getAllEvents: function(callback) {
    return db.query("SELECT * from event", callback);
  },
  getEventByID: function(eventID, callback) {
    return db.query("SELECT * FROM event WHERE eventID=?", [eventID], callback);
  },
  addEvent: function(eventInfo, callback) {
    return db.query("INSERT INTO event (tournamentID, location) VALUES (?, ?)", [eventInfo.tournamentID, eventInfo.location], callback);
  },
  deleteEvent: function(eventID, callback) {
    return db.query("DELETE FROM event WHERE eventID=?", [eventID], callback);
  },
  updateEvent: function(eventID, eventInfo, callback) {
    return db.query("UPDATE event SET tournamentID=?, location=? WHERE eventID=?", [eventInfo.tournamentID, eventInfo.location, eventID], callback);
  },

  // Attending db calls
  getAllAttending: function(callback) {
    return db.query("SELECT * FROM plays_in", callback);
  },
  getAttendingByTournament: function(tournamentID, callback) {
    return db.query("SELECT playerID FROM plays_in WHERE tournamentID=?", [tournamentID], callback);
  },
  getAttendingByPlayer: function(playerID, callback) {
    return db.query("SELECT * FROM plays_in INNER JOIN tournament ON plays_in.tournamentID=tournament.tournamentID WHERE plays_in.playerID=?", [playerID], callback);
  },
  addAttendingByTournament: function(tournamentID, playerID, callback) {
    db.query("INSERT INTO plays_in (tournamentID, playerID) VALUES (?, ?)", [tournamentID, playerID], callback)
  },
  deleteAttendingByTournament: function(tournamentID, playerID, callback) {
    return db.query("UPDATE plays_in SET tournamentID=null WHERE tournamentID=? AND playerID=?", [tournamentID, playerID], callback);
  },

  // Poll functions and calls
  getAllPolls: function(callback) {
    return db.query("SELECT * FROM poll", callback);
  },
  getPollByID: function(pollID, callback) {
    return db.query("SELECT * FROM poll WHERE pollID=?", [pollID], callback);
  },
  getPollByEvent: function(eventID, callback) {
    return db.query("SELECT * FROM poll WHERE eventID=?", [eventID], callback);
  },
  addPoll: function(eventID, pollInfo, callback) {
    return db.query("INSERT INTO poll (eventID) VALUES (?)", [eventID], callback);
  },
  getAllOptionsByID: function(pollID, callback) {
    return db.query("SELECT * FROM poll_option WHERE pollID=?", [pollID], callback);
  },
  getAllOptionsByEvent: function(eventID, callback) {
    return db.query("SELECT * FROM poll_option WHERE pollID=(SELECT pollID FROM poll WHERE eventID=?)", [eventID], callback);
  },
  addOptionToPollByID: function(pollID, optionInfo, callback) {
    return db.query("INSERT INTO poll_option (pollID, value) VALUES (?, ?)", [pollID, optionInfo.value], callback);
  },
  addOptionToPollByEvent: function(eventID, optionInfo, callback) {
    return db.query("INSERT INTO poll_option (pollID, value) VALUES ((SELECT pollID FROM poll WHERE eventID=?), ?)", [eventID, optionInfo.value], callback);
  },
  deleteOptionByID: function(optionID, callback) {
    return db.query("DELETE FROM poll_option WHERE optionID=?", [optionID], callback);
  },
  updateOptionByID: function(pollID, optionID, optionInfo, callback) {
    return db.query("UPDATE poll_option SET value=? WHERE optionID=? AND pollID=?", [optionInfo.value, optionID, pollID], callback);
  },
  deletePollByID: function(pollID, optionID, callback) {
    return db.query("DELETE FROM poll WHERE pollID=? AND optionID=?", [pollID, optionID], callback);
  },
  deletePollByEvent: function(eventID, callback) {
    return db.query("DELETE FROM poll WHERE eventID=?", [eventID], callback);
  },
  updatePollByID: function(pollID, optionID, pollInfo, callback) {
    return db.query("UPDATE poll SET result=? WHERE pollID=? AND optionID=?", [pollInfo.result, pollID, optionID], callback);
  },
  updatePollByEvent: function(eventID, pollInfo, callback) {
    return db.query("UPDATE poll SET result=? WHERE eventID=?", [pollInfo.result, eventID], callback);
  },

  // Voting functions and calls
  getAllVotes: function(callback) {
    return db.query("SELECT * FROM voted", callback);
  },
  getVoteByPlayer: function(playerID, callback) {
    return db.query("SELECT * FROM voted WHERE playerID=?", [playerID], callback);
  },
  getVoteByID: function(pollID, callback) {
    return db.query("SELECT * FROM voted WHERE pollID=?", [pollID], callback);
  },
  addVote: function(pollID, playerID, optionID, callback) {
    return db.query("INSERT INTO voted VALUES (?, ?, ?)", [pollID, playerID, optionID], callback);
  },
  deleteVote: function(pollID, playerID, callback) {
    return db.query("DELETE FROM voted WHERE playerID=? AND pollID=?", [playerID, pollID], callback);
  },
  updateVote: function(pollID, playerID, optionID, callback) {
    return db.query("UPDATE voted SET optionID=? WHERE playerID=? AND pollID=?)", [optionID, playerID, pollID], callback);
  },

  //Organiser functions and calls

  // Helper functions
  addEventAndTournament: function(info, callback) {
    return db.query("INSERT INTO tournament (game, modifiers, team_size, tournament_type, year, legal_tournament) VALUES (?, ?, ?, ?, ?, ?)", [info.game, info.modifiers, info.team_size, info.tournament_type, info.year, info.legal_tournament], function (err, result) {
      db.query("INSERT INTO event (tournamentID, date_time, location) VALUES (?, ?, ?)", [result.insertId, info.date_time, info.location], callback);
    });
  }
}

module.exports = Manager;
