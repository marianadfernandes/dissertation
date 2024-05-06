import pymysql
import json

with open('data.json', 'r', encoding="UTF8") as arquivo:
    dados = json.load(arquivo)

host = "ACER-SWIFT3"
user = "newuser"
password = "AdminRoot1!"
database = "tni"

# Cria uma conexão com o MySQL
conn =  pymysql.connect(
    host=host,
    user=user,
    password=password,
    database=database
)

# Crie um cursor para executar comandos SQL
cursor = conn.cursor()

# Defina os valores que deseja inserir
valor1 = "exemplo1"
valor2 = "exemplo2"
valor3 = "exemplo3"

# Crie a consulta SQL para inserir os dados

for cat in dados:
    for sub in dados[cat]['sub']:
        print(sub['id'])
        id = sub['id'].split(".")
        sql = """INSERT INTO subcategoria (idsubcategoria, descrição, idcategoria)
                VALUES (%p, %s, %r)"""
        valores = (sub['id'], sub['desc'], int(id[0]))
        # Execute a consulta SQL
        cursor.execute(sql, valores)

# Confirme a transação
conn.commit()

# Feche o cursor e a conexão
cursor.close()
conn.close()