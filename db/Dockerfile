FROM mysql:latest

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE

ENV MYSQL_DATABASE=ppp

ADD data.sql /etc/mysql/data.sql

RUN sed -i 's/MYSQL_DATABASE/ppp/g' /etc/mysql/data.sql
RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306