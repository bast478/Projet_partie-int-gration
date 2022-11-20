-- mariadb

CREATE TABLE admin (
admin_id int NOT NULL AUTO_INCREMENT,
admin varchar(100) NOT NULL,
password varchar(255) NOT NULL,
modified_admin_date timestamp,
CONSTRAINT UK_admin UNIQUE (admin),
CONSTRAINT PK_admin_id PRIMARY KEY (admin_id)
);

CREATE TABLE newsletter (
subscriber_ID int NOT NULL AUTO_INCREMENT,
subscriber_email varchar(100) NOT NULL,
subscribe_date timestamp,
CONSTRAINT UK_subscriber_email UNIQUE (subscriber_email),
CONSTRAINT PK_subscriber_ID PRIMARY KEY (subscriber_ID)
);