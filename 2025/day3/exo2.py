
score = 0


def trouver_voltage(p_ligne, puissance_10) -> int :
    if puissance_10 < 0:
        return 0

    val_max_restante = 0
    index_val_max_restante = 0

    for i in range(9, 0, -1):
        # on ne prend pas les x dernières valeurs car on veut x chiffres minimum
        find_val_max = p_ligne[:-puissance_10] if puissance_10 > 0 else p_ligne
        index_val_max_restante = find_val_max.find(str(i))
        if index_val_max_restante != -1:
            val_max_restante = i
            break

    return (val_max_restante * 10 ** puissance_10) + trouver_voltage(p_ligne[index_val_max_restante + 1:], puissance_10 - 1)



# -----------------------------------------


with open("input/exo1.txt") as f:
    for ligne in f:
        ligne = ligne.rstrip("\n")
        voltage = trouver_voltage(ligne, 11)
        score += voltage

print(score)
