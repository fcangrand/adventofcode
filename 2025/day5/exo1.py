
score = 0

fresh_ids = []

with open("input/exo1.txt") as f:
    lignes = [ligne.rstrip('\n') for ligne in f.readlines()]

print('--- Début traitement ---')

# Construction liste ids fresh
i = 0
while lignes[i] != '':
    (min_id, max_id) = lignes[i].split('-')
    # Algo simple : on stocke toutes les ranges dans une liste
    fresh_ids.append([int(min_id), int(max_id)])
    i += 1

i += 1  # on saute la ligne vide

print('--- Construction ---')


for j in range(i, len(lignes)):
    for k in range(len(fresh_ids)):
        if fresh_ids[k][0] <= int(lignes[j]) <= fresh_ids[k][1]:
            score += 1
            break


# -----------------------------------------

print(score)
