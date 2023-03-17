import os

# ottieni il percorso completo della cartella in cui si trova lo script
percorso_script = os.path.dirname(os.path.abspath(__file__))

# elenco di tutti i file nella cartella
elenco_file = os.listdir(percorso_script)

# contatore per tenere traccia del numero di file rinominati
contatore = 1

# per ogni file nella cartella
for nome_file in elenco_file:
    
    # ottenere il percorso completo del file
    percorso_file = os.path.join(percorso_script, nome_file)
    
    # se il percorso è per una cartella, saltare al prossimo file
    if os.path.isdir(percorso_file):
        continue
    
    # creare un nuovo nome di file con un numero progressivo
    nuovo_nome = str(contatore) + os.path.splitext(nome_file)[1]
    
    # creare il percorso completo per il nuovo nome di file
    nuovo_percorso = os.path.join(percorso_script, nuovo_nome)
    
    # rinominare il file
    os.rename(percorso_file, nuovo_percorso)
    
    # incrementare il contatore
    contatore += 1