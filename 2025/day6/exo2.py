import re
from functools import reduce

score = 0

with open("input/exo1.txt") as f:
    lignes = f.readlines()

# Dictionnaire des opérateurs possibles
operations = {
    "+": lambda x, y: x + y,
    "*": lambda x, y: x * y,
    "-": lambda x, y: x - y,
    # Ajoute d'autres opérateurs si besoin
}

######
nb_lignes = len(lignes)
index_debuts_operations = []
list_operations = []
longueur_ligne = len(lignes[0])

# On parcourt la liste des opérations pour récupérer l'index de début de chaque opérations
ligne_operation = lignes[nb_lignes - 1]
for i in range(len(ligne_operation) - 1):
    if ligne_operation[i] != ' ':
        index_debuts_operations.append(i)
        list_operations.append(operations[ligne_operation[i]])



# Construction tableau vide pour chaque opération
all_problems = []
nb_problems = len(index_debuts_operations)

for i in range(nb_problems):
    problem_courant = []
    index_debut = index_debuts_operations[i]
    index_fin = index_debuts_operations[i + 1] if i + 1 < nb_problems else longueur_ligne

    # Récupération des string pour chaque ligne pour l'opération en cours
    for j in range(nb_lignes - 1):
        problem_courant.append(lignes[j][index_debut:index_fin - 1])

    max_size = max(len(nombre) for nombre in problem_courant)
    # On remplaces les '' par des X dans chaque string pour ensuite les fusionner "verticalement"
    problem_courant =  [s.replace(' ', 'X') for s in problem_courant]

    # Fusion verticale
    resultat_avec_X = [
        ''.join([s[i] for s in problem_courant])
        for i in range(len(problem_courant[0]))
    ]

    # 4. Supprime les "X" du résultat
    resultat_final = [s.replace('X', '') for s in resultat_avec_X]
    resulat_final_int = list(map(lambda x: int(x), resultat_final))

    # 5. Ajout de l'opérateur
    resultat = reduce(list_operations[i], resulat_final_int)
    score += resultat


# -----------------------------------------
print(score)
