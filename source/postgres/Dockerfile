FROM postgres:13.1

ENV POSTGISV 2.5

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  postgresql-$PG_MAJOR-postgis-$POSTGISV \
  postgresql-$PG_MAJOR-postgis-$POSTGISV-scripts 

# add init script
RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE ${PORT}
