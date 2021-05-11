CREATE TYPE bullet_type AS ENUM ('task', 'event', 'note', 'media');

CREATE TABLE bullet (
    id              BIGSERIAL PRIMARY KEY,
    journal_id      BIGINT REFERENCES journal(id) ON DELETE CASCADE,
    body            VARCHAR(1024),
    type            bullet_type,
    is_done         BOOLEAN DEFAULT FALSE,
    priority        INTEGER,
    mood            SMALLINT,
    date            TIMESTAMP,
    created_at      TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at      TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TRIGGER update_bullet_updated_at BEFORE UPDATE ON bullet FOR EACH ROW EXECUTE PROCEDURE sync_updated_at_column();

CREATE INDEX bullet_journal_id_idx ON bullet(journal_id);
CREATE INDEX bullet_priority_idx ON bullet(priority);
CREATE INDEX bullet_date_idx ON bullet(date);