#!/bin/bash

# Configurações
DATA_DIR="/data/json" # Diretório no container onde os arquivos JSON estão localizados
DB_CONTAINER_NAME="dissertation-db-1" # Nome do container MongoDB
DB_URL="mongodb://dissertation-db-1:27017/projeto"

# Importar os Dados no MongoDB
echo "Importando dados no MongoDB..."

docker exec -i $DB_CONTAINER_NAME mongoimport --uri=$DB_URL --collection bodyparts --file $DATA_DIR/img_to_bodyparts.json --jsonArray
docker exec -i $DB_CONTAINER_NAME mongoimport --uri=$DB_URL --collection medicamentos --file $DATA_DIR/medicamentos_doenças_bd_v1.json --jsonArray
docker exec -i $DB_CONTAINER_NAME mongoimport --uri=$DB_URL --collection tabelas --file $DATA_DIR/tabela1.json --jsonArray
docker exec -i $DB_CONTAINER_NAME mongoimport --uri=$DB_URL --collection tabelas --file $DATA_DIR/tabela2.json --jsonArray

echo "Importação de dados concluída com sucesso!"

