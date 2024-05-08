import json

# Carregar o JSON
with open('medicamentos_doenças_bd.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

for entry in data:
    if entry['Substância Ativa/DCI'] == "Apixabano":
        entry['Doença(s)'] = ["fibrilhação auricular",
            "trombose venosa profunda",
            "embolia pulmonar"]  

    elif entry['Substância Ativa/DCI'] == "Aripiprazol":
        entry['Doença(s)'] = ["esquizofrenia",
            "transtorno bipolar"
            ]  

    elif entry['Substância Ativa/DCI'] == "Atenolol":
        entry['Doença(s)'] = ["hipertensão arterial",
            "angina de peito",
            "arritmias cardíacas",
            "enfarte do miocárdio"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Atomoxetina":
        entry['Doença(s)'] = ["perturbação de hiperatividade e défice de atenção"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Atorvastatina" or entry['Substância Ativa/DCI'] == "Atorvastatina + Ezetimiba" or entry['Substância Ativa/DCI'] == "Rosuvastatina" or entry['Substância Ativa/DCI'] == "Rosuvastatina + Ezetimiba" or entry['Substância Ativa/DCI'] == "Sinvastatina" or entry['Substância Ativa/DCI'] == "Sinvastatina + Ezetimiba" or entry['Substância Ativa/DCI'] == "Sinvastatina + Fenofibrato":
        entry['Doença(s)'] = ["hipercolesterolemia"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Atropina":
        entry['Doença(s)'] = ["inflamação ocular",
            "irite",
            "queratite",
            "iridociclite",
            "uveíte",
            "esclerite"
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Azitromicina":
        entry['Doença(s)'] = [
            "infeção dos seios nasais",
            "bronquite",
            "pneumonia",
            "amidalite",
            "dor de garganta",
            "faringite",
            "sinusite",
            "infeção do ouvido",
            "infeção da pele",
            "infeção do tubo que transporta a urina por chlamidia trachomatis"
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Baclofeno":
        entry['Doença(s)'] = [
            "paralisia cerebral",
            "esclerose múltipla",
            "acidentes cerebrovasculares",
            "doenças/lesões da espinal medula"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Bendamustina":
        entry['Doença(s)'] = [
            "leucemia linfoide crónica",
            "linfoma não-hodgkin",
            "mieloma múltiplo"
            ]

    elif entry['Substância Ativa/DCI'] == "Benzidamina":
        entry['Doença(s)'] = [
            "infeção da boca",
            "infeção da garganta"
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Beta-histina":
        entry['Doença(s)'] = [
            "síndrome de ménière"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Betametasona":
        entry['Doença(s)'] = [
            "dermatite atópica",
            "dermatite atópica infantil",
            "dermatite numular",
            "eczema discóide",
            "prurigo nodularis",
            "psoríase",
            "líquen simplex crônico",
            "neurodermatite",
            "líquen plano",
            "dermatite seborréica",
            "dermatite de contacto",
            "lúpus discóide eritematoso",
            "eritrodermia generalizada",
            "picadas de insetos",
            "miliária rubra"
            ] 
          
    elif entry['Substância Ativa/DCI'] == "Betametasona + Calcipotriol":
        entry['Doença(s)'] = [
            "psoríase do couro cabelo",
            "psoríase vulgaris"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Bicarbonato de sódio":
        entry['Doença(s)'] = [
            "hiperacidez"
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Bilastina":
        entry['Doença(s)'] = [
            "rinite alérgica",
            "erupções cutâneas",
            "dermatite",
            "urticária"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Bioflavonóides":
        entry['Doença(s)'] = [
            "insuficiência venosa",
            "hemorroidas"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Biperideno" or entry['Substância Ativa/DCI'] == "Pramipexol":
        entry['Doença(s)'] = [
            "doença de parkinson"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Bisacodilo" or entry['Substância Ativa/DCI'] == "Macrogol" or entry['Substância Ativa/DCI'] == "Macrogol + Bicarbonato de sódio + Cloreto de potássio + Cloreto de sódio" or entry['Substância Ativa/DCI'] == "Macrogol e outras associações":
        entry['Doença(s)'] = [
            "obstipação"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Bisoprolol":
        entry['Doença(s)'] = [
            "insuficiência cardíaca",
            "hipertensão arterial",
            "angina de peito"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Brimonidina":
        entry['Doença(s)'] = [
            "glaucoma de ângulo aberto",
            "hipertensão intraocular"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Bromazepam":
        entry['Doença(s)'] = [
            "ansiedade",
            "transtorno bipolar",
            "esquizofrenia"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Brometo de ipratrópio":
        entry['Doença(s)'] = [
            "asma",
            "doença pulmonar obstrutiva crónica",
            "bronquite",
            "enfisema"
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Budesonida":
        entry['Doença(s)'] = [
            "asma"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Budesonida + Formoterol":
        entry['Doença(s)'] = [
            "asma",
            "doença pulmonar obstrutiva crónica"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Buprenorfina":
        entry['Doença(s)'] = [
            "dor neoplásica"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Buprenorfina + Naloxona":
        entry['Doença(s)'] = [
            "dependência de opiáceos"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Calcifediol":
        entry['Doença(s)'] = [
            "hipocalcemia",
            "raquitismo carencial",
            "raquitismo vitamino-resistente",
            "osteodistrofia renal",
            "hipoparatireoidismo idiopático",
            "osteomalácia nutricional",
            "osteomalácia dos anticonvulsionantes",
            "hipocalcémia das afeções hepáticas",
            "espasmofilia",
            "osteoporose cortisónica",
            "deficiência de vitamina d"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Candesartan":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "insuficiência cardíaca"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Candesartan + Hidroclorotiazida" or entry['Substância Ativa/DCI'] == "Enalapril + Hidroclorotiazida" or entry['Substância Ativa/DCI'] == "Enalapril + Lercanidipina" or entry['Substância Ativa/DCI'] == "Indapamida" or entry['Substância Ativa/DCI'] == "Indapamida + Amlodipina" or entry['Substância Ativa/DCI'] == "Irbesartan + Hidroclorotiazida" or entry['Substância Ativa/DCI'] == "Lercanidipina" or entry['Substância Ativa/DCI'] == "Lisinopril + Amlodipina" or entry['Substância Ativa/DCI'] == "Lisinopril + Hidroclorotiazida" or entry['Substância Ativa/DCI'] == "Losartan + Amlodipina" or entry['Substância Ativa/DCI'] == "Losartan + Hidroclorotiazida" or entry['Substância Ativa/DCI'] == "Moxonidina" or entry['Substância Ativa/DCI'] == "Perindopril + Indapamida" or entry['Substância Ativa/DCI'] == "Perindopril + Indapamida + Amlodipina" or entry['Substância Ativa/DCI'] == "Ramipril + Amlodipina" or entry['Substância Ativa/DCI'] == "Ramipril + Hidroclorotiazida" or entry['Substância Ativa/DCI'] == "Valsartan + Hidroclorotiazida":
        entry['Doença(s)'] = [
            "hipertensão arterial"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Carbamazepina":
        entry['Doença(s)'] = [
            "epilepsia",
            "neuralgia do trigémio",
            "síndrome da abstinência alcoólica",
            "neuropatia diabética dolorosa",
            "diabetes insípida central"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Carbocisteína":
        entry['Doença(s)'] = [
            "infeção respiratórias"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Carmustina":
        entry['Doença(s)'] = [
            "tumor cerebral",
            "glioblastoma",
            "meduloblastoma",
            "astrocitoma",
            "mieloma múltiplo",
            "linfoma de hodgkin",
            "linfoma não-hodgkin",
            "tumor do trato gastrointestinal",
            "tumor no trato digestivo",
            "melanoma maligno"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Carvedilol":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "doença arterial coronária",
            "angina de peito",
            "insuficiência cardíaca"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cefaclor":
        entry['Doença(s)'] = [
            "infeção do trato respiratório superior",
            "otite média",
            "sinusite",
            "faringite",
            "amigdalite",
            "infeção do trato respiratório inferior",
            "bronquite crónica",
            "pneumonia",
            "infeção do trato urinário",
            "pielonefrite",
            "cistite",
            "infeção da pele e tecidos moles"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cefazolina":
        entry['Doença(s)'] = [
            "infeção do trato respiratório superior",
            "otite média",
            "sinusite",
            "faringite",
            "infeção do trato respiratório inferior",
            "pneumonia",
            "infeção geniturinária",
            "pielonefrite",
            "cistite",
            "uretrite",
            "infeção das vias biliares",
            "infeção do aparelho genital",
            "epididimite",
            "prostatite",
            "infeção da pele e tecidos moles",
            "infeção dos ossos",
            "septicemia",
            "endocardite"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cefepima":
        entry['Doença(s)'] = [
            "infeção do trato urinário",
            "pneumonia",
            "infeção da cavidade abdominal",
            "peritonite",
            "bacteriemia",
            "neutropenia"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cefixima":
        entry['Doença(s)'] = [
            "otite média",
            "infeção do trato respiratório superior",
            "faringite",
            "amigdalite",
            "sinusite",
            "infeção do trato respiratório inferior",
            "bronquite crónica",
            "pneumonia",
            "infeção do trato urinário",
            "cistite",
            "pielonefrite",
            "uretrite",
            "cervicite"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cefotaxima":
        entry['Doença(s)'] = [
            "infeção do trato respiratório inferior",
            "bronquite crónica",
            "pneumonia",
            "bronquietasia",
            "abcessos pulmonares",
            "infeção otorrinolaringológica",
            "infeção genito-urinária",
            "doença gonocócica",
            "celulite pélvica",
            "endometrite",
            "prostatite",
            "anexite",
            "infeção da cavidade abdominal",
            "peritonite",
            "infeção das vias biliares",
            "infeção do trato gastrointestinal",
            "infeção da pele e tecidos moles",
            "infeção dos ossos e articulações",
            "osteomielite",
            "artrite séptica",
            "septicémia",
            "meningite",
            "infeção dentária"            
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cefoxitina":
        entry['Doença(s)'] = [
            "peritonite",
            "infeção intra-abdominal",
            "infeção intrapélvica",
            "infeção do trato genital feminino",
            "septicemia",
            "endocardite",
            "infeção do trato urinário",
            "gonorréia",
            "infeção do trato respiratório",
            "infeção osteoarticular",
            "infeção da pele e tecidos moles"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Ceftazidima":
        entry['Doença(s)'] = [
            "infeção do trato respiratório",
            "fibrose quística",
            "meningite",
            "infeção do ouvido",
            "infeção do trato urinário",
            "infeção da pele e tecidos moles",
            "infeção abdominal",
            "infeção do osso e das articulações",
            "peritonite",
            "neutropenia"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Ceftriaxona":
        entry['Doença(s)'] = [
            "meningite",
            "infeção pulmonar",
            "otite média",
            "infeção abdominal",
            "peritonite",
            "infeção do trato urinário",
            "infeção dos rins",
            "infeção da pele e tecidos moles",
            "infeção do sangue",
            "infeção do coração",
            "gonorréia",
            "sífilis",
            "neutropenia",
            "bronquite crónica",
            "doença de lyme"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cefuroxima" or entry['Substância Ativa/DCI'] == "Cetorolac":
        entry['Doença(s)'] = [
            "cataratas"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Celecoxib":
        entry['Doença(s)'] = [
            "osteoartrose",
            "artrite reumatoide",
            "espondilite anquilosante"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cetirizina":
        entry['Doença(s)'] = [
            "rinite alérgica",
            "urticária crónica idiopática"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Cetoconazol":
        entry['Doença(s)'] = [
            "infeção da pele",
            "infeção no tronco",
            "infeção nas virilhas",
            "infeção nas mãos",
            "infeção nos pés",
            "dermatite seborreica"
            ] 

    elif entry['Substância Ativa/DCI'] == "Cetoprofeno":
        entry['Doença(s)'] = [
            "osteoartrose",
            "artrite reumatoide",
            "espondilite anquilosante",
            "artrite psoriática",
            "algia neurológica e neuromuscular",
            "periartrite",
            "tendinite",
            "tenossinovite",
            "bursite",
            "gota"
            ] 

    elif entry['Substância Ativa/DCI'] == "Cetotifeno":
        entry['Doença(s)'] = [
            "asma",
            "urticária",
            "dermatite",
            "rinite alérgica",
            "conjuntivite"
            ] 

    elif entry['Substância Ativa/DCI'] == "Ciamemazina":
        entry['Doença(s)'] = [
            "psicose"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Cianocobalamina":
        entry['Doença(s)'] = [
            "anemia perniciosa",
            "gastroctomia",
            "resseção do ileo",
            "deficiências nutricionais",
            "malabsorção congénita de cobalamina",
            "deficiência congénita do fator intrínseco",
            "deficiência em transcobalamina II",
            "metilamonilacidúrias",
           ] 

    elif entry['Substância Ativa/DCI'] == "Ciclobenzaprina":
        entry['Doença(s)'] = [
            "espasmos musculares",
            "lesões musculares",
            "distensão muscular",
            "radiculopatia",
            "osteoartrite hipertrófica degenerativa",
            "fibrosite"
            ] 

    elif entry['Substância Ativa/DCI'] == "Ciclofosfamida":
        entry['Doença(s)'] = [
            "leucemia",
            "leucemia linfocítica crónica",
            "doença de hodgkin",
            "linfoma não-hodgkin",
            "mieloma múltiplo",
            "plasmocitoma",
            "cancro de mama",
            "cancro de pulmão",
            "carcinoma do ovário",
            "neuroblastoma",
            "seminoma",
            "sarcoma de ewing",
            "doenças autoimunes",
            "artrite reumatóide",
            "artropatia psoriática",
            "lúpus eritematoso sistémico",
            "esclerodermia",
            "vasculite",
            "miastenia gravis",
            "anemia hemolítica autoimune",
            "transplantação hematopoitética",
            "mielóide crónica",
            "transplantação alogénica",
            "anemia aplástica"
            ] 

    elif entry['Substância Ativa/DCI'] == "Ciclopentolato":
        entry['Doença(s)'] = [
            "irite",
            "iridociclite",
            "coroidite",
            "uveíte"
            ] 

    elif entry['Substância Ativa/DCI'] == "Ciclopirox":
        entry['Doença(s)'] = [
            "dermatomicose",
            "dermatofitose",
            "intertrigos",
            "eczema marginado de Hebra",
            "tinea pedis (pé de atleta)",
            "micoses da pele glabra",
            "herpes circinado",
            "oníquia",
            "candidíase cutânea",
            "candidíase ungueais",
            "perioníquia",
            "pitiríase versicolor",
            "eritrasma",
            "dermatite seborreica"
            ]    

    elif entry['Substância Ativa/DCI'] == "Ciclosporina":
        entry['Doença(s)'] = [
            "transplante de medula óssea",
            "transplante de orgão",
            "psoríase",
            "síndrome nefrótico",
            "artrite",
            "dermatite atópica"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Ciprofloxacina":
        entry['Doença(s)'] = [
            "infeção do trato respiratório",
            "infeção do ouvido",
            "infeção sinusal",
            "infeção do trato urinário",
            "infeção dos testículos",
            "infeção do aparelho genital feminino",
            "infeção do trato gastrointestinal",
            "infeção intra-abdominal",
            "infeção da pele e tecidos moles",
            "infeção dos ossos e articulações",
            "neutropenia",
            "exposição a antraz",
            "fibrose quística",
            "infeção do trato urinário",
            "pielonefrite" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Ciproterona":
        entry['Doença(s)'] = [
            "hirsutismo",
            "alopecia androgenética",
            "acne",
            "seborréia",
            "cancro da próstata"
            ] 

    elif entry['Substância Ativa/DCI'] == "Citalopram":
        entry['Doença(s)'] = [
            "depressão",
            "transtornos de pânico"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Citarabina":
        entry['Doença(s)'] = [
            "leucemia mieloide aguda",
            "leucemia linfoblástica aguda",
            "leucemia mieloide crónica",
            "linfoma não-hodgkin",
            "linfoma linfoblástico não-hodgkin",
            "linfoma não-hodgkin tipo-burkitt",
            "leucemia do sistema nervoso central"
            ]   
        
    elif entry['Substância Ativa/DCI'] == "Citicolina":
        entry['Doença(s)'] = [
            "acidente vascular cerebral (AVC)",
            "traumatismo craniano"
            ] 

    elif entry['Substância Ativa/DCI'] == "Claritromicina":
        entry['Doença(s)'] = [
            "infeção da garganta",
            "infeção dos seios nasais",
            "otite média",
            "infeção respiratória",
            "bronquite",
            "pneumonia",
            "infeção da pele e tecidos moles",
            "infeção da cavidade oral",
            "abcessos dentários",
            "úlcera duodenal" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Clindamicina":
        entry['Doença(s)'] = [
            "infeção do trato respiratório superior",
            "amigdalite",
            "faringite",
            "sinusite",
            "otite média",
            "escarlatina",
            "infeção do trato respiratório inferior",
            "bronquite",
            "pneumonia",
            "empiema",
            "abscesso pulmonar",
            "infeção da pele e tecidos moles",
            "acne",
            "furúnculos",
            "celulite",
            "impetigo",
            "abcesso",
            "ferida infetada",
            "erisipela",
            "paroníquia (panarício)",
            "infeção dos ossos e articulações",
            "osteomielite",
            "artrite séptica",
            "infeção ginecológica",
            "endometrite",
            "infeção vaginal",
            "abcesso tubo-ovárico",
            "salpingite",
            "doença inflamatória pélvica",
            "cervicite por chlamydia trachomatis",
            "infeção intra-abdominal",
            "peritonite",
            "abcesso abdominal",
            "septicémia",
            "endocardite",
            "abcessos peridentários",
            "periodontite",
            "infeção por plasmodium falciparum" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Clobazam":
        entry['Doença(s)'] = [
            "ansiedade",
            "depressão",
            "epilepsia",
            "esquizofrenia" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Clonazepam":
        entry['Doença(s)'] = [
            "epilepsia",
            "síndrome de lennox-gastaut",
            "síndrome de west"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Clopidogrel":
        entry['Doença(s)'] = [
            "aterosclerose",
            "ataques cardíaco",
            "acidente vascular cerebral (AVC)",
            "doença arterial periférica",
            "angina instável",
            "enfarte de miocárdio",
            "fibrilhação auricular"
            ] 

    elif entry['Substância Ativa/DCI'] == "Clorazepato dipotássico":
        entry['Doença(s)'] = [
            "ansiedade",
            "delirium tremens",
            "síndrome da abstinência alcoólica"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Cloreto de tróspio":
        entry['Doença(s)'] = [
            "polaquiúria",
            "incontinência urinária"
            ] 

    elif entry['Substância Ativa/DCI'] == "Cloropromazina":
        entry['Doença(s)'] = [
            "psicose",
            "esquizofrenia",
            "neurose"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Clotrimazol":
        entry['Doença(s)'] = [
            "candidíase vulvovaginal"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Clozapina":
        entry['Doença(s)'] = [
            "psicose",
            "esquizofrenia",
            "doença de parkinson"            
            ] 

    elif entry['Substância Ativa/DCI'] == "Colistimetato de sódio":
        entry['Doença(s)'] = [
            "infeção pulmonar",
            "fibrose quística"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Dabigatrano etexilato":
        entry['Doença(s)'] = [
            "artroplastia da anca",
            "artroplastia do joelho",
            "fibrilhação auricular",
            "tromboembolismo"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Darunavir":
        entry['Doença(s)'] = [
            "infeção pelo vírus da imunodeficiência humana tipo 1 (vih-1)"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Dasatinib":
        entry['Doença(s)'] = [
            "leucemia mielóide crónica",
            "leucemia linfoblástica aguda"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Deferasirox":
        entry['Doença(s)'] = [
            "anemia",
            "talassemia",
            "doença das células falciformes",
            "síndromes mielodisplásticos",
            "sobrecarga crónica de ferro"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Deflazacorte":
        entry['Doença(s)'] = [
            "insuficiência cortico-suprarrenal",
            "doença reumática",
            "colagenoses",
            "doença pulmonar",
            "alergia",
            "doença hematológica",
            "doença neoplásica",
            "doença dermatológica",
            "doença renal",
            "doença gastrointestinal",
            "doença oftalmológica",
            "alterações no sistema nervoso periférico"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Desloratadina":
        entry['Doença(s)'] = [
            "rinite alérgica",
            "urticária" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Desmopressina":
        entry['Doença(s)'] = [
            "diabetes insípido",
            "enurese noturna",
            "noctúria" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Desogestrel" or entry['Substância Ativa/DCI'] == "Desogestrel + Etinilestradiol" or entry['Substância Ativa/DCI'] == "Levonorgestrel":
        entry['Doença(s)'] = [
            "anticoncecional"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Dexametasona":
        entry['Doença(s)'] = [
            "conjuntivite",
            "queimadura córneo-conjuntival",
            "blefaroconjuntivite",
            "iridociclite"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Dexcetoprofeno":
        entry['Doença(s)'] = [
            "dor muscular",
            "dismenorreia",
            "dor de dente" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Dexibuprofeno":
        entry['Doença(s)'] = [
            "osteoartrite",
            "dismenorreia",
            "dor muscular",
            "dor de dentes",
            "dores articulares"  
            ] 

    elif entry['Substância Ativa/DCI'] == "Dexpantenol":
        entry['Doença(s)'] = [
            "inflamação na pele",
            "úlcera crónica" 
            ] 

    elif entry['Substância Ativa/DCI'] == "Diazepam":
        entry['Doença(s)'] = [
            "ansiedade",
            "síndrome da abstinência alcoólica",
            "paralisia cerebral",
            "paraplegia",
            "atetose",
            "síndrome de rigidez generalizada",
            "epilepsia"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Diclofenac":
        entry['Doença(s)'] = [
            "dores musculares",
            "contusão",
            "dor pós-traumática",
            "reumatismo degenerativo",
            "osteoartrose"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Dienogest + Etinilestradiol":
        entry['Doença(s)'] = [
            "anticoncecional",
            "acne" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Difenidramina":
        entry['Doença(s)'] = [
            "alergias de pele",
            "queimadura solar",
            "urticária"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Digoxina":
        entry['Doença(s)'] = [
            "insuficiência cardíaca",
            "fibrilhação auricular",
            "arritmias supraventriculares",
            "flutter auricular" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Diltiazem":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "angina de peito",
            "angina de espasmo",
            "fibrilhação auricular"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Dimenidrinato":
        entry['Doença(s)'] = [
            "doença de ménière",
            "distúrbios do labirinto" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Dimetindeno":
        entry['Doença(s)'] = [
            "urticária",
            "eczema",
            "dermatite",
            "varicela",
            "rinite alérgica"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Dinitrato de isossorbida":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "angina de peito",
            "enfarte de miocárdio",
            "insuficiência cardíaca"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Docetaxel":
        entry['Doença(s)'] = [
            "herpes",
            "retinite por citomegalovírus",
            "infeção pelo vírus da imunodeficiência humana (hiv)",
            "infeção por herpes",
            "infeção por citomegalovírus",
            "transplante de medula óssea",
            "transplante de células estaminais hematopoiéticas",
            "viremia por citomegalovírus"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Donepezilo":
        entry['Doença(s)'] = [
            "demência",
            "doença de alzheimer"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Dorzolamida" or entry['Substância Ativa/DCI'] == "Timolol + Dorzolamida": 
        entry['Doença(s)'] = [
            "hipertensão intraocular",
            "glaucoma" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Doxazosina" or entry['Substância Ativa/DCI'] == "Silodosina" or entry['Substância Ativa/DCI'] == "Solifenacina + Tansulosina" or entry['Substância Ativa/DCI'] == "Tansulosina":
        entry['Doença(s)'] = [
            "hiperplasia benigna da próstata"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Doxiciclina":
        entry['Doença(s)'] = [
            "acne",
            "rosácea",
            "brucelose",
            "pasturela",
            "linfogranuloma venereo",
            "infeção uretral",
            "infeção endocervical",
            "infeção retal",
            "tracoma",
            "conjuntivite",
            "infeção respiratória",
            "febre das montanhas rochosas",
            "tifo",
            "febre q",
            "rikettsiose varicelos",
            "febre das carraças",
            "gonorréia",
            "sífilis",
            "bouba",
            "doença de lyme",
            "leptospirose",
            "cólera"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Drospirenona + Etinilestradiol":
        entry['Doença(s)'] = [
            "anticoncecional"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Duloxetina":
        entry['Doença(s)'] = [
            "depressão",
            "perturbação da ansiedade generalizada",
            "dor neuropática do diabético"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Dutasterida" or entry['Substância Ativa/DCI'] == "Dutasterida + Tansulosina":
        entry['Doença(s)'] = [
            "hiperplasia benigna da próstata",
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Ebastina":
        entry['Doença(s)'] = [
            "rinite alérgica",
            "urticária crónica",
            "dermatose pruriginosa"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Econazol":
        entry['Doença(s)'] = [
            "balanite micótica",
            "micose vulvovaginal"  
           ] 
        
    elif entry['Substância Ativa/DCI'] == "Electrólitos + Glucose":
        entry['Doença(s)'] = [
            "insuficiência renal",
            "distúrbios de acidez ou alcalinidade",
            "intoxicação por fármacos" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Enalapril":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "insuficiência cardíaca",  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Enoxaparina sódica":
        entry['Doença(s)'] = [
            "angina instável",
            "doença renal grave",
            "trombose venosa profunda",
            "embolismo pulmonar",
            "tromboembolismo",
            "enfarte do miocárdio" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Epoetina alfa":
        entry['Doença(s)'] = [
            "anemia",
            "doença renal",
            "tumor",
            "linfoma maligno",
            "mieloma múltiplo",
            "síndromes mielodisplásicas"            ] 
        
    elif entry['Substância Ativa/DCI'] == "Epoetina beta":
        entry['Doença(s)'] = [
            "anemia",
            "insuficiência renal crónica",
            "neoplasia não-mieloide"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Eritromicina":
        entry['Doença(s)'] = [
            "infeção das vias respiratórias",
            "otite externa",
            "otite média",
            "amigdalite",
            "faringite",
            "laringite",
            "sinusite",
            "bronquite",
            "broncopneumonia",
            "pneumonia",
            "doença do legionário",
            "pneumonia lobar",
            "acne",
            "furunculose",
            "foliculite",
            "antraz",
            "osteomielite",
            "erisipela",
            "difteria",
            "clamídia",
            "blenorragia",
            "sífilis primária"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Erlotinib":
        entry['Doença(s)'] = [
            "cancro de pulmão de não pequenas células",
            "cancro do pâncreas"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Escitalopram":
        entry['Doença(s)'] = [
            "depressão",
            "perturbação de ansiedade social",
            "síndrome do pânico",
            "agorafobia",
            "perturbação de ansiedade generalizada",
            "perturbação obsessiva-compulsiva" 
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Esomeprazol":
        entry['Doença(s)'] = [
            "doença de refluxo gastroesofágico",
            "úlcera gástrica",
            "úlcera intestinal",
            "síndrome de zollinger-ellison" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Estradiol":
        entry['Doença(s)'] = [
            "menopausa"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Estriol":
        entry['Doença(s)'] = [
            "menopausa",
            "vaginite",
            "vulvite" 
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Etanercept":
        entry['Doença(s)'] = [
            "artrite reumatoide",
            "artrite psoriática",
            "espondiloartrite axial",
            "espondilite anquilosante",
            "artrite idiopática juvenil",
            "poliartrite",
            "reumatóide",
            "oligoartrite",
            "entesite"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Etofenamato":
        entry['Doença(s)'] = [
            "lesões musculares",
            "lesões articulares",
            "contusões",
            "luxações",
            "entorses",
            "tendinite",
            "reumatismo",
            "artrite",
            "artrose"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Etoricoxib":
        entry['Doença(s)'] = [
            "osteoartrose",
            "artrite reumatoide",
            "espondilite anquilosante",
            "gota"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Everolímus":
        entry['Doença(s)'] = [
            "transplante de orgão"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Ezetimiba":
        entry['Doença(s)'] = [
            "dislipidemia"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Febuxostate":
        entry['Doença(s)'] = [
            "gota"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Felbamato":
        entry['Doença(s)'] = [
            "epilepsia",
            "síndrome de lennox-gastaut"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Fenitoína":
        entry['Doença(s)'] = [
            "epilepsia",
            "nevralgia do trigémio" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Fenobarbital" or entry['Substância Ativa/DCI'] == "Levetiracetam" or entry['Substância Ativa/DCI'] == "Perampanel" or entry['Substância Ativa/DCI'] == "Tiagabina" or entry['Substância Ativa/DCI'] == "Zonisamida":
        entry['Doença(s)'] = [
            "epilepsia"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Fenofibrato":
        entry['Doença(s)'] = [
            "hiperlipidemia"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Fentanilo":
        entry['Doença(s)'] = [
            "dor crónica grave"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Fexofenadina":
        entry['Doença(s)'] = [
            "rinite alérgica"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Filgrastim":
        entry['Doença(s)'] = [
            "neutropenia",
            "neutropenia febril",
            "doença maligna" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Finasterida":
        entry['Doença(s)'] = [
            "alopecia androgénica"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Finerenona":
        entry['Doença(s)'] = [
            "doença renal crónica",
            "diabetes tipo 2"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Flucloxacilina":
        entry['Doença(s)'] = [
            "infeção da pele",
            "furunculose",
            "carbúnculo",
            "abscesso",
            "impetigo",
            "celulite",
            "linfagite",
            "queimadura",
            "artrite",
            "osteíte",
            "osteomielite",
            "otite externa",
            "infeção do trato respiratório inferior",
            "abscesso pulmonar",
            "pneumonia",
            "broncopneumonia",
            "infeção do trato respiratório superior",
            "amigdalite",
            "tonsilite",
            "sinusite",
            "faringite",
            "empiema",
            "meningite",
            "infeção do trato urinário e genital",
            "infeção do intestino delgado e cólon",
            "endocardite",
            "bacteriemia"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Fluconazol":
        entry['Doença(s)'] = [
            "meningite criptocócica",
            "coccidioidomicose",
            "infeção na circulação sanguínea",
            "infeção nos orgãos",
            "infeção no trato urinário",
            "candidíase das mucosas",
            "candidíase genital",
            "infeção da pele",
            "tinea pedis (pé de atleta)",
            "micose",
            "infeção da virilha",
            "infeção nas unhas" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Fluoxetina":
        entry['Doença(s)'] = [
            "depressão",
            "perturbação obsessiva-compulsiva",
            "bulimia nervosa" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Fluticasona":
        entry['Doença(s)'] = [
            "rinite alérgica"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Fluticasona + Salmeterol":
        entry['Doença(s)'] = [
            "asma",
            "doença pulmonar obstrutiva crónica"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Fluvastatina":
        entry['Doença(s)'] = [
            "cateterismo cardíaco",
            "hipercolesterolemia"  
            ]

    elif entry['Substância Ativa/DCI'] == "Fluvoxamina":
        entry['Doença(s)'] = [
            "depressão",
            "perturbação obsessiva-compulsiva"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Folinato de cálcio":
        entry['Doença(s)'] = [
            "anemia megaloblástica",
            "sobredosagem de ácido fólico"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Formoterol":
        entry['Doença(s)'] = [
            "asma",
            "bronquite crónica",
            "enfisema",
            "doença pulmonar obstrutiva crónica"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Furosemida":
        entry['Doença(s)'] = [
            "edema",
            "doença cardíaca",
            "doença hepática",
            "síndrome nefrótico",
            "edema pulmonar",
            "hipertensão arterial"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Gabapentina":
        entry['Doença(s)'] = [
            "epilepsia",
            "dor neuropática periférica",
            "diabetes",
            "zona"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Galantamina":
        entry['Doença(s)'] = [
            "demência",
            "doença de alzheimer"  
            ] 
    
    elif entry['Substância Ativa/DCI'] == "Ganciclovir":
        entry['Doença(s)'] = [
            "infeção por citomegalovírus",
            "transplante de orgão",
            "cancro",
            "infeção pelo vírus da imunodeficiência humana (hiv)" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Gefitinib":
        entry['Doença(s)'] = [
            "cancro de pulmão de não pequenas células"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Gemcitabina":
        entry['Doença(s)'] = [
            "cancro de pulmão de não pequenas células"
            "cancro de pâncreas",
            "cancro de mama",
            "cancro do ovário",
            "cancro de bexiga"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Gemfibrozil":
        entry['Doença(s)'] = [
            "dislipidemia"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Glicerol":
        entry['Doença(s)'] = [
            "obstipação terminal"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Gliclazida" or entry['Substância Ativa/DCI'] == "Glimepirida" or entry['Substância Ativa/DCI'] == "Pioglitazona" or entry['Substância Ativa/DCI'] == "Sitagliptina" or entry['Substância Ativa/DCI'] == "Vildagliptina":
        entry['Doença(s)'] = [
            "diabetes mellitus tipo 2"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Glucosamina":
        entry['Doença(s)'] = [
            "osteoartrite"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Glucose":
        entry['Doença(s)'] = [
            "hipoglicemia",
            "desidratação" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Haloperidol":
        entry['Doença(s)'] = [
            "esquizofrenia",
            "transtorno bipolar",
            "síndrome de tourette",
            "doença de huntington"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Hidrocortisona":
        entry['Doença(s)'] = [
            "dermatite",
            "queimadura solar" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Hidromorfona":
        entry['Doença(s)'] = [
            "dor intensa"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Hidroquinona":
        entry['Doença(s)'] = [
            "hiperpigmentação da pele",
            "melasma",
            "cloasma",
            "sardas (efélides)",
            "lentigo senil",
            "lentigo solar" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ibuprofeno":
        entry['Doença(s)'] = [
            "osteoartrose",
            "artrite reumatoide",
            "artrite idiopática juvenil",
            "espondilite anquilosante",
            "periartrite escápulo-umeral",
            "reumatismo extra-articular",
            "lesões tecidos moles",
            "dismenorreia",
            "dor pós-episiotemia",
            "dor pós-parto",
            "dor de dente",
            "dor pós-cirurgia",
            "traumatismos",
            "entorses",
            "contusões",
            "luxações",
            "fraturas",
            "febre"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Ibuprofeno + Paracetamol":
        entry['Doença(s)'] = [
            "enxaqueca",
            "dores de cabeça",
            "dor lombar",
            "dor menstrual",
            "dor de dentes",
            "dor reumática",
            "dor muscular",
            "dor de garganta",
            "constipação",
            "gripe"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Imatinib":
        entry['Doença(s)'] = [
            "leucemia mielóide crónica",
            "leucemia linfoblástica aguda",
            "síndrome mielodisplásica",
            "doença mieloproliferativa",
            "síndrome hipereosinofílica",
            "leucemia eosinofílica crónica",
            "dermatofibrossarcoma protuberans"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Imunoglobulina humana normal":
        entry['Doença(s)'] = [
            "síndromes de imunodeficiência primária",
            "síndromes de imunodeficiência secundária",
            "trombocitopenia imune primária",
            "síndrome de guillain barré",
            "doença de kawasaki",
            "polirradiculoneuropatia desmielinizante inflamatória crónica",
            "neuropatia motora multifocal"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Infliximab":
        entry['Doença(s)'] = [
            "artrite reumatóide",
            "artrite psoriática",
            "espondilite anquilosante",
            "doença de bechterew",
            "psoríase",
            "doença de crohn",
            "colite ulcerosa"
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Interferão beta-1a":
        entry['Doença(s)'] = [
            "esclerose múltipla"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Iodopovidona":
        entry['Doença(s)'] = [
            "infeção da pele",
            "tinea pedis (pé de atleta)"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Irbesartan":
        entry['Doença(s)'] = [
            "diabetes mellitus tipo 2",
            "hipertensão arterial",
            "insuficiência renal"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Itraconazol":
        entry['Doença(s)'] = [
            "infeção vaginal",
            "infeção da pele",
            "infeção da cavidade oral",
            "infeção oftalmológica",
            "infeção nas unhas",
            "infeção nos orgãos" 
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Ivabradina":
        entry['Doença(s)'] = [
            "angina de peito",
            "insuficiência cardíaca" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lacosamida":
        entry['Doença(s)'] = [
            "epilepsia"  
            ] 
        
    elif entry['Substância Ativa/DCI'] == "Lactobacillus casei":
        entry['Doença(s)'] = [
            "diarreia"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lactulose":
        entry['Doença(s)'] = [
            "obstipação",
            "encefalopatia hepática",
            "encefalopatia porto-sistémica"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lamivudina":
        entry['Doença(s)'] = [
            "infeção pelo vírus da imunodeficiência humana (hiv)"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lamotrigina":
        entry['Doença(s)'] = [
            "epilepsia",
            "transtorno bipolar",
            "síndrome de lennox-gastaut" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lanreotida":
        entry['Doença(s)'] = [
            "tumores neuroendócrinos gastroenteropancreáticos",
            "tumor do intestino",
            "tumor do pâncreas",
            "acromegalia" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lansoprazol":
        entry['Doença(s)'] = [
            "úlcera gástrica",
            "úlcera duodenal",
            "esofagite de refluxo",
            "azia",
            "regurgitação ácida",
            "síndrome de zollinger-ellison"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Leflunomida":
        entry['Doença(s)'] = [
            "artrite reumatóide",
            "artrite psoriática" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lenalidomida":
        entry['Doença(s)'] = [
            "mieloma múltiplo",
            "síndromes mielodisplásicas",
            "linfoma de células do manto",
            "linfoma folicular"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Letrozol":
        entry['Doença(s)'] = [
            "cancro da mama"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Leuprorrelina":
        entry['Doença(s)'] = [
            "cancro da próstata"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Levobupivacaína":
        entry['Doença(s)'] = [
            "grande cirurgia"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Levocetirizina":
        entry['Doença(s)'] = [
            "rinite alérgica",
            "erupção urticária"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Levofloxacina":
        entry['Doença(s)'] = [
            "infeção dos seios nasais",
            "infeção pulmonar",
            "pneumonia",
            "infeção do trato urinário",
            "infeção da próstata",
            "infeção da pele e tecidos moles",
            "antraz"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Levotiroxina sódica":
        entry['Doença(s)'] = [
            "bócio",
            "cirurgia do bócio",
            "cancro de tireoide"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lidocaína" or entry['Substância Ativa/DCI'] == "Lidocaína + Adrenalina" or entry['Substância Ativa/DCI'] == "Lidocaína + Cloro-hexidina" or entry['Substância Ativa/DCI'] == "Mepivacaína" or entry['Substância Ativa/DCI'] == "Mepivacaína + Adrenalina" or entry['Substância Ativa/DCI'] == "Midazolam" or entry['Substância Ativa/DCI'] == "Propofol" or entry['Substância Ativa/DCI'] == "Ropivacaína" or entry['Substância Ativa/DCI'] == "Sevoflurano":
        entry['Doença(s)'] = [
            "anestésico"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Linezolida":
        entry['Doença(s)'] = [
            "pneumonia",
            "infeção da pele e tecidos moles"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Liraglutido":
        entry['Doença(s)'] = [
            "obesidade",
            "disglicemia",
            "diabetes mellitus tipo 2",
            "hipertensão arterial",
            "dislipidemia",
            "apneia obstrutiva do sono" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lisinopril":
        entry['Doença(s)'] = [
            "hipertensão essencial",
            "hipertensão renovascular",
            "insuficiência cardíaca congestiva",
            "diabetes mellitus",
            "retinopatia",
            "nefropatia"
            ]
         
    elif entry['Substância Ativa/DCI'] == "Lopinavir + Ritonavir":
        entry['Doença(s)'] = [
            "infeção pelo vírus da imunodeficiência humana tipo 1 (hiv-1)"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Loratadina":
        entry['Doença(s)'] = [
            "rinite alérgica",
            "urticária"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Lorazepam":
        entry['Doença(s)'] = [
            "ansiedade",
            "insónia" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Losartan":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "diabetes mellitus tipo 2",
            "insuficiência cardíaca crónica"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Maprotilina" or entry['Substância Ativa/DCI'] == "Tianeptina":
        entry['Doença(s)'] = [
            "depressão"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Mebendazol":
        entry['Doença(s)'] = [
            "parasitose intestinal"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Mebeverina":
        entry['Doença(s)'] = [
            "síndrome do intestino irritável"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Melatonina":
        entry['Doença(s)'] = [
            "insónia primária"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Meloxicam":
        entry['Doença(s)'] = [
            "osteoartrite",
            "artrite reumatoide",
            "espondilite anquilosante",
            "doença de bechterew"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Melperona":
        entry['Doença(s)'] = [
            "esquizofrenia",
            "síndrome da abstinência alcoólica",
            "distúrbios do comportamento",
            "neurose ansiosa",
            "inquietação noturna"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Memantina" or entry['Substância Ativa/DCI'] == "Rivastigmina":
        entry['Doença(s)'] = [
            "doença de alzheimer"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Meropenem":
        entry['Doença(s)'] = [
            "pneumonia",
            "fibrose quística",
            "infeção do sistema urinário",
            "infeção abdominal",
            "infeção da pele e tecidos moles",
            "meningite",
            "neutropenia",
            "infeção bacteriana do sangue"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Messalazina":
        entry['Doença(s)'] = [
            "colite ulcerosa",
            "doença de crohn"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Metamizol magnésico":
        entry['Doença(s)'] = [
            "dor moderada a grave"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Metformina" or entry['Substância Ativa/DCI'] == "Metformina + Dapagliflozina" or entry['Substância Ativa/DCI'] == "Metformina + Linagliptina" or entry['Substância Ativa/DCI'] == "Metformina + Pioglitazona" or entry['Substância Ativa/DCI'] == "Metformina + Saxagliptina" or entry['Substância Ativa/DCI'] == "Metformina + Sitagliptina" or entry['Substância Ativa/DCI'] == "Metformina + Vildagliptina":
        entry['Doença(s)'] = [
            "diabetes mellitus tipo 2"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Metilfenidato":
        entry['Doença(s)'] = [
            "perturbação de hiperatividade e défice de atenção"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Metilprednisolona":
        entry['Doença(s)'] = [
            "insuficiência adrenocortical",
            "hiperplasia suprarenal congénita",
            "hipercalcemia associada a cancro",
            "tiroidite não supurativa",
            "osteoartrite pós-traumática",
            "sinovites de osteoartrite",
            "artrite reumatóide",
            "artrite reumatóide juvenil",
            "bursite",
            "epicondilite",
            "tenosinovite",
            "artrite gotosa",
            "artrite psoriática",
            "espondilite anquilosante",
            "lúpus eritematoso",
            "dermatomiosite sistémica",
            "polimiosite",
            "endocardite reumática",
            "pênfigo",
            "eritema multiforme",
            "síndrome de stevens-johnson",
            "dermatite exfoliativa",
            "micose fungóide",
            "dermatite bulhosa herpetiforme",
            "dermatite seborreica",
            "psoríase",
            "asma brônquica",
            "dermatite de contacto",
            "dermatite atópica",
            "doença de soro",
            "rinite alérgica",
            "edema laríngeo",
            "herpes zoster oftálmico",
            "irite",
            "iridociclite",
            "corioretinite",
            "uveite posterior difusa",
            "nevrite ótica",
            "inflamação do segmento anterior",
            "conjuntivite alérgica",
            "úlcera alérgica marginal da córnea",
            "queratite",
            "colite ulcerosa",
            "enterite regional",
            "tuberculose pulmonar",
            "sarcoidose",
            "beriliose",
            "síndrome de loefler",
            "pneumonia por aspiração",
            "anemia hemolítica",
            "trombocitopénia",
            "eritroblastopénia",
            "anemia hipoplásica congénita",
            "leucemia",
            "linfoma",
            "síndrome nefrótica",
            "esclerose múltipla",
            "meningite tuberculosa",
            "triquinose",
            "quelóide",
            "líquen planus",
            "granuloma anular",
            "neurodermatite",
            "lúpus eritematoso discóide",
            "necrobiosis lipódica diabeticorum",
            "alopécia areata",
            "tumor quístico"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Metoclopramida":
        entry['Doença(s)'] = [
            "náusea",
            "vómito",
            "enxaqueca" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Metotrexato":
        entry['Doença(s)'] = [
            "artrite reumatoide ativa",
            "artrite idiopática juvenil",
            "psoríase",
            "doença de crohn",
            "leucemia linfoblástica (cancro do sangue)",
            "leucemia meníngea",
            "linfoma meníngeo",
            "linfoma maligno não-Hodgkin (cancro do sistema linfático)",
            "micose fungoide (linfoma cutâneo das células T)",
            "coriocarcinoma",
            "tumores das células germinais do ovário",
            "tumores trofoblásticos",
            "cancro da mama",
            "cancro dos pulmões",
            "cancro da bexiga",
            "cancro espinocelular da cabeça e pescoço",
            "osteossarcoma",
            "doença do enxerto versus hospedeiro nos transplantes de medula óssea"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Metronidazol":
        entry['Doença(s)'] = [
            "vaginite",
            "uretrite",
            "giardíase/lamblíase intestinal",
            "amibíase intestinal e hepática"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Micafungina":
        entry['Doença(s)'] = [
            "candidíase invasiva",
            "candidíase esofágica"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Micofenolato de mofetil":
        entry['Doença(s)'] = [
            "transplante cardíaco",
            "transplante renal",
            "transplante hepático" 
            ]

    elif entry['Substância Ativa/DCI'] == "Midazolam":
        entry['Doença(s)'] = [
            "psicose"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Minociclina":
        entry['Doença(s)'] = [
            "infeção do trato respiratório",
            "bronquite",
            "bronquiectasia",
            "abscesso pulmonar",
            "pneumonia",
            "infeção do trato urinário",
            "prostatite",
            "gonorréia",
            "uretrite",
            "doença inflamatória pélvica",
            "infeção otorrinolaringológica",
            "infeção da pele e tecidos moles",
            "periodontite",
            "gengivite",
            "abscesso dentário"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Minoxidil":
        entry['Doença(s)'] = [
            "alopecia androgénica"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Mirabegrom" or entry['Substância Ativa/DCI'] == "Solifenacina":
        entry['Doença(s)'] = [
            "bexiga hiperativa"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Mirtazapina" or entry['Substância Ativa/DCI'] == "Vortioxetina":
        entry['Doença(s)'] = [
            "depressão"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Mometasona":
        entry['Doença(s)'] = [
            "dermatose",
            "psoríase",
            "eczema atópico",
            "eczema de contacto"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Mononitrato de isossorbida":
        entry['Doença(s)'] = [
            "doença cardíaca isquêmica",
            "angina de peito",
            "enfarte do miocárdio",
            "hipertensão pulmonar",
            "insuficiência cardíaca"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Montelucaste":
        entry['Doença(s)'] = [
            "asma",
            "rinite alérgica" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Moroctocog alfa":
        entry['Doença(s)'] = [
            "hemofilia a"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Moxifloxacina":
        entry['Doença(s)'] = [
            "infeção dos seios perinasais",
            "pneumonia",
            "doença inflamatória pélvica",
            "infeção das trompas de falópio",
            "infeção da membrana mucosa do útero"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Mupirocina":
        entry['Doença(s)'] = [
            "infeção da pele",
            "impetigo",
            "foliculite",
            "furunculose",
            "dermatite atópica",
            "dermatite eczematosa",
            "dermatite de contacto"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Naloxona" or entry['Substância Ativa/DCI'] == "Naltrexona":
        entry['Doença(s)'] = [
            "sobredosagem de opiáceos"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Naproxeno":
        entry['Doença(s)'] = [
            "artrite reumatóide",
            "artrite reumatóide juvenil",
            "osteoartrite",
            "artrite degenerativa",
            "espondilite anquilosante",
            "gota",
            "bursite",
            "tendinite",
            "sinovite",
            "tenossinovite",
            "lumbago",
            "distensão",
            "entorse",
            "extração dentária",
            "menorragia",
            "dismenorreia",
            "doença infeciosa",
            "enxaqueca" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Nebivolol":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "insuficiência cardíaca"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Nepafenac":
        entry['Doença(s)'] = [
            "inflamação ocular",
            "cataratas",
            "edema macular diabético" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Nicotina":
        entry['Doença(s)'] = [
            "dependência de nicotina"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Nifedipina":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "doença coronária",
            "angina de peito" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Nimesulida":
        entry['Doença(s)'] = [
            "dor aguda",
            "dor menstrual"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Nitisinona":
        entry['Doença(s)'] = [
            "tirosinemia hereditária do tipo 1 (HT-1)",
            "alcaptonúria (AKU)"
        ]

    elif entry['Substância Ativa/DCI'] == "Norfloxacina":
        entry['Doença(s)'] = [
            "infeção do trato urinário",
            "cistite",
            "pielite",
            "gastroenterite bacteriana",
            "neutropenia" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Octreotido":
        entry['Doença(s)'] = [
            "acromegalia",
            "tumor do trato gastrointestinal",
            "tumor carcinoide",
            "vipomas",
            "glucagonomas",
            "gastrinomas",
            "insulinomas",
            "cirurgia pancreática",
            "cirrose",
            "tumor hipofisário" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ofloxacina":
        entry['Doença(s)'] = [
            "otite externa",
            "otite média crónica supurativa",
            "otite média aguda"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Olanzapina":
        entry['Doença(s)'] = [
            "esquizofrenia",
            "transtorno bipolar"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Olmesartan medoxomilo" or entry['Substância Ativa/DCI'] == "Olmesartan medoxomilo + Hidroclorotiazida" or entry['Substância Ativa/DCI'] == "Telmisartan" or entry['Substância Ativa/DCI'] == "Telmisartan + Hidroclorotiazida": 
        entry['Doença(s)'] = [
            "hipertensão arterial" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Omeprazol":
        entry['Doença(s)'] = [
            "doença do refluxo gastroesofágico (DRGE)",
            "úlcera duodenal",
            "úlcera gástrica"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ondansetrom":
        entry['Doença(s)'] = [
            "cancro",
            "náusea",
            "vómito"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Oxcarbazepina":
        entry['Doença(s)'] = [
            "epilepsia",
            "nevralgia do trigémio"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Oxicodona + Naloxona":
        entry['Doença(s)'] = [
            "dor intensa",
            "síndrome das pernas inquietas"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Oxitocina":
        entry['Doença(s)'] = [
            "indução do trabalho de parto",
            "controlo hemorragia pós-parto"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Paliperidona":
        entry['Doença(s)'] = [
            "esquizofrenia"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Pantoprazol":
        entry['Doença(s)'] = [
            "doença do refluxo gastroesofágico (DRGE)",
            "esofagite de refluxo",
            "síndrome de zollinger-ellison"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Paricalcitol":
        entry['Doença(s)'] = [
            "hiperparatiroidismo",
            "insuficiência renal"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Paroxetina":
        entry['Doença(s)'] = [
            "depressão",
            "transtorno de ansiedade",
            "transtorno obsessivo-compulsivo",
            "transtorno de pânico",
            "perturbação de ansiedade social",
            "agorafobia",
            "transtorno de stress pós-traumático",
            "perturbação de ansiedade generalizada"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Perindopril":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "doença arterial coronária",
            "ataque cardíaco"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Perindopril + Amlodipina":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "doença arterial coronária" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Piperacilina + Tazobactam":
        entry['Doença(s)'] = [
            "infeção do trato respiratório inferior",
            "infeção do trato urinário",
            "infeção abdominal",
            "infeção da pele",
            "infeção do sangue",
            "apendicite",
            "peritonite",
            "infeção da vesícula biliar"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Pirfenidona":
        entry['Doença(s)'] = [
            "fibrose pulmonar idiopática"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Piroxicam":
        entry['Doença(s)'] = [
            "osteoartrose",
            "artrite",
            "artrose",
            "inflamação musculoesquelética",
            "inflamação dos tendões",
            "infeção osteoarticular",
            "luxação",
            "lombalgia" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Pitavastatina":
        entry['Doença(s)'] = [
            "hipercolesterolemia",
            "dislipidemia"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Posaconazol":
        entry['Doença(s)'] = [
            "infeções fungais",
            "aspergilose invasiva",
            "fusariose",
            "cromoblastomicose",
            "micetoma",
            "coccidioidomicose",
            "candidíase orofaríngea",
            "leucemia mielóide aguda",
            "síndrome mielodisplásica",
            "transplante de células estaminais hematopoiéticas",
            "doença do enxerto contra hospedeiro"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Pravastatina":
        entry['Doença(s)'] = [
            "acidente vascular cerebral (AVC)",
            "ataque cardíaco",
            "angina instável",
            "transplante de orgão",
            "hipercolesterolemia"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Prednisolona":
        entry['Doença(s)'] = [
            "alergia cutânea",
            "eczema endógeno",
            "dermatite atópica",
            "neurodermatite",
            "eczema de contacto",
            "eczema degenerativo",
            "eczema numular",
            "eczema infantil" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Pregabalina":
        entry['Doença(s)'] = [
            "epilepsia",
            "dor neuropática",
            "perturbação de ansiedade generalizada",
            "diabetes",
            "zona"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Propranolol":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "angina",
            "arritmia",
            "ataque cardíaco",
            "enxaqueca",
            "tremor essencial",
            "ansiedade",
            "tireotoxicose",
            "feocromocitoma" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Quetiapina":
        entry['Doença(s)'] = [
            "depressão bipolar",
            "esquizofrenia"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Rabeprazol":
        entry['Doença(s)'] = [
            "doença de refluxo gastroesofágico (DRGE)",
            "úlcera gástrica",
            "úlcera duodenal",
            "síndrome de zollinger-ellison" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ramipril":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "doença renal",
            "insuficiência cardíaca",
            "enfarte do miocárdio" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ranolazina":
        entry['Doença(s)'] = [
            "angina"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Retinol":
        entry['Doença(s)'] = [
            "hipossecreção conjuntival",
            "irritação ocular" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Rifampicina":
        entry['Doença(s)'] = [
            "tuberculose",
            "lepra",
            "brucelose"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Risedronato de sódio" or entry['Substância Ativa/DCI'] == "Ácido alendrónico" or entry['Substância Ativa/DCI'] == "Ácido ibandrónico":
        entry['Doença(s)'] = [
            "osteoporose"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Risperidona":
        entry['Doença(s)'] = [
            "esquizofrenia",
            "transtorno bipolar",
            "demência",
            "doença de alzheimer",
            "atraso intelectual"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ritonavir":
        entry['Doença(s)'] = [
            "infeção pelo vírus da imunodeficiência humana tipo 1 (hiv-1)"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Rivaroxabano":
        entry['Doença(s)'] = [
            "artroplastia da anca",
            "artroplastia do joelho",
            "trombose venosa profunda",
            "embolismo pulmonar"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Roflumilaste":
        entry['Doença(s)'] = [
            "doença pulmonar obstrutiva crónica",
            "bronquite crónica"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ropinirol":
        entry['Doença(s)'] = [
            "síndrome das pernas inquietas (síndrome de Ekbom)"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Salbutamol":
        entry['Doença(s)'] = [
            "asma",
            "bronquite"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Salmeterol":
        entry['Doença(s)'] = [
            "asma"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sapropterina":
        entry['Doença(s)'] = [
            "hiperfenilalaninemia",
            "fenilcetonúria",
            "deficiência em BH4"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sertaconazol":
        entry['Doença(s)'] = [
            "dermatomicoses",
            "tinea pedis (pé de atleta)",
            "pitiríase versicolor",
            "vulvovaginite"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sertralina":
        entry['Doença(s)'] = [
            "depressão",
            "perturbação de ansiedade social",
            "perturbação de stress pós-traumático",
            "perturbação de pânico",
            "perturbação obsessiva-compulsiva"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sevelâmero":
        entry['Doença(s)'] = [
            "hiperfosfatemia",
            "doença renal crónica"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sildenafil":
        entry['Doença(s)'] = [
            "disfunção erétil",
            "hipertensão arterial pulmonar"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Simoctocog alfa":
        entry['Doença(s)'] = [
            "hemofilia A (deficiência congénita do fator VII)"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Somatropina":
        entry['Doença(s)'] = [
            "deficiência da hormona do crescimento",
            "síndrome de Turner",
            "insuficiência renal crónica",
            "síndrome de Prader-Willi",
            "síndrome de Noonan"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sugamadex" or entry['Substância Ativa/DCI'] == "Tiocolquicosido":
        entry['Doença(s)'] = [
            "relaxante muscular"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sulfametoxazol + Trimetoprim":
        entry['Doença(s)'] = [
            "infeção do trato respiratório",
            "bronquite crónica",
            "pneumonia",
            "faringite",
            "amigdalite",
            "sinusite",
            "otite média",
            "cistite",
            "pielonefrite",
            "uretrite",
            "prostatite",
            "infeções do trato gastrointestinal",
            "febre tifóide",
            "febre paratifóide",
            "disenteria bacilar",
            "cólera",
            "infeção da pele e tecidos moles",
            "piodermite",
            "furunculose",
            "osteomielite",
            "brucelose",
            "nocardiose",
            "actinomicetoma",
            "blastomicose sul-americana"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Sunitinib":
        entry['Doença(s)'] = [
            "tumor maligno do estroma gastrointestinal (GIST)",
            "carcinoma de células renais metastático (MRCC)",
            "tumor neuroendócrino pancreático (pNET)"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Tacrolímus":
        entry['Doença(s)'] = [
            "dermatite atópica",
            "eczema" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Tadalafil":
        entry['Doença(s)'] = [
            "disfunção erétil"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Tenofovir":
        entry['Doença(s)'] = [
            "infeção pelo vírus da imunodeficiência humana tipo 1 (hiv-1)",
            "hepatite B",
            "doença hepática",
            "fibrose"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Terbinafina":
        entry['Doença(s)'] = [
            "tinea pedis (pé de atleta)",
            "tinea crural ou da virilha",
            "tinea do corpo",
            "pitiríase versicolor" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Teriflunomida":
        entry['Doença(s)'] = [
           "esclerose múltipla surto-remissão"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ticlopidina":
        entry['Doença(s)'] = [
            "acidente vascular cerebral (AVC)",
            "déficit neurológico de origem isquêmica",
            "acidente isquémico transitório (AIT)",
            "cegueira unilateral transitória",
            "arteriopatia",
            "oclusão"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Timolol" or entry['Substância Ativa/DCI'] == "Travoprost":
        entry['Doença(s)'] = [
            "hipertensão intraocular"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Tirotricina + Benzocaína":
        entry['Doença(s)'] = [
            "infeção da cavidade bucal",
            "infeção da orofaringe",
            "faringite",
            "laringite",
            "estomatite",
            "gengivite",
            "afta" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Tobramicina":
        entry['Doença(s)'] = [
            "fibrose quística",
            ]
        
    elif entry['Substância Ativa/DCI'] == "Tocilizumab":
        entry['Doença(s)'] = [
            "artrite reumatóide",
            "arterite das células gigantes (ACG)",
            "artrite idiopática juvenil" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Topiramato":
        entry['Doença(s)'] = [
            "convulsão",
            "enxaqueca"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Toxina botulínica A":
        entry['Doença(s)'] = [
            "incontinência urinária",
            "enxaqueca",
            "paralisia cerebral",
            "espasmos musculares",
            "acidente vascular cerebral (AVC)",
            "bexiga hiperativa",
            "esclerose múltipla"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Tramadol":
        entry['Doença(s)'] = [
            "dor moderada a intensa",
            "tumor",
            "traumatismo",
            "fratura",
            "problema circulatório",
            "enfarte do miocárdio",
            "cólica renal",
            "lumbago"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Trandolapril":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "disfunção ventricular",
            "enfarte do miocárdio",
            "insuficiência cardíaca congestiva"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Triflusal":
        entry['Doença(s)'] = [
            "enfarte do miocárdio",
            "angina instável",
            "acidente vascular cerebral (AVC)",
            "fibrilhação auricular",
            "cirurgia by-pass coronário"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ustecinumab":
        entry['Doença(s)'] = [
            "psoríase em placas",
            "artrite psoriática",
            "doença de Crohn",
            "colite ulcerosa"
            ]
        
    elif "Vacina" in entry['Substância Ativa/DCI']:
        entry['Doença(s)'] = [
            "vacina"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Valaciclovir":
        entry['Doença(s)'] = [
            "herpes zoster",
            "zona",
            "infeções por herpes simplex",
            "herpes genital",
            "herpes labial",
            "infeção por citomegalovírus",
            "transplante de orgão",
            "infeção ocular por herpes simplex"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Valsartan":
        entry['Doença(s)'] = [
            "hipertensão arterial",
            "enfarte do miocárdio",
            "insuficiência cardíaca"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Venlafaxina":
        entry['Doença(s)'] = [
            "depressão",
            "perturbação de ansiedade generalizada",
            "perturbação de ansiedade social",
            "perturbação de pânico"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Verapamilo":
        entry['Doença(s)'] = [
            "insuficiência cardíaca crónica",
            "angina de peito",
            "espasmos coronários",
            "angina vasoespástica",
            "enfarte do miocárdio",
            "hipertensão arterial",
            "taquicardia supraventricular paroxística",
            "fibrilhação/flutter auricular",
            "taquiarritmia",
            "extra-sistolia"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Vinorrelbina":
        entry['Doença(s)'] = [
            "cancro pulmonar não-microcelular",
            "cancro de mama" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Vinpocetina":
        entry['Doença(s)'] = [
            "oclusão cerebro-vascular",
            "aterosclerose cerebral",
            "aterosclerose periférica",
            "aterosclerose",
            "lesão vascular oclusiva de retina",
            "lesão vascular oclusiva otorrinolaringológicas"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Voriconazol":
        entry['Doença(s)'] = [
            "aspergilose invasiva",
            "candidemia",
            "infeção fúngica"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Xilometazolina" or entry['Substância Ativa/DCI'] == "Xilometazolina + Dexpantenol":
        entry['Doença(s)'] = [
            "rinite",
            "sinusite" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ziprasidona":
        entry['Doença(s)'] = [
            "esquizofrenia",
            "transtorno bipolar"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Zolmitriptano":
        entry['Doença(s)'] = [
            "enxaqueca"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Zolpidem":
        entry['Doença(s)'] = [
            "insónia",
            "ansiedade" 
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ácido acetilsalicílico":
        entry['Doença(s)'] = [
            "enfarte do miocárdio",
            "angina de peito instável",
            "acidente vascular cerebral (AVC)",
            "cardiopatia isquémica"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ácido acetilsalicílico + Atorvastatina + Ramipril":
        entry['Doença(s)'] = [
            "acidente vascular cerebral (AVC)",
            "enfarte agudo do miocárdio"
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ácido alendrónico + Colecalciferol":
        entry['Doença(s)'] = [
            "osteoporose",
            "deficiência de vitamina D"  
            ]
        
    elif entry['Substância Ativa/DCI'] == "Ciamemazina":
        entry['Doença(s)'] = [
            "psicose"  
            ]


# Converter a estrutura de dicionário em JSON
json_data = json.dumps(data, indent=4, ensure_ascii=False)

# print(json_data)

alt = open("medicamentos_doenças_bd.json", "w", encoding="UTF8")
alt.write(json_data)
alt.close()
