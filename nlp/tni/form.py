import json

with open('data.json', 'r', encoding="UTF8") as arquivo:
    dados = json.load(arquivo)

def formulario(data):
    print("Qual é a área relativa ao problema?")
    print("***********************************")
    for entry in data:
        print(entry)
    print("***********************************")
    area = input("Área: ")
    print("***********************************")
    print("Qual é a sub-área relativa ao problema?")
    if area == "Oftalmologia":
        for sub in data[area]['sub']:
            print(sub['id'], sub['desc'])
    print("***********************************")
    subarea = input("Sub-área (introduza o nº): ")
    print("***********************************")
    print("Qual é o problema?")
    for sub2 in data[area]['sub'][int(subarea[2])-1]['sub']:
        print(sub2['id'], sub2['desc'])

formulario(dados)
    
