-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

CREATE TABLE `Answers` (
  `question_id` INTEGER NULL DEFAULT NULL,
  `answer_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `body` INTEGER NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `answerer_name` VARCHAR NULL DEFAULT NULL,
  `helpfulness` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`)
);

-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS `Questions`;

CREATE TABLE `Questions` (
  `product_id` INTEGER NULL DEFAULT NULL,
  `question_id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `question_body` DATE NULL DEFAULT NULL,
  `question_date` DATE NULL DEFAULT NULL,
  `asker_name` VARCHAR NULL DEFAULT NULL,
  `question_helpfulness` INTEGER NULL DEFAULT NULL,
  `reported` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`question_id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `answer_id` INTEGER NULL DEFAULT NULL,
  `photos` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY ()
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Answers` ADD FOREIGN KEY (question_id) REFERENCES `Questions` (`question_id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (answer_id) REFERENCES `Answers` (`answer_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Answers` (`question_id`,`answer_id`,`body`,`date`,`answerer_name`,`helpfulness`) VALUES
-- ('','','','','','');
-- INSERT INTO `Questions` (`product_id`,`question_id`,`question_body`,`question_date`,`asker_name`,`question_helpfulness`,`reported`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Photos` (`answer_id`,`photos`) VALUES
-- ('','');