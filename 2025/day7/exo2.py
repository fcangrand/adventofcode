with open("input/exo1.txt") as f:
    lignes = f.readlines()

######


liste_timelines = []
longueur_ligne = len(lignes[0])

# 1. On trouve l'index de départ
for j in range(longueur_ligne):
    if lignes[0][j] == 'S':
        liste_timelines.append({
            'index': j,
            'nb': 1
        })



# 2. On parcourt les lignes
for i in range(1, len(lignes)):
    ligne_courante = lignes[i]

    prochaines_timelines = []
    for timeline in liste_timelines:
        # 2.1 On regarde ou est le bordel dans cette timeline
        index = timeline['index']
        nb_timelines_concernees = timeline['nb']

        # 2.2 On regarde ce qui est positionné à cet index
        obstacle_ou_vide = ligne_courante[index]

        # Si on a un obstacle, on ajoute dans la futur liste des timelines les deux nouveaux index
        if obstacle_ou_vide == '^':

            if index >= 1:
                index_deja_present = next((obj for obj in prochaines_timelines if obj['index'] == (index - 1)), None)

                if index_deja_present is not None:
                    index_deja_present['nb'] += nb_timelines_concernees
                else:
                    prochaines_timelines.append({
                        'index': index - 1,
                        'nb': nb_timelines_concernees
                    })

            if index < longueur_ligne:
                index_deja_present = next((obj for obj in prochaines_timelines if obj['index'] == (index + 1)), None)

                if index_deja_present is not None:
                    index_deja_present['nb'] += nb_timelines_concernees
                else:
                    prochaines_timelines.append({
                        'index': index + 1,
                        'nb': nb_timelines_concernees
                    })

        else:
            index_deja_present = next((obj for obj in prochaines_timelines if obj['index'] == index), None)

            if index_deja_present is not None:
                index_deja_present['nb'] += nb_timelines_concernees
            else:
                prochaines_timelines.append({
                    'index': index,
                    'nb': nb_timelines_concernees
                })

    liste_timelines = prochaines_timelines


###########


score = sum(timeline['nb'] for timeline in liste_timelines)
print(score)
