require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS membership (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  status VARCHAR ( 50 ) NOT NULL UNIQUE
);

INSERT INTO membership (status) 
VALUES ('not_a_member'), ('member'), ('admin')
ON CONFLICT (status) DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 35 ) NOT NULL,
  last_name VARCHAR ( 35 ) NOT NULL,
  username VARCHAR ( 35 ) NOT NULL UNIQUE,
  email VARCHAR ( 100 ) NOT NULL UNIQUE,
  membership_id INTEGER REFERENCES membership(id)
);

INSERT INTO users (first_name, last_name, username, email, membership_id) 
VALUES (
  'John', 
  'Wick', 
  'johnwick29', 
  'johnwick@gmail.com', 
  (SELECT id FROM membership WHERE status = 'member')
)
ON CONFLICT (username, email) DO NOTHING;

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (user_id, content) 
VALUES (
  (SELECT id FROM users WHERE username = 'johnwick29'),
  'This is my first message!'
)
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
