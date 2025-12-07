ROLL_ICON = '@'
score = 0
carte = []

with open("input/sample.txt") as f:
    lignes = [ligne.rstrip('\n') for ligne in f.readlines()]


ligne_longueur = len(lignes[0])
nb_lignes = len(lignes)

def verification_droite(index_x, index_ligne):
    if index_x + 1 < ligne_longueur:
        ligne_ = lignes[index_ligne]
        return 1 if ligne_[index_x + 1] == ROLL_ICON else 0
    return 0


def verification_gauche(index_x, index_ligne):
    if index_x - 1 >= 0:
        ligne_ = lignes[index_ligne]
        return 1 if ligne_[index_x - 1] == ROLL_ICON else 0
    return 0


def verification_haut(index_x, index_ligne):
    if index_ligne - 1 >= 0:
        ligne_ = lignes[index_ligne - 1]
        return 1 if ligne_[index_x] == ROLL_ICON else 0
    return 0


def verification_bas(index_x, index_ligne):
    if index_ligne + 1 < nb_lignes:
        ligne_ = lignes[index_ligne + 1]
        return 1 if ligne_[index_x] == ROLL_ICON else 0
    return 0


def verification_diagonale_haut_droite(index_x, index_ligne):
    if index_ligne - 1 >= 0 and index_x + 1 < ligne_longueur:
        ligne_ = lignes[index_ligne - 1]
        return 1 if ligne_[index_x + 1] == ROLL_ICON else 0
    return 0


def verification_diagonale_haut_gauche(index_x, index_ligne):
    if index_ligne - 1 >= 0 and index_x - 1 >= 0:
        ligne_ = lignes[index_ligne - 1]
        return 1 if ligne_[index_x - 1] == ROLL_ICON else 0
    return 0


def verification_diagonale_bas_droite(index_x, index_ligne):
    if index_ligne + 1 < nb_lignes and index_x + 1 < ligne_longueur:
        ligne_ = lignes[index_ligne + 1]
        return 1 if ligne_[index_x + 1] == ROLL_ICON else 0
    return 0


def verification_diagonale_bas_gauche(index_x, index_ligne):
    if index_ligne + 1 < nb_lignes and index_x - 1 >= 0:
        ligne_ = lignes[index_ligne + 1]
        return 1 if ligne_[index_x - 1] == ROLL_ICON else 0
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
        if p_ligne[i] == ROLL_ICON:
            nb_voisins = verification_caracteres(i, index_ligne)
            if nb_voisins < 4:
                score_ligne += 1
    return score_ligne

# -----------------------------------------

for index, ligne in enumerate(lignes):
    ligne = ligne.rstrip("\n")
    score += verification_ligne(ligne, index)

print(score)
