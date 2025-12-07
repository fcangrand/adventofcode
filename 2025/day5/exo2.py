fresh_ids = []

with open("input/exo1.txt") as f:
    lignes = [ligne.rstrip('\n') for ligne in f.readlines()]

print('--- Début traitement ---')

# Construction liste ids fresh
i = 0
while lignes[i] != '':
    (min_id, max_id) = lignes[i].split('-')
    # Vérifier si la range chevauche une range déjà existante
    j = 0
    while j < len(fresh_ids):
        (existing_min, existing_max) = fresh_ids[j]
        if int(min_id) <= existing_max and int(max_id) >= existing_min:
            # Il y a chevauchement, on fusionne les ranges
            new_min = min(int(min_id), existing_min)
            new_max = max(int(max_id), existing_max)
            fresh_ids[j] = [new_min, new_max]
            break
        j += 1
    if j == len(fresh_ids):
        fresh_ids.append([int(min_id), int(max_id)])
    i += 1

print('Ranges initiales fusionnées :')
print(fresh_ids)


# Fusionner les ranges qui se chevauchent
i = 0
while i < len(fresh_ids):
    j = 0
    while j < len(fresh_ids):
        if i != j:
            (min_i, max_i) = fresh_ids[i]
            (min_j, max_j) = fresh_ids[j]
            if min_i <= max_j and max_i >= min_j:
                # Fusionner les deux ranges
                new_min = min(min_i, min_j)
                new_max = max(max_i, max_j)

                # On met à jour la range i et on supprime la range j
                fresh_ids[i] = [new_min, new_max]
                del fresh_ids[j]

                # Ajuster les indices après la suppression
                # Si on a supprimé un élément apres i, on doit décrémenter i (pour rester sur le même élément)
                if i < j:
                    i -= 1
                j -= 1
        j += 1
    i += 1

print('Nettoyages :')
print(fresh_ids)
# -----------------------------------------
print('Calcul score')
score = 0

# On fait la différence entre les bornes min et max de chaque range
for (min_id, max_id) in fresh_ids:
    score += (max_id - min_id + 1)


print(score)
