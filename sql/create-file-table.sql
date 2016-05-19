CREATE TABLE files (
    id INT NOT NULL AUTO_INCREMENT,
    file_dir VARCHAR(128) NOT NULL,
    file_name VARCHAR(64) NOT NULL,
    enc_time VARCHAR(20) NOT NULL,
    dec_time VARCHAR(20) NOT NULL,
    upload_time DATETIME NOT NULL,
    attr_tree VARCHAR(1024) NOT NUll,
    size CHAR(10) NOT NULL,
    PRIMARY KEY (id)
);
