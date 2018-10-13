-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `voted`;
DROP TABLE IF EXISTS `attending`;
DROP TABLE IF EXISTS `poll`;
DROP TABLE IF EXISTS `tournament`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `team`;
DROP TABLE IF EXISTS `player`;
DROP TABLE IF EXISTS `plays_in`;
DROP TABLE IF EXISTS `plays_against`;
DROP TABLE IF EXISTS `poll_option`;
SET FOREIGN_KEY_CHECKS = 1;

-- ************************************** `player`
CREATE TABLE `player`
(
 `playerID` INT(10) NOT NULL AUTO_INCREMENT ,
 `gamertag` VARCHAR(20) NOT NULL UNIQUE,
 `photo`    BLOB ,

PRIMARY KEY (`playerID`)
);

-- ************************************** `tournament`
CREATE TABLE `tournament`
(
 `tournamentID`     INT(10) NOT NULL AUTO_INCREMENT ,
 `game`             VARCHAR(45) NOT NULL ,
 `modifiers`        VARCHAR(256) ,
 `team_size`        INT(10) DEFAULT 1,
 `tournament_type`  ENUM('SWISS', 'DOUBLE_ELIM') NOT NULL ,
 `year`             YEAR ,
 `legal_tournament` ENUM('YES', 'NO') DEFAULT 'NO' ,
 `current_round`    INT(10) DEFAULT 0 ,

PRIMARY KEY (`tournamentID`)
);

-- ************************************** `event`
CREATE TABLE `event`
(
 `eventID`      INT(10) NOT NULL AUTO_INCREMENT ,
 `tournamentID` INT(10) ,
 `date_time`    DATETIME NOT NULL ,
 `location`     VARCHAR(256) NOT NULL ,

PRIMARY KEY (`eventID`),
FOREIGN KEY (`tournamentID`) REFERENCES `tournament` (`tournamentID`)
  ON UPDATE CASCADE
);

-- ************************************** `attending`
CREATE TABLE `attending`
(
 `tournamentID` INT(10) ,
 `eventID`      INT(10) ,
 `playerID`     INT(10) ,

FOREIGN KEY (`tournamentID`) REFERENCES `tournament` (`tournamentID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`eventID`) REFERENCES `event` (`eventID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
  ON UPDATE CASCADE
);

-- ************************************** `poll`
CREATE TABLE `poll`
(
 `pollID`  INT(10) NOT NULL AUTO_INCREMENT ,
 `eventID` INT(10) NOT NULL ,
 `result`  INT(10) ,

PRIMARY KEY (`pollID`),
FOREIGN KEY (`eventID`) REFERENCES `event` (`eventID`)
  ON UPDATE CASCADE
);

-- ************************************** `poll_option`
CREATE TABLE `poll_option`
(
  `optionID` INT(10) NOT NULL AUTO_INCREMENT ,
  `pollID`   INT(10) NOT NULL ,
  `value`    VARCHAR(45) NOT NULL ,

PRIMARY KEY (`optionID`),
FOREIGN KEY (`pollID`) REFERENCES `poll` (`pollID`)
  ON UPDATE CASCADE
);

-- ************************************** `plays_against`
CREATE TABLE `plays_against`
(
  `tournamentID`  INT(10) ,
  `round`         INT(10) NOT NULL ,
  `player1`       INT(10) NOT NULL ,
  `player1_score` INT(10) ,
  `player2`       INT(10) NOT NULL ,
  `player2_score` INT(10) ,
  `validated`     ENUM('VALID','INVALID','UNCHECKED') DEFAULT 'UNCHECKED' ,

FOREIGN KEY (`tournamentID`) REFERENCES `tournament` (`tournamentID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`player1`) REFERENCES `player` (`playerID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`player2`) REFERENCES `player` (`playerID`)
  ON UPDATE CASCADE
);

-- ************************************** `plays_in`
CREATE TABLE `plays_in`
(
 `tournamentID`  INT(10) ,
 `playerID`      INT(10) ,
 `team`          INT(10) NOT NULL ,
 `score`         INT(10) ,
 `standing`      INT(10) ,

FOREIGN KEY (`tournamentID`) REFERENCES `tournament` (`tournamentID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
  ON UPDATE CASCADE
);

-- ************************************** `voted`
CREATE TABLE `voted`
(
 `pollID`   INT(10) NOT NULL ,
 `playerID` INT(10) NOT NULL ,
 `optionID` INT(10) NOT NULL ,

FOREIGN KEY (`pollID`) REFERENCES `poll` (`pollID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`optionID`) REFERENCES `poll_option` (`optionID`)
  ON UPDATE CASCADE
);

INSERT INTO player (gamertag) VALUES
('Bearfoot'),
('Apost4te'),
('Snarky@2am'),
('Gnipone'),
('xXDaveyXx'),
('X-Istenz');

INSERT INTO tournament (game, modifiers, team_size, tournament_type, year, legal_tournament) VALUES
('Tekken 7', 'No Eddies', 1, 'DOUBLE_ELIM', 2018, 'YES'),
('World of Warcraft', 2, '', 'SWISS', 2018, 'NO'),
('Pepsi-Man', 1, 'Emulator allowed', 'SWISS', 2019, 'YES');

INSERT INTO event (tournamentID, date_time, location) VALUES
(1, '2018-06-18 09:00:00', 'Snarky''s House'),
(2, '2018-07-08 07:00:00', 'Apost4te''s Fortress of Solitude'),
(3, '2018-09-22 11:00:00', 'In the Alley Behind the Burger King');

INSERT INTO attending (tournamentID, eventID, playerID) VALUES
(1, 1, (SELECT playerID FROM player WHERE gamertag='Bearfoot')),
(1, 1, (SELECT playerID FROM player WHERE gamertag='xXDaveyXx')),
(1, 1, (SELECT playerID FROM player WHERE gamertag='Snarky@2am')),
(2, 2, (SELECT playerID FROM player WHERE gamertag='Apost4te')),
(2, 2, (SELECT playerID FROM player WHERE gamertag='X-Istenz')),
(2, 2, (SELECT playerID FROM player WHERE gamertag='xXDaveyXx')),
(2, 2, (SELECT playerID FROM player WHERE gamertag='Gnipone'));

INSERT INTO plays_in (tournamentID, playerID, team, score, standing) VALUES
(1, 1, 1, 9, 1),
(1, 3, 2, 7, 2),
(1, 5, 3, 1, 3),
(2, 2, 1, 7, 1),
(2, 5, 1, 7, 1),
(2, 6, 2, 1, 2),
(2, 4, 2, 1, 2);

INSERT INTO plays_against (tournamentID, round, player1, player1_score, player2, player2_score, validated) VALUES
(1, 1, 1, 3, 3, 0, 'VALID'),
(1, 1, 3, 3, 5, 0, 'VALID'),
(1, 2, 1, 3, 5, 0, 'UNCHECKED'),
(2, 2, 2, 3, 6, 1, 'INVALID');

INSERT INTO poll (eventID, result) VALUES
(1, 1),
(2, 4),
(3, NULL);

INSERT INTO poll_option (pollID, value) VALUES
(1, 'Tekken 7'),
(1, 'Street Fighter'),
(1, 'Mortal Kombat'),
(2, 'World of Warcraft'),
(2, 'Archeage'),
(3, 'Settler''s of Catan'),
(3, 'Archipelago'),
(3, 'Sushi-Go');

INSERT INTO voted (pollID, playerID, optionID) VALUES
(1, 1, 1),
(1, 3, 1),
(1, 5, 2),
(2, 2, 4),
(2, 6, 4),
(2, 5, 4),
(2, 4, 5),
(3, 1, 6),
(3, 3, 6),
(3, 4, 8);
