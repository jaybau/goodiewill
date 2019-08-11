CREATE DATABASE goodies WITH OWNER goodiewill;

\c goodies goodiewill

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  pic_url VARCHAR(40),
  email VARCHAR(40),
  phone INTEGER,
  preferred_contact VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  pic_url VARCHAR(40),
  item_type VARCHAR(30),
  color VARCHAR(30),
  size VARCHAR(10),
  swapped BOOLEAN,
  brand VARCHAR(20),
  trader_id INTEGER REFERENCES users(id),
  shopper_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS meetups (
  id SERIAL PRIMARY KEY,
  meetup_date DATE,
  meetup_time TIMETZ,
  meetup_day VARCHAR(20),
  trader_id INTEGER REFERENCES users(id),
  shopper_id INTEGER REFERENCES users(id)
);