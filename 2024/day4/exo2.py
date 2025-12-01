score = 0

with open("input/exo1.txt") as f:
    lignes = f.readlines()

ligne_longueur = len(lignes[0])
nb_lignes = len(lignes)


def recuperation_diagonale_haut_droite(index_x, index_ligne):
    return lignes[index_ligne - 1][index_x + 1]


def recuperation_diagonale_haut_gauche(index_x, index_ligne):
    return lignes[index_ligne - 1][index_x - 1]


def recuperation_diagonale_bas_droite(index_x, index_ligne):
    return lignes[index_ligne + 1][index_x + 1]


def recuperation_diagonale_bas_gauche(index_x, index_ligne):
    return lignes[index_ligne + 1][index_x - 1]


def verification_caracteres(index_x, index_ligne):
    diagonale_gauche = [recuperation_diagonale_haut_gauche(index_x, index_ligne),
                        recuperation_diagonale_bas_droite(index_x, index_ligne)]
    diagonale_droite = [recuperation_diagonale_haut_droite(index_x, index_ligne),
                        recuperation_diagonale_bas_gauche(index_x, index_ligne)]

    return diagonale_gauche.count('M') == 1 and diagonale_droite.count('M') == 1 and diagonale_gauche.count('S') == 1 and diagonale_droite.count('S') == 1


def verification_ligne(p_ligne, index_ligne):
    score_ligne = 0
    for i in range(1, len(p_ligne) - 1):
        if p_ligne[i] == 'A' and verification_caracteres(i, index_ligne):
            score_ligne += 1
    return score_ligne


for index, ligne in enumerate(lignes):
    if (index > 0) and (index < nb_lignes - 1):
        ligne = ligne.rstrip("\n")
        score += verification_ligne(ligne, index)

print(score)
