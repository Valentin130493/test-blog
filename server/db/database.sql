CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 70 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE posts (
     post_id serial PRIMARY KEY,
     title VARCHAR ( 255 ) NOT NULL,
     content VARCHAR ( MAX ),
     image VARCHAR ( 255 )
);