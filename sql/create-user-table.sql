CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20)NOT NULL,
    password VARCHAR(32)NOT NULL,
    user_group TINYINT NOT NULL
    create_date DATETIMENOT NULL,
    PRIMARY KEY (id)
)
