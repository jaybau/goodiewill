DROP DATABASE goodies;
CREATE DATABASE goodies WITH OWNER goodiewill;

\c goodies goodiewill

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(40),
  phone VARCHAR(20),
  preferred_contact VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  main_img VARCHAR(300),
  item_type VARCHAR(30),
  color VARCHAR(30),
  size VARCHAR(10),
  claimed BOOLEAN,
  confirmed BOOLEAN,
  brand VARCHAR(20),
  info VARCHAR (130),
  extra_imgs VARCHAR[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  posted_by INTEGER REFERENCES users(id),
  shopper_id INTEGER REFERENCES users(id)
);

-- CREATE TABLE IF NOT EXISTS meetups (
--   id SERIAL PRIMARY KEY,
--   meetup_date DATE,
--   meetup_time TIMETZ,
--   meetup_day VARCHAR(20),
--   trader_id INTEGER REFERENCES users(id),
--   shopper_id INTEGER REFERENCES users(id)
-- );

INSERT INTO users (name, email, phone, preferred_contact) VALUES ('Kevin', 'kevin@gmail.com', '(619) 321-5674', 'slack');
INSERT INTO users (name, email, phone, preferred_contact) VALUES ('Ian', 'ian@gmail.com', '(619) 431-9834', 'text');
INSERT INTO users (name, email, phone, preferred_contact) VALUES ('Anne', 'anne@gmail.com', '(619) 987-3241', 'email');
INSERT INTO users (name, email, phone, preferred_contact) VALUES ('Melvynn', 'melvynn@gmail.com', '(619) 345-8755', 'phone');
INSERT INTO users (name, email, phone, preferred_contact) VALUES ('Kat', 'kat@gmail.com', '(619) 546-1240', 'text');
INSERT INTO users (name, email, phone, preferred_contact) VALUES ('Melvin', 'melvin@gmail.com', '(619) 546-1247', 'slack');