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
    birth_date_ms BIGINT,
	photo_url TEXT,
	
	CONSTRAINT check_user_sex 
		CHECK (sex IN ('М', 'Ж'))
);

CREATE TABLE IF NOT EXISTS sport_types (
	sport_type_id BIGSERIAL PRIMARY KEY,
	sport_type_name VARCHAR(30) NOT NULL
);


CREATE TABLE IF NOT EXISTS leagues (
	league_id BIGSERIAL PRIMARY KEY,
	league_name VARCHAR(60) NOT NULL,
	sport_type BIGINT,
	
	CONSTRAINT fk_sport_types
		FOREIGN KEY (sport_type)
			REFERENCES sport_types(sport_type_id)
			ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS tournaments (
	tournament_id BIGSERIAL PRIMARY KEY,
	tournament_name VARCHAR(150) NOT NULL,
	tournament_locale VARCHAR(250),
	tournament_start_date BIGINT,
	tournaments_config JSONB NOT NULL,
	league BIGINT,
	
	CONSTRAINT fk_leagues
		FOREIGN KEY (league)
			REFERENCES leagues(league_id)
			ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS teams (
	team_id BIGSERIAL PRIMARY KEY,
	team_name VARCHAR(100) NOT NULL,
	count_players NUMERIC(2, 0) NOT NULL DEFAULT 0,
	max_count_players NUMERIC(2, 0) NOT NULL DEFAULT 5,
	coach BIGINT DEFAULT NULL,
	capitan BIGINT DEFAULT NULL,
	
	CONSTRAINT fk_users_coach
		FOREIGN KEY (coach)
			REFERENCES users(user_id)
			ON DELETE SET NULL,
	CONSTRAINT fk_users_captain
		FOREIGN KEY (capitan)
			REFERENCES users(user_id)
			ON DELETE SET NULL,
	
	CONSTRAINT check_count_players_range
		CHECK (count_players BETWEEN 0 AND 99),
	CONSTRAINT check_max_count_players_range
		CHECK (max_count_players BETWEEN 0 AND 99)
);

CREATE TABLE IF NOT EXISTS tournament_groups (
	gorup_id BIGSERIAL PRIMARY KEY,
	group_name VARCHAR(50) NOT NULL,
	tour BIGINT,
	
	CONSTRAINT fk_tournaments
		FOREIGN KEY (tour)
			REFERENCES tournaments(tournament_id)
			ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS teams_and_tours (
	-- attent to set primary key like group of team and tour row
	-- some that: PRIMARY KEY(team, tour)
	
	team_and_tour_id BIGSERIAL PRIMARY KEY,
	count_wins NUMERIC(3, 0) DEFAULT 0,
	count_looses NUMERIC(3, 0) DEFAULT 0,
	count_points_difference NUMERIC(4, 0) DEFAULT 0,
	team BIGINT,
	tour BIGINT,
	
	CONSTRAINT fk_teams
		FOREIGN KEY (team)
			REFERENCES teams(team_id)
			ON DELETE CASCADE,
	CONSTRAINT fk_tournaments
		FOREIGN KEY (tour)
			REFERENCES tournaments(tournament_id)
			ON DELETE CASCADE,
	
	CONSTRAINT check_count_wins
		CHECK (count_wins BETWEEN 0 AND 999),
	CONSTRAINT check_count_looses
		CHECK (count_looses BETWEEN 0 AND 999),
	CONSTRAINT check_count_points_difference
		CHECK (count_points_difference BETWEEN 0 AND 9999)
);

CREATE TABLE IF NOT EXISTS teams_and_groups (
	-- attent to set primary key like group of team and group row
	-- some that: PRIMARY KEY(team, group)
	
	team_and_group_id BIGSERIAL PRIMARY KEY,
	team BIGINT,
	tournament_group BIGINT,
	
	CONSTRAINT fk_teams
		FOREIGN KEY (team)
			REFERENCES teams(team_id),
	CONSTRAINT fk_tournament_groups
		FOREIGN KEY (tournament_group)
			REFERENCES tournament_groups(gorup_id)
);

CREATE TABLE IF NOT EXISTS matches (
	match_id BIGSERIAL PRIMARY KEY,
	match_datetime_ms BIGINT NOT NULL,
	match_config JSONB NOT NULL,
	team_away BIGINT NOT NULL,
	team_home BIGINT NOT NULL,
	team_away_score NUMERIC(3, 0) DEFAULT 0 NOT NULL,
	team_home_score NUMERIC(3, 0) DEFAULT 0 NOT NULL,
	
	CONSTRAINT fk_teams_home
		FOREIGN KEY (team_home)
			REFERENCES teams_and_tours(team_and_tour_id),
	CONSTRAINT fk_teams_away
		FOREIGN KEY (team_away)
			REFERENCES teams_and_tours(team_and_tour_id),
	CONSTRAINT check_team_away_score
		CHECK (team_away_score BETWEEN 0 AND 999),
	CONSTRAINT check_team_home_score
		CHECK (team_home_score BETWEEN 0 AND 999)
);

CREATE TABLE IF NOT EXISTS event_types (
	event_type_id BIGSERIAL PRIMARY KEY,
	event_key VARCHAR(30) NOT NULL,
	event_label VARCHAR(30) NOT NULL,
	sport_type BIGINT,
	
	CONSTRAINT fk_sport_types
		FOREIGN KEY (sport_type)
			REFERENCES sport_types(sport_type_id)
);

CREATE TABLE IF NOT EXISTS match_events (
	match_event_id BIGSERIAL PRIMARY KEY, 
	match BIGINT NOT NULL,
	event_type BIGINT NOT NULL,
	event_count NUMERIC(3, 0) DEFAULT 0 NOT NULL,
	event_time BIGINT NOT NULL,
	event_description JSONB,
	
	CONSTRAINT fk_matches
		FOREIGN KEY (match)
			REFERENCES matches(match_id),
	CONSTRAINT fk_event_types
		FOREIGN KEY (event_type)
			REFERENCES event_types(event_type_id),
	
	CONSTRAINT check_event_count
		CHECK (event_count BETWEEN 0 AND 999)
);

CREATE TABLE IF NOT EXISTS players_and_teams (
	-- attent to set primary key like group of team and player row
	-- some that: PRIMARY KEY(team, player)
	
	player_and_team_id BIGSERIAL PRIMARY KEY,
	game_number NUMERIC(2, 0) DEFAULT 0,
	date_start_ms BIGINT,
	date_end_ms BIGINT,
	player BIGINT,
	team BIGINT,
	
	CONSTRAINT fk_teams
		FOREIGN KEY (team)
			REFERENCES teams(team_id),
	CONSTRAINT fk_users
		FOREIGN KEY (player)
			REFERENCES users(user_id),
	
	CONSTRAINT check_dates
		CHECK(date_end_ms > date_start_ms)
);

CREATE TABLE IF NOT EXISTS playoff (
	playoff_id BIGSERIAL PRIMARY KEY,
	playoff_config JSONB,
	tour BIGINT,
	
	CONSTRAINT fk_tournaments
		FOREIGN KEY (tour)
			REFERENCES tournaments(tournament_id)
			ON DELETE CASCADE
	-- ...
);

CREATE TABLE IF NOT EXISTS playoff_pairs (
	-- attent to set primary key like group of team and playoff row
	-- some that: PRIMARY KEY(team, playoff)
	playoff_pair_id BIGSERIAL PRIMARY KEY,
	playoff BIGINT,
	first_team BIGINT,
	first_team_wins NUMERIC(2, 0) DEFAULT 0,
	second_team BIGINT,
	second_team_wins NUMERIC(2, 0) DEFAULT 0,
	
	CONSTRAINT fk_teams_first_team
		FOREIGN KEY (first_team)
			REFERENCES teams(team_id),
	CONSTRAINT fk_teams_second_team
		FOREIGN KEY (second_team)
			REFERENCES teams(team_id),
	CONSTRAINT fk_playoff
		FOREIGN KEY (playoff)
			REFERENCES playoff(playoff_id)
			ON DELETE CASCADE,
	
	CONSTRAINT check_first_team_wins
		CHECK (first_team_wins BETWEEN 0 AND 99),
	CONSTRAINT check_second_team_wins
		CHECK (second_team_wins BETWEEN 0 AND 99),
	
	CONSTRAINT unique_playoff_teams
		UNIQUE (playoff, first_team, second_team)
);

CREATE TABLE IF NOT EXISTS rounds (
	round_id BIGSERIAL PRIMARY KEY,
	match BIGINT,
	
	CONSTRAINT fk_matches
		FOREIGN KEY (match)
			REFERENCES matches(match_id)
			ON DELETE CASCADE
);