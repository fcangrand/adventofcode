score = 0

with open("input/exo1.txt") as f:
    lignes = f.readlines()

######


tachyions_index = []
longueur_ligne = len(lignes[0])

# 1. On trouve l'index de départ
for j in range(longueur_ligne):
    if lignes[0][j] == 'S':
        tachyions_index.append(j)


# 2. On parcourt les lignes
for i in range(1, len(lignes)):
    ligne_courante = lignes[i]
    for j in range(longueur_ligne):

        index_suivants_a_ajouter = []
        index_precedents_a_ajouter = []

        # On regarde si on est sur un tachyon et que l'on a un conflit
        if j in tachyions_index and ligne_courante[j] == '^':
            # On incrémente le compteur de split
            score += 1

            # On supprime l'index courant:
            tachyions_index.remove(j)

            # On gère le split gauche
            index_precedent = j-1
            if index_precedent >= 0:
                index_precedents_a_ajouter.append(index_precedent)

            # On prepare ajout index suivant (en attendant fin tour boucle)
            if j < longueur_ligne - 1:
                index_suivants_a_ajouter.append(j+1)

        # Fin tour boucle, on ajoute les nouveaux index
        for index_precedent in index_precedents_a_ajouter:
            if index_precedent not in tachyions_index:
                tachyions_index.append(index_precedent)

        # Fin tour boucle, on ajoute les nouveaux index
        for index_suivant in index_suivants_a_ajouter:
            if index_suivant not in tachyions_index:
                tachyions_index.append(index_suivant)




print(score)