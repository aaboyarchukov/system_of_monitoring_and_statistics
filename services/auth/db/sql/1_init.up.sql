CREATE TABLE IF NOT EXISTS  users 
(
    user_id BIGSERIAL PRIMARY KEY,
    login VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(100),
    sex CHAR(1),
    height INTEGER,
    weight INTEGER,
    birth_date BIGINT
);

