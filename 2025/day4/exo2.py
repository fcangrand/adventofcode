ROLL_ICON = '@'

with open("input/exo1.txt") as f:
    carte = [ligne.rstrip('\n') for ligne in f.readlines()]

ligne_longueur = len(carte[0])
nb_lignes = len(carte)

def verification_droite(index_x, index_ligne):
    if index_x + 1 < ligne_longueur:
        ligne_ = carte[index_ligne]
        return 1 if ligne_[index_x + 1] == ROLL_ICON else 0
    return 0


def verification_gauche(index_x, index_ligne):
    if index_x - 1 >= 0:
        ligne_ = carte[index_ligne]
        return 1 if ligne_[index_x - 1] == ROLL_ICON else 0
    return 0


def verification_haut(index_x, index_ligne):
    if index_ligne - 1 >= 0:
        ligne_ = carte[index_ligne - 1]
        return 1 if ligne_[index_x] == ROLL_ICON else 0
    return 0


def verification_bas(index_x, index_ligne):
    if index_ligne + 1 < nb_lignes:
        ligne_ = carte[index_ligne + 1]
        return 1 if ligne_[index_x] == ROLL_ICON else 0
    return 0


def verification_diagonale_haut_droite(index_x, index_ligne):
    if index_ligne - 1 >= 0 and index_x + 1 < ligne_longueur:
        ligne_ = carte[index_ligne - 1]
        return 1 if ligne_[index_x + 1] == ROLL_ICON else 0
    return 0


def verification_diagonale_haut_gauche(index_x, index_ligne):
    if index_ligne - 1 >= 0 and index_x - 1 >= 0:
        ligne_ = carte[index_ligne - 1]
        return 1 if ligne_[index_x - 1] == ROLL_ICON else 0
    return 0


def verification_diagonale_bas_droite(index_x, index_ligne):
    if index_ligne + 1 < nb_lignes and index_x + 1 < ligne_longueur:
        ligne_ = carte[index_ligne + 1]
        return 1 if ligne_[index_x + 1] == ROLL_ICON else 0
    return 0


def verification_diagonale_bas_gauche(index_x, index_ligne):
    if index_ligne + 1 < nb_lignes and index_x - 1 >= 0:
        ligne_ = carte[index_ligne + 1]
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


def verification_ligne(p_ligne, index_ligne, rolls_a_nettoyer):
    score_ligne = 0
    for i in range(len(p_ligne)):
        if p_ligne[i] == ROLL_ICON:
            nb_voisins = verification_caracteres(i, index_ligne)
            if nb_voisins < 4:
                score_ligne += 1
                rolls_a_nettoyer.append((index_ligne, i))
    return score_ligne

# On modifie la carte globale
def nettoyage_carte(rolls_a_nettoyer):
    global carte
    nouvelles_lignes = carte.copy()
    for roll in rolls_a_nettoyer:
        index_ligne, index_x = roll
        ligne = list(nouvelles_lignes[index_ligne])
        ligne[index_x] = 'x'
        nouvelles_lignes[index_ligne] = ''.join(ligne)
    carte = nouvelles_lignes

def boucle_nettoyage_carte():
    score_boucle = 0
    rolls_a_nettoyer = []
    for index, ligne in enumerate(carte):
        ligne = ligne.rstrip("\n")
        score_boucle += verification_ligne(ligne, index, rolls_a_nettoyer)

    if score_boucle == 0:
        return score_boucle
    else:
        nettoyage_carte(rolls_a_nettoyer)
        return score_boucle + boucle_nettoyage_carte()


# -----------------------------------------

print(boucle_nettoyage_carte())
