-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `player`;
DROP TABLE IF EXISTS `tournament`;
DROP TABLE IF EXISTS `round`;
DROP TABLE IF EXISTS `team`;
DROP TABLE IF EXISTS `plays_in`;
DROP TABLE IF EXISTS `plays_for`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `poll`;
DROP TABLE IF EXISTS `poll_option`;
DROP TABLE IF EXISTS `voted`;
SET FOREIGN_KEY_CHECKS = 1;

-- ************************************** `player`
CREATE TABLE `player`
(
 `playerID` INT(10) NOT NULL AUTO_INCREMENT ,
 `gamertag` VARCHAR(20) NOT NULL UNIQUE ,
 `photo`    BLOB ,
 `name`     VARCHAR(50) ,
 `tagline`  VARCHAR(50) ,
 `password` VARCHAR(512) NOT NULL ,
 `salt`     VARCHAR(512) NOT NULL ,

PRIMARY KEY (`playerID`)
);

-- ************************************** `tournament`
CREATE TABLE `tournament`
(
 `tournamentID`     INT(10) NOT NULL AUTO_INCREMENT ,
 `tournament_type`  ENUM('SWISS', 'DOUBLE_ELIM') NOT NULL ,
 `legal_tournament` ENUM('YES', 'NO') DEFAULT 'NO' ,
 `game`             VARCHAR(45) NOT NULL ,
 `modifiers`        VARCHAR(256) ,
 `tournament_date`  DATETIME NOT NULL ,
 `current_round`    INT(10) NOT NULL DEFAULT 0 ,
 `team_size`        INT(10) NOT NULL DEFAULT 1 ,
 `team_num`         INT(10) NOT NULL ,
  /* may need an 'is_complete' column*/
PRIMARY KEY (`tournamentID`)
);

-- ************************************** `round`
CREATE TABLE `round`
(
 `roundID`      INT(10) NOT NULL AUTO_INCREMENT ,
 `tournamentID` INT(10) NOT NULL ,
 `round_num`        INT(10) ,
 `is_complete`  ENUM('YES','NO','INVALID') DEFAULT 'NO' ,

PRIMARY KEY (`roundID`),
FOREIGN KEY (`tournamentID`) REFERENCES `tournament` (`tournamentID`)
  ON UPDATE CASCADE
);

-- ************************************** `team`
CREATE TABLE `team`
(
 `teamID`  INT(10) NOT NULL AUTO_INCREMENT ,
 `roundID` INT(10) NOT NULL ,
 `score`   INT(10) ,
 `bi`      ENUM('YES','NO') DEFAULT 'NO' ,

PRIMARY KEY (`teamID`),
FOREIGN KEY (`roundID`) REFERENCES `round` (`roundID`)
  ON UPDATE CASCADE
);

-- ************************************** `plays_in`
CREATE TABLE `plays_in`
(
 `tournamentID`  INT(10) ,
 `playerID`      INT(10) ,
 `score`         INT(10) DEFAULT 0 ,

FOREIGN KEY (`tournamentID`) REFERENCES `tournament` (`tournamentID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
  ON UPDATE CASCADE
);

-- ************************************** `plays_for`
CREATE TABLE `plays_for`
(
  `teamID`    INT(10) NOT NULL ,
  `playerID`  INT(10) NOT NULL ,

  FOREIGN KEY (`teamID`) REFERENCES `team` (`teamID`)
    ON UPDATE CASCADE,
  FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
    ON UPDATE CASCADE
);

-- ************************************** `event`
CREATE TABLE `event`
(
 `eventID`      INT(10) NOT NULL AUTO_INCREMENT ,
 `tournamentID` INT(10) ,
 `location`     VARCHAR(256) NOT NULL ,

PRIMARY KEY (`eventID`),
FOREIGN KEY (`tournamentID`) REFERENCES `tournament` (`tournamentID`)
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

-- ************************************** `voted`
CREATE TABLE `voted`
(
 `playerID` INT(10) NOT NULL ,
 `optionID` INT(10) NOT NULL ,

FOREIGN KEY (`playerID`) REFERENCES `player` (`playerID`)
  ON UPDATE CASCADE,
FOREIGN KEY (`optionID`) REFERENCES `poll_option` (`optionID`)
  ON UPDATE CASCADE
);

INSERT INTO player (gamertag, photo, name, tagline, password, salt) VALUES
('Bearfoot', NULL, 'Daniel', 'Bust-a-move!', '$2a$04$oPpWZ9w8UjuKmESD4oGwauV0a.zhwBBZkyKcH7BCZTks4.rn7rCWC', '12345'),
('Apostate', NULL, 'Cal', 'For the Horde!', '$2a$04$3qqwAUMJOj4CVFAfe.0LxO3Ssm9Ke/Hh.BVixoXtuAr2lho67ls3a', '12345'),
('Snarky@2am', NULL, 'Carl', 'Raven is best girl.', '$2a$04$7rydjMSDucW7xmwwhPo4B.Zmm.D4zLzxmuBAzLnRw87v9tuiVpZFC', '12345'),
('Deagles', NULL, 'David', 'Thanks, I hate it...', '$2a$04$gqfSu0uPkHPVydUgeM07m.cwJl7SA0ZtE.NHVYqKEwXpXxqVT0BzO', '12345'),
('X-Istenz', NULL, 'Rowan', 'The enforcer life', '$2a$04$H9Pv7fbgtt3dVIy4leKT9.TWc9TG7YqtEwfU6RIuTRr/7RwZVUlEy', '12345'),
('Gnipone', NULL, 'Steve', '11 Catan wins and counting', '$2a$04$LIQ6Vr.9zhCVEm28l8tfpeoghz0obokOPbUbp3JerPPCqEWKmK0wW', '12345');

INSERT INTO tournament (tournament_type, legal_tournament, game, modifiers, tournament_date, team_size, team_num) VALUES
('SWISS', 'YES', 'Tekken 7', 'No Eddies', '2018-10-18 09:00:00', 1, 4),
('DOUBLE_ELIM', 'YES', 'World of Warcraft', 'Arena Duo''s', '2018-10-22 09:00:00', 2, 3),
('SWISS', 'NO', 'Pepsi-man', 'Emulators allowed', '2018-10-25 09:00:00', 1, 6);

INSERT INTO round (tournamentID, round_num, is_complete) VALUES
(1, 1, 'YES'),
(1, 1, 'YES'),
(1, 2, 'YES'),
(2, 1, 'NO'),
(2, 1, 'NO');

INSERT INTO team (roundID, score, bi) VALUES
(1, 3, 'NO'),
(1, 0, 'NO'),
(2, 2, 'NO'),
(2, 1, 'NO'),
(3, 3, 'NO'),
(3, 0, 'NO'),
(4, 2, 'NO'),
(4, 1, 'NO'),
(5, 3, 'YES');

INSERT INTO plays_in (tournamentID, playerID, score) VALUES
(1, 1, 6),
(1, 2, 3),
(1, 3, 2),
(1, 4, 1),
(2, 1, 5),
(2, 2, 5),
(2, 4, 5),
(2, 5, 5);

INSERT INTO plays_for (teamID, playerID) VALUES
(1, 1),
(3, 1),
(4, 1),
(2, 3),
(5, 3);

INSERT INTO event (tournamentID, location) VALUES
(1, 'Dan''s house'),
(3, 'Cal''s House');

INSERT INTO poll (eventID, result) VALUES
(1, 1),
(2, NULL);

INSERT INTO poll_option (pollID, value) VALUES
(1, 'Tekken 7'),
(1, 'Street Fighter'),
(1, 'Mortal Kombat'),
(2, 'World of Warcraft'),
(2, 'Archeage');

INSERT INTO voted (playerID, optionID) VALUES
(1, 1),
(3, 1),
(5, 2),
(2, 4),
(6, 4),
(5, 4),
(4, 5);
