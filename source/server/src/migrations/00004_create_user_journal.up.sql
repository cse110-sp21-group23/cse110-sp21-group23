CREATE TABLE user_journal (
    id              BIGSERIAL PRIMARY KEY,
    journal_id      BIGINT REFERENCES journal(id) ON DELETE CASCADE,
    user_id         BIGINT REFERENCES user_account(id) ON DELETE CASCADE
);
CREATE INDEX user_journal_journal_id_idx ON user_journal(journal_id);
CREATE INDEX user_journal_user_id_idx ON user_journal(user_id);

