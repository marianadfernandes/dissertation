import re
import json

def insere(data, tuple):
    def recursive_insert(data, nums, index, tuple):
        print('index', index)
        print("TUPLO", tuple)
        print("NUMS", nums)
        print('LEN', len(nums))
        print(data)
        if index == len(nums):
            # tem código
            if any(char.isalpha() for char in tuple[0]):
                entry = {
                    'id' : tuple[1].strip(),
                    'cod' : tuple[0].strip(),
                    'desc' : tuple[2].strip(),
                }
                if len(tuple) >= 4:
                    entry['valor'] = tuple[3].strip()
                if len(tuple) == 5:
                    entry['nota'] = tuple[4].strip()
            else:
                if len(tuple) == 3:
                    if any(char.isalpha() for char in tuple[2]):
                        entry = {
                            'id' : tuple[0].strip(),
                            'desc' : tuple[1].strip(),
                            'nota' : tuple[2].strip(),
                            'sub' : []
                        }
                    else:
                        entry = {
                            'id' : tuple[0].strip(),
                            'desc' : tuple[1].strip(),
                            'valor' : tuple[2].strip()
                        }
                else:
                    entry = {
                        'id' : tuple[0].strip(),
                        'desc' : tuple[1].strip(),
                        'sub' : []
                    }
            data.append(entry)

        else:
            current_index = int(nums[index]) - 1
            print('current index', current_index)
            recursive_insert(data[current_index]['sub'], nums, index + 1, tuple)

    if any(char.isalpha() for char in tuple[0]):
        nums = tuple[1].split('.')
    else:
        nums = tuple[0].split(".")
    nums = nums[:-1]
    print("TUPLO", tuple)
    print("NUMS", nums)
    recursive_insert(data['Tabela2'], nums[:-1], 0, tuple)
    return(nums)

with open ("alterado.xml","r", encoding="UTF8") as file:
    lines = file.read()

i = lines.find("SUMÁRIO")

lines = lines [i:]

titles = re.findall(r'<i>(\d{1,2}\.)\s(.*)</i>', lines)

subt = re.findall(r'^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.)\s(.*?)…+(.*)(?:\nNOTA:\s(.*))?|<i>(\d{1,2}\.\d{1,2}\.)\s(.*)</i>(?:\nNOTA:\s(.*))?', lines, flags=re.MULTILINE)
subt = [tuple(filter(None, t)) for t in subt]

cap = re.findall(r'^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)…+(.*)(?:\nNOTA:\s(.*))?|<i>(\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)<\/i>(?:\nNOTA:\s(.*))?', lines, flags=re.MULTILINE)
cap = [tuple(filter(None, t)) for t in cap]

entry = re.findall(r'^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)…+(.*)(?:\nNOTA:\s(.*))?|^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))?|<i>(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)</i>(?:\nNOTA:\s(.*))?', lines, flags=re.MULTILINE)
entry = [tuple(filter(None, t)) for t in entry]

entry2 = re.findall(r'^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)…+(.*)(?:\nNOTA:\s(.*))?|^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))?', lines, flags=re.MULTILINE)
entry2 = [tuple(filter(None, t)) for t in entry2]

entry3 = re.findall(r'^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)…+(.*)(?:\nNOTA:\s(.*))?|^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))?', lines, flags=re.MULTILINE)
entry3 = [tuple(filter(None, t)) for t in entry3]

entry4 = re.findall(r'^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)…+(.*)(?:\nNOTA:\s(.*))?|^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))?', lines, flags=re.MULTILINE)
entry4 = [tuple(filter(None, t)) for t in entry4]

entry5 = re.findall(r'^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*?)…+(.*)(?:\nNOTA:\s(.*))?|^(?:COD\s-\s(.*)\n)?(\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,2}\.)\s(.*)(?:\nNOTA:\s(.*))?', lines, flags=re.MULTILINE)
entry5 = [tuple(filter(None, t)) for t in entry5]


# print(entry5)

# Estrutura inicial
data = {'Tabela2': []}

for title in titles:
    insere(data, title)

    for t in subt:
        if t[0].startswith(title[0].strip()) or t[1].startswith(title[0].strip()):
            insere(data, t)

            for chapter in cap:
                if chapter[0].startswith(t[0].strip()) or chapter[1].startswith(t[0].strip()):
                    # print(title, t, chapter)
                    insere(data, chapter)

                    for e in entry:
                        if e[0].startswith(chapter[0].strip()) or e[1].startswith(chapter[0].strip()):
                            # print(title, t, chapter, e)
                            insere(data, e)

                            for e2 in entry2:
                                if (e2[0].startswith(e[0].strip()) and not any(c.isalpha() for c in e2[0]) and not any(c.isalpha() for c in e[0])) or e2[0].startswith(e[1].strip()) or e2[1].startswith(e[0].strip()) or (e2[1].startswith(e[1].strip()) and not any(c.isalpha() for c in e2[1]) and not any(c.isalpha() for c in e[1])):
                                    insere(data, e2)

                                    for e3 in entry3:
                                        if e3[0].startswith(e2[0].strip()) or e3[0].startswith(e2[1].strip()) or e3[1].startswith(e2[0].strip()) or (e3[1].startswith(e2[1].strip()) and not any(c.isalpha() for c in e3[1]) and not any(c.isalpha() for c in e2[1])):
                                            # print(title, t, chapter, e, e2, e3)
                                            insere(data, e3)

                                            for e4 in entry4:
                                                if e4[0].startswith(e3[0].strip()) or e4[0].startswith(e3[1].strip()) or e4[1].startswith(e3[0].strip()) or (e4[1].startswith(e3[1].strip()) and not any(c.isalpha() for c in e4[1]) and not any(c.isalpha() for c in e3[1])):
                                                    # print(title, t, chapter, e, e2, e3, e4)
                                                    insere(data, e4)

                                                    for e5 in entry5:
                                                        if e5[0].startswith(e4[0].strip()) or e5[0].startswith(e4[1].strip()) or e5[1].startswith(e4[0].strip()) or (e5[1].startswith(e4[1].strip()) and not any(c.isalpha() for c in e5[1]) and not any(c.isalpha() for c in e4[1])):
                                                            insere(data, e5)



# Eliminar entradas sub vazias (sem filhos)
# delete_empty_sub(data['Tabela'])
            
# Converter a estrutura de dicionário em JSON
json_data = json.dumps(data, indent=4, ensure_ascii=False)

# print(json_data)

alt = open("tabela2_data.json", "w", encoding="UTF8")
alt.write(json_data)
alt.close()