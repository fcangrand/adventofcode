
score = 0


def trouver_voltage(p_ligne) -> int :
    index_decimale = 0
    val_decimale = 0
    val_entiere = 0

    for i in range(10, 0, -1):
        index_decimale = p_ligne.find(str(i))
        if index_decimale != -1 and index_decimale < len(p_ligne) - 1:
            # on ne prend pas la dernière valeur car on veut 2 chiffres minimum
            val_decimale = i
            break

    val_restante = p_ligne[(index_decimale+1):]
    for i in range(10, 0, -1):
        index = val_restante.find(str(i))
        if index != -1:
            val_entiere = i
            break


    return (val_decimale * 10) + val_entiere



# -----------------------------------------


with open("input/exo1.txt") as f:
    for ligne in f:
        ligne = ligne.rstrip("\n")
        score += trouver_voltage(ligne)

print(score)
