CREATE TABLE bullet_group_bullet (
    id              BIGSERIAL PRIMARY KEY,
    bullet_group_id BIGINT REFERENCES bullet_group(id) ON DELETE CASCADE,
    bullet_id       BIGINT REFERENCES bullet(id) ON DELETE CASCADE
);
CREATE INDEX bullet_group_bullet_bullet_group_id_idx ON bullet_group_bullet(bullet_group_id);
CREATE INDEX bullet_group_bullet_bullet_id_idx ON bullet_group_bullet(bullet_id);