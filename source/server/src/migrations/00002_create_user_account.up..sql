CREATE TABLE user_account (
  id          BIGSERIAL PRIMARY KEY,
  email       VARCHAR(128) UNIQUE,
  password    VARCHAR(256), 
  created_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at  TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TRIGGER update_user_account_updated_at BEFORE UPDATE ON user_account FOR EACH ROW EXECUTE PROCEDURE sync_updated_at_column();
