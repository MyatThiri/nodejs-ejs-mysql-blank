DROP SCHEMA db_blank;
DROP USER 'user_blank'@'localhost';

CREATE SCHEMA db_blank CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'user_blank'@'localhost' IDENTIFIED BY '12121212';
GRANT ALL PRIVILEGES ON `db\_blank`.*TO 'user_blank'@'localhost' WITH GRANT OPTION;

CREATE TABLE db_blank.users (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'USER',
  `inserted` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inserted_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (uid),
  UNIQUE INDEX email_UNIQUE (email ASC));
)
