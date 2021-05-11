ALTER TABLE user_account ADD COLUMN name VARCHAR(128);
CREATE INDEX user_account_email_idx ON user_account(email);