import re
import json

def insere(data, tuple):
    def recursive_insert(data, nums, index, tuple):
        if index == len(nums):
            if len(tuple) > 2 and tuple[2]:
                if any(char.isalpha() for char in tuple[2]):
                    entry = {
                        "id": tuple[0].strip(),
                        "desc": tuple[1].strip(),
                        "nota": tuple[2].strip(),
                        "sub": []
                    }
                    data.append(entry)

                else:
                    tokens = tuple[2].split()
                    refs = []
                    valores = []
                    for token in tokens:
                        if '.' in token or '/' in token:
                            refs.append(token)
                        else:
                            valores.append(token)
                    entry = {
                        "id": tuple[0],
                        "desc": tuple[1].strip(),
                    }
                    if valores:
                        entry["valor"] = valores[0]
                    if refs:
                        entry["refs"] = refs
                    entry["sub"] = []
                    data.append(entry)

            elif len(tuple) > 3 and tuple[3]:
                tokens = tuple[2].split()
                refs = []
                valores = []
                for token in tokens:
                    if '.' in token:
                        refs.append(token)
                    else:
                        valores.append(token)
                entry = {
                    "id": tuple[0].strip(),
                    "desc": tuple[1].strip(),
                }
                if valores:
                    entry["valor"] = valores[0]
                if refs:
                    entry["refs"] = refs
                entry['nota'] = tuple[3].strip()
                entry["sub"] = []
                data.append(entry)
                 
            else:
                data.append({
                    "id": tuple[0].strip(),
                    "desc": tuple[1].strip(),
                    "sub": []
                })

            # print("DATA:", data)

        else:
            current_index = int(nums[index]) - 1
            recursive_insert(data[current_index]['sub'], nums, index + 1, tuple)

    nums = tuple[0].split(".")
    nums = nums[:-1]
    # print("TUPLO", tuple)
    # print("NUMS", nums)
    recursive_insert(data['Tabela'], nums[:-1], 0, tuple)
    return(nums)

def delete_empty_sub(data):
    for entry in data:
        if entry["sub"] == [] and ("valor" in entry or "refs" in entry):
            del entry["sub"]
        else:
            delete_empty_sub(entry["sub"])
    
with open ("alterado.xml","r", encoding="UTF8") as file:
    lines = file.read()

# capitulos como Capitulo I Aparelho Locumotor
cap = re.findall(r'<b>CAPÍTULO\s(.*)-\s(.*)</b>', lines)

# titulos como "1.1. Coluna"
titulos = re.findall(r'^(?:<i>)?(\d{1,2}\.\d{1,2}\.)\s(.*?)(?:<\/i>)?(?:\s…+\s)(.*)(?:\nNOTA:\s(.*))|^(?:<i>)?(\d{1,2}\.\d{1,2}\.)\s(.*?)(?:<\/i>)?(?:\s…+\s)(.*)|<i>(\d{1,2}\.\d{1,2}\.)\s(.*)<\/i>(?:\nNOTA:\s(.*))|<i>(\d{1,2}\.\d{1,2}\.)\s(.*)<\/i>', lines, flags=re.MULTILINE)
# <i>\s?([0-9]+)\s?[\.|-]\s((?:[0-9A-ZÚa-zãáâéêíóõç\-\(\)\/,\.]+\s)*)<\/i>
new_t = [tuple(filter(None, t)) for t in titulos]
new_t = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_t]

# subtitulos como "1.1.1. ..."
subt = re.findall(r'^(\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)', lines, flags=re.MULTILINE)
# ^(\d\.\d\.?)\s+(.*\n?)
new_subt = [tuple(filter(None, t)) for t in subt]
new_subt = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_subt]

# subsubtitulos como "1.1.1.1. ..."
subsubt = re.findall(r'^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)', lines, flags=re.MULTILINE)
new_sub2t = [tuple(filter(None, t)) for t in subsubt]
new_sub2t = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_sub2t]

# subtitulos como "1.1.1.1.1. ..."
subsubsubt = re.findall(r'^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)', lines, flags=re.MULTILINE)
new_sub3t = [tuple(filter(None, t)) for t in subsubsubt]
new_sub3t = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_sub3t]

# subtitulos como "1.1.1.1.1.1. ..."
subsubsubsubt = re.findall(r'^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)', lines, flags=re.MULTILINE)
new_sub4t = [tuple(filter(None, t)) for t in subsubsubsubt]
new_sub4t = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_sub4t]

# subtitulos como "1.1.1.1.1.1.1. ..."
subsubsubsubsubt = re.findall(r'^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)', lines, flags=re.MULTILINE)
new_sub5t = [tuple(filter(None, t)) for t in subsubsubsubsubt]
new_sub5t = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_sub5t]

# subtitulos como "1.1.1.1.1.1.1.1. ..."
subsubsubsubsubsubt = re.findall(r'^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)', lines, flags=re.MULTILINE)
new_sub6t = [tuple(filter(None, t)) for t in subsubsubsubsubsubt]
new_sub6t = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_sub6t]

# subtitulos como "1.1.1.1.1.1.1.1.1. ..."
subsubsubsubsubsubsubt = re.findall(r'^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)(?:…+\s)(.*)|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))|^(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)', lines, flags=re.MULTILINE)
new_sub7t = [tuple(filter(None, t)) for t in subsubsubsubsubsubsubt]
new_sub7t = [tuple(re.sub(r'\s+', ' ', item.strip()) for item in t) for t in new_sub7t]

# Estrutura inicial
data = {'Tabela': []}

for chapter in cap:
    insere(data, chapter)

    for title in new_t:
        if title[0].startswith(chapter[0].strip()+"."):
            insere(data, title)

            for subt in new_subt:
                if subt[0].startswith(title[0]):
                    insere(data, subt)

                    for sub2t in new_sub2t:
                        if sub2t[0].startswith(subt[0]):
                            insere(data, sub2t)

                            for sub3t in new_sub3t:
                                if sub3t[0].startswith(sub2t[0]):
                                        insere(data, sub3t)
                                    
                                        for sub4t in new_sub4t:
                                            if sub4t[0].startswith(sub3t[0]):
                                                    insere(data, sub4t)
                                                
                                                    for sub5t in new_sub5t:
                                                        if sub5t[0].startswith(sub4t[0]):
                                                                insere(data, sub5t)

                                                                for sub6t in new_sub6t:
                                                                    if sub6t[0].startswith(sub5t[0]):
                                                                            insere(data, sub6t)

                                                                            for sub7t in new_sub7t:
                                                                                if sub7t[0].startswith(sub6t[0]):
                                                                                        insere(data, sub7t)

# Eliminar entradas sub vazias (sem filhos)
delete_empty_sub(data['Tabela'])
            
# Converter a estrutura de dicionário em JSON
json_data = json.dumps(data, indent=4, ensure_ascii=False)

# print(json_data)

alt = open("data6.json", "w", encoding="UTF8")
alt.write(json_data)
alt.close()

