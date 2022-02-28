
-- for help       \?

-- list database   \l

-- create database  CREATE DATABASE database_name

-- list all tables  \d

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INT,
  on_sale BOOLEAN
)


ALTER TABLE products ADD COLUMN featured BOOLEAN;
ALTER TABLE products DROP COLUMN featured;


CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) values (123, 'Pizza Hut', 'New York', 2);