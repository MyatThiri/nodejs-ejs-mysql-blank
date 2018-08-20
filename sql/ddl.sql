DROP SCHEMA db_blank;
DROP USER 'user_blank'@'localhost';

CREATE SCHEMA db_blank CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'user_blank'@'localhost' IDENTIFIED BY 'Zikimi95';
GRANT ALL PRIVILEGES ON db\_blank.*TO 'user_blank'@'localhost' WITH GRANT OPTION;

CREATE TABLE db_blank.users (
  uid INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(45) NOT NULL,
  role VARCHAR(5) NOT NULL DEFAULT 'USER',
  inserted DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  insertedby DATETIME NULL,
  updatedby DATETIME NULL,
  PRIMARY KEY (uid),
  UNIQUE INDEX uid_UNIQUE (uid ASC));
