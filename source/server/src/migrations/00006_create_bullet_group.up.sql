CREATE TABLE bullet_group (
    id          BIGSERIAL PRIMARY KEY,
    journal_id  BIGINT REFERENCES journal(id) ON DELETE CASCADE,
    body        VARCHAR(256),
    created_at  TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at  TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TRIGGER update_bullet_group_updated_at BEFORE UPDATE ON bullet FOR EACH ROW EXECUTE PROCEDURE sync_updated_at_column();

CREATE INDEX bullet_group_journal_id_idx ON bullet_group(journal_id);