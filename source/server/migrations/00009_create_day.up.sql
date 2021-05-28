CREATE TABLE day (
    id              BIGSERIAL PRIMARY KEY,
    journal_id      BIGINT REFERENCES journal(id) ON DELETE CASCADE,
    date            TIMESTAMP,
    bullets         BIGINT[] DEFAULT '{}',
    created_at      TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at      TIMESTAMP NOT NULL DEFAULT current_timestamp,
    UNIQUE(journal_id, date)          
);

CREATE INDEX day_bullet_journal__idx ON day(journal_id);
CREATE INDEX day_date_idx ON day(date);
