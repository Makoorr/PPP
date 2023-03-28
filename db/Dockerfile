FROM mysql:latest

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE
ARG MYSQL_ROOT_PASSWORD

ENV MYSQL_DATABASE=ppp
ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_ALLOW_EMPTY_PASSWORD=true

ADD data.sql /etc/mysql/data.sql

RUN sed -i 's/MYSQL_DATABASE/ppp/g' /etc/mysql/data.sql
RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d