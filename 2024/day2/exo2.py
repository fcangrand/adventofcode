
score = 0

def premier_index_en_erreur(vals):
    is_increasing = vals[0] < vals[1]
    length =  len(vals)
    for (index, val) in enumerate(vals):
        if index == length - 1:
            return None
        else:
            subscribe = vals[index + 1] - vals[index]
            if is_increasing and (subscribe > 3 or subscribe < 1):
                return index + 1
            elif not is_increasing and (subscribe < -3 or subscribe > -1):
                return index + 1
    return None


with open("input/exo1.txt") as f:
    for line in f:

        all_vals = list(map(int, line.split(' ')))
        total_length = len(all_vals)
        if total_length == 1:
            score += 1
            continue

        premier_index = premier_index_en_erreur(all_vals)
        if premier_index is None:
            score += 1
            continue
        else:
            # on enleve le premier index en erreur
            copy_all_vals = all_vals.copy()
            copy_all_vals.pop(premier_index)
            index_en_erreur = premier_index_en_erreur(copy_all_vals)
            if index_en_erreur is None:
                score += 1
                continue
            else:
                copy_all_vals = all_vals.copy()
                copy_all_vals.pop(premier_index - 1)
                index_en_erreur = premier_index_en_erreur(copy_all_vals)
                if index_en_erreur is None:
                    score += 1
                else:
                    if premier_index > 1:
                        copy_all_vals = all_vals.copy()
                        copy_all_vals.pop(premier_index - 2)
                        index_en_erreur = premier_index_en_erreur(copy_all_vals)
                        if index_en_erreur is None:
                            score += 1
                    # print("nope")


print(score)
