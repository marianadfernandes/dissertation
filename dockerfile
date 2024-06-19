FROM postgres:latest

# Copia o arquivo SQL para o diretório temporário do contêiner
COPY projeto.sql /docker-entrypoint-initdb.d/

# O PostgreSQL criará o banco de dados com essas variáveis de ambiente
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB projeto

# Instalação de pacotes necessários
RUN apt-get update \
    && apt-get install -y postgresql-client

# Comando para execução dos comandos SQL do arquivo projeto.sql
CMD ["postgres"]

# Isso é um exemplo pois vou usar



# docker build -t mypostgresimage .
# docker run --name mypostgrescontainer -d mypostgresimage


# docker exec -it mypostgrescontainer psql -U postgres -d projeto