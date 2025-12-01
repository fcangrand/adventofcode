score = 0

with open("input/exo1.txt") as f:
    lignes = f.readlines()

ligne_longueur = len(lignes[0])
nb_lignes = len(lignes)


def verification_droite(index_x, index_ligne):
    if index_x + 3 < ligne_longueur:
        ligne_ = lignes[index_ligne]
        if ligne_[index_x + 1] == 'M' and ligne_[index_x + 2] == 'A' and ligne_[index_x + 3] == 'S':
            return 1
    return 0


def verification_gauche(index_x, index_ligne):
    if index_x - 3 >= 0:
        ligne_ = lignes[index_ligne]
        if ligne_[index_x - 1] == 'M' and ligne_[index_x - 2] == 'A' and ligne_[index_x - 3] == 'S':
            return 1
    return 0


def verification_haut(index_x, index_ligne):
    if index_ligne - 3 >= 0:
        ligne_ = lignes[index_ligne - 1]
        ligne_2 = lignes[index_ligne - 2]
        ligne_3 = lignes[index_ligne - 3]
        if ligne_[index_x] == 'M' and ligne_2[index_x] == 'A' and ligne_3[index_x] == 'S':
            return 1
    return 0


def verification_bas(index_x, index_ligne):
    if index_ligne + 3 < nb_lignes:
        ligne_ = lignes[index_ligne + 1]
        ligne_2 = lignes[index_ligne + 2]
        ligne_3 = lignes[index_ligne + 3]
        if ligne_[index_x] == 'M' and ligne_2[index_x] == 'A' and ligne_3[index_x] == 'S':
            return 1
    return 0


def verification_diagonale_haut_droite(index_x, index_ligne):
    if index_ligne - 3 >= 0 and index_x + 3 < ligne_longueur:
        ligne_ = lignes[index_ligne - 1]
        ligne_2 = lignes[index_ligne - 2]
        ligne_3 = lignes[index_ligne - 3]
        if ligne_[index_x + 1] == 'M' and ligne_2[index_x + 2] == 'A' and ligne_3[index_x + 3] == 'S':
            return 1
    return 0


def verification_diagonale_haut_gauche(index_x, index_ligne):
    if index_ligne - 3 >= 0 and index_x - 3 >= 0:
        ligne_ = lignes[index_ligne - 1]
        ligne_2 = lignes[index_ligne - 2]
        ligne_3 = lignes[index_ligne - 3]
        if ligne_[index_x - 1] == 'M' and ligne_2[index_x - 2] == 'A' and ligne_3[index_x - 3] == 'S':
            return 1
    return 0


def verification_diagonale_bas_droite(index_x, index_ligne):
    if index_ligne + 3 < nb_lignes and index_x + 3 < ligne_longueur:
        ligne_ = lignes[index_ligne + 1]
        ligne_2 = lignes[index_ligne + 2]
        ligne_3 = lignes[index_ligne + 3]
        if ligne_[index_x + 1] == 'M' and ligne_2[index_x + 2] == 'A' and ligne_3[index_x + 3] == 'S':
            return 1
    return 0


def verification_diagonale_bas_gauche(index_x, index_ligne):
    if index_ligne + 3 < nb_lignes and index_x - 3 >= 0:
        ligne_ = lignes[index_ligne + 1]
        ligne_2 = lignes[index_ligne + 2]
        ligne_3 = lignes[index_ligne + 3]
        if ligne_[index_x - 1] == 'M' and ligne_2[index_x - 2] == 'A' and ligne_3[index_x - 3] == 'S':
            return 1
    return 0


def verification_caracteres(index_x, index_ligne):
    return (verification_droite(index_x, index_ligne) +
            verification_gauche(index_x, index_ligne) +
            verification_haut(index_x, index_ligne) +
            verification_bas(index_x, index_ligne) +
            verification_diagonale_haut_droite(index_x, index_ligne) +
            verification_diagonale_haut_gauche(index_x, index_ligne) +
            verification_diagonale_bas_droite(index_x, index_ligne) +
            verification_diagonale_bas_gauche(index_x, index_ligne))


def verification_ligne(p_ligne, index_ligne):
    score_ligne = 0
    for i in range(len(p_ligne)):
        if p_ligne[i] == 'X':
            nb_points_x = verification_caracteres(i, index_ligne)
            score_ligne += nb_points_x
            # print(index_ligne, i, nb_points_x)
    return score_ligne


for index, ligne in enumerate(lignes):
    ligne = ligne.rstrip("\n")
    score += verification_ligne(ligne, index)

print(score)
