import spacy
import json

from deep_translator import GoogleTranslator

# Carregar o modelo da língua portuguesa
nlp = spacy.load("en_ner_bc5cdr_md")

# Carregar o JSON
with open('informacoes_atualizado.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

for entry in data:
    if entry.get('Indicações Terapêuticas'):
        texto = entry['Indicações Terapêuticas']
        subs = entry['Substância Ativa/DCI']

        try:
            traducao = GoogleTranslator(source='pt', target='en').translate(texto)

            # Processamento do texto
            doc = nlp(traducao)

            diseases_extracted = []
            for entidade in doc.ents:
                if entidade.label_ == 'DISEASE':
                    doença = GoogleTranslator(source='en', target='pt').translate(entidade.text).lower()
                    if (doença) not in diseases_extracted:
                        diseases_extracted.append(doença)

            entry['Doença(s)'] = diseases_extracted
            print(f'Extração completa para {subs} + {diseases_extracted}')
        except Exception as e:
            print(f"Ocorreu um erro durante a tradução: {e}")
            continue  # Pula para a próxima iteração do loop


# Converter a estrutura de dicionário em JSON
json_data = json.dumps(data, indent=4, ensure_ascii=False)

# print(json_data)

alt = open("informacoes_atualizado_2.json", "w", encoding="UTF8")
alt.write(json_data)
alt.close()