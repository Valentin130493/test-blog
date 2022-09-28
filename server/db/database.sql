CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 70 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE posts (
     post_id serial PRIMARY KEY,
     title VARCHAR ( 255 ) NOT NULL,
     content VARCHAR ( 520 ),
     image VARCHAR ( 255 ),
     published_date timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    comment_id serial PRIMARY KEY,
    content VARCHAR  (520) ,
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    post_id int NOT NULL,
    user_id int NOT NULL,
    FOREIGN  KEY (post_id) REFERENCES posts(post_id),
    FOREIGN  KEY (user_id) REFERENCES users(user_id)
);