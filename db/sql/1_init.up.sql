CREATE TABLE IF NOT EXISTS  users 
(
    user_id BIGSERIAL PRIMARY KEY,
    login VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(100),
    sex CHAR(1) CONSTRAINT check_user_sex CHECK (sex IN ('М', 'Ж')),
    height INTEGER,
    weight INTEGER,
    birth_date_ms BIGINT
);

-- CREATE TABLE IF NOT EXISTS leagues (


-- );

-- CREATE TABLE IF NOT EXISTS tournaments ();

-- CREATE TABLE IF NOT EXISTS teams ();
-- CREATE TABLE IF NOT EXISTS league_groups ();
-- CREATE TABLE IF NOT EXISTS matches ();
-- CREATE TABLE IF NOT EXISTS match_events ();
-- CREATE TABLE IF NOT EXISTS playoff ();
-- CREATE TABLE IF NOT EXISTS players_and_teams ();
-- CREATE TABLE IF NOT EXISTS teams_and_groups ();
-- CREATE TABLE IF NOT EXISTS events_type ();
-- CREATE TABLE IF NOT EXISTS sport_types ();
-- CREATE TABLE IF NOT EXISTS teams_and_tours ();
