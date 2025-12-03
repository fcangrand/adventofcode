
score = 0

with open("input/exo1.txt") as f:
    for line in f:
        lignes = line.split(',')


def est_compose_de_sequences(chaine) -> bool:
    length = len(chaine)
    for size in range(1, length // 2 + 1):
        sequence = chaine[:size]
        repetitions = length // size
        if sequence * repetitions == chaine: # Python <3
            return True
    return False


for ids in lignes:
    minIndex = int(ids.split('-')[0])
    maxIndex = int(ids.split('-')[1])
    for test in range(minIndex, maxIndex+1):
        if est_compose_de_sequences(str(test)):
            score += test

print(score)
