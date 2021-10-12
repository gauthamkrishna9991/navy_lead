-- Postgres Setup

-- Make sure to delete navy_lead if exists
DROP DATABASE navy_lead;

-- Create a databse called navy_lead
CREATE DATABASE navy_lead;

-- Create a user with the same name and password.
CREATE USER navy_lead_user WITH PASSWORD 'navy_lead' CREATEDB;

-- Grant All privileges for navy_lead_user to navy_lead.
GRANT ALL PRIVILEGES ON DATABASE navy_lead TO navy_lead_user;

CREATE TABLE tickers (
    ticker_id serial primary key,
    tname varchar(255),
    last double precision not null,
    buy double precision not null,
    sell double precision not null,
    volume double precision not null,
    base_unit varchar(16) unique
);