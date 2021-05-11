CREATE TABLE journal (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(128),
    created_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at  TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TRIGGER update_journal_updated_at BEFORE UPDATE ON journal FOR EACH ROW EXECUTE PROCEDURE sync_updated_at_column();
