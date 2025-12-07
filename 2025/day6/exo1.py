import re
from functools import reduce

score = 0

with open("input/exo1.txt") as f:
    lignes = f.readlines()

######
nb_lignes = len(lignes)
all_problems = []
nb_problems = len(re.sub(r'\s+', ' ', lignes[0].rstrip("\n")).split(' '))

for i in range(nb_problems):
    all_problems.append([])


# Construction tableau
for i in range(nb_lignes - 1):
    strip = lignes[i].rstrip("\n").strip()
    strip = re.sub(r'\s+', ' ', strip)

    ligne = list(map(lambda x: int(x), strip.split(' ')))
    for j in range(len(ligne)):
        all_problems[j].append(int(ligne[j]))

# Operations
list_operations = re.sub(r'\s+', ' ', lignes[i + 1].rstrip("\n")).split(' ')

print(list_operations)
print(all_problems)

# Dictionnaire des opérateurs possibles
operations = {
    "+": lambda x, y: x + y,
    "*": lambda x, y: x * y,
    "-": lambda x, y: x - y,
    # Ajoute d'autres opérateurs si besoin
}

# -----------------------------------------
for j in range(len(all_problems)):
    print(list_operations[j])
    resultat = reduce(operations[list_operations[j]], all_problems[j])
    score += resultat
print(score)
