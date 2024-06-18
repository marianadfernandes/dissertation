FROM postgres:latest
ADD projeto.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB projeto

docker build -t mypostgresimage .
docker run --name mypostgrescontainer -d mypostgresimage


docker exec -it mypostgrescontainer psql -U postgres -d projeto