CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20)NOT NULL,
    password VARCHAR(32)NOT NULL,
    user_attr VARCHAR(256) NOT NULL,
    create_date DATETIME NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users VALUES('', 'admin', 'admin', 'admin', now());