import os
import json
import re
from unidecode import unidecode

# Carregar o JSON
with open('medicamentos_doenças_bd_v1.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Extrair todas as doenças sem repetições
doencas = set()

for entry in data:
    doencas.update(entry.get("Doença(s)", []))

# Converter o conjunto para uma lista e ordenar em ordem alfabética
doencas_ordenadas = sorted(list(doencas))

# Escrever as doenças únicas em um arquivo de texto
with open('doencas.txt', 'w') as file:
    for doenca in doencas_ordenadas:
        file.write(doenca + '\n')

print("Doenças exportadas para 'doencas.txt'")