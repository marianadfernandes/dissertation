import os
import json
import re
from unidecode import unidecode

def substituir_espacos_por_underscore(texto):
    return texto.replace(' ', '_').replace('+', '_').replace(',', '').replace('(', '').replace(')','')

def extrair_informacao(conteudo):
    # Expressão regular para encontrar o conteúdo entre o segundo par de tags <title> que começam com 1. e 2.
    regex = re.compile(r'(?:(?:<title>)?(?:1\.\s?)?(?:O que (?:é|são)(?: o)?(?: e para que serve o)? (?:.*?)\s?e?\s?(?:para que (?:é|são) utilizad[o|a]s?\??|em que situações é utilizado\?)?|[^Contra]Indicações(?: terapêuticas)?:?|Porque é que o meu médico receitou (?:.*?)\?)(?:<\/title>)?|Tratamento de\s:|É utilizado para:|Para que é o medicamento \?|Indicações:)\n+([a-zA-Zé•)].*?)(?:(?:<title>|\n2\. O|O que precisa de saber antes de|a (?:criança )?(?:tomar|utilizar|(?:lhe )?ser administrado)\s?(?:.*?)|Contra\s?-?\s?indicações|Antes de (?:o seu filho )?(?:tomar|utilizar|usar)(?: o medicamento)? (?:.*)|Informações necessárias antes de utilizar (?:.*?)|Que devo saber antes de tomar (?:.*?)\?|Quando não deve ser utilizado e quais os efeitos adversos que|Quem é o responsável pela colocação no mercado de (?:.*?)|Posologia e modo de administração))', re.DOTALL | re.IGNORECASE | re.MULTILINE)
    
    # Procurar por correspondências na string de conteúdo
    matches = regex.findall(conteudo)

    # Verificar se foram encontrados resultados
    if matches:
        matches_str = ''.join(matches[0])

        matches_str = re.sub(f'\n', ' ', matches_str)
        
        return matches_str # Retornar a informação encontrada, removendo espaços extras
    else:
        return None


# Carregar o JSON
with open('medicamentosbd.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Pasta onde os arquivos TXT estão localizados
pasta_bulas = './bulas/'
contador = 0
contador_n = 0
contador_n_encontrado = 0

# Verificar se existe um arquivo TXT para cada substância ativa no JSON
for entry in data:
    substancia_ativa = entry["Substância Ativa/DCI"]
    nome_arquivo = substituir_espacos_por_underscore(unidecode(substancia_ativa.lower()))
    txt_file = os.path.join(pasta_bulas, f'{nome_arquivo}.txt')

    # Verificar se o arquivo TXT existe
    if os.path.isfile(txt_file):
        # Ler o conteúdo do arquivo TXT
        with open(txt_file, 'r', encoding='utf-8') as arquivo:
            conteudo = arquivo.read()

        conteudo = re.sub(f'<item>', '•', conteudo)
        conteudo = re.sub(f'<\/item>', '', conteudo)

        # Extrair a informação desejada do conteúdo
        informacao = extrair_informacao(conteudo)
        # if informacao is not None and len(informacao) > 1:
            # print(f'Mais que 1 match para {substancia_ativa}')
        # informacao_formatada = ' '.join((item[0] if isinstance(item, (tuple, list)) and item[0] is not None else str(item)) if item is not None else '' for item in informacao)

        # Exibir a informação extraída
        if informacao:
            contador += 1
            entry['Indicações Terapêuticas'] = informacao
            # print(f'Informação extraída para {substancia_ativa}')
        else:
            contador_n += 1
            print(f'Não foi possível extrair a informação para {substancia_ativa}.')
    else:
        contador_n_encontrado += 1
        # print(f'Arquivo TXT não encontrado para {substancia_ativa}.')

# Converter a estrutura de dicionário em JSON
json_data = json.dumps(data, indent=4, ensure_ascii=False)

# print(json_data)

alt = open("informacoes_atualizado.json", "w", encoding="UTF8")
alt.write(json_data)
alt.close()

print('CONTADOR:', contador, contador_n, contador_n_encontrado)