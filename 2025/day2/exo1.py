
score = 0

with open("input/exo1.txt") as f:
    for line in f:
        lignes = line.split(',')


def estComposeDeDeuxSequences(chaine):
    mid = len(chaine) // 2
    first_half = chaine[:mid]
    second_half = chaine[mid:]
    return first_half == second_half


for ids in lignes:
    minIndex = int(ids.split('-')[0])
    maxIndex = int(ids.split('-')[1])
    for test in range(minIndex, maxIndex+1):
        if (len(str(test)) % 2) == 0 and estComposeDeDeuxSequences(str(test)):
            print(test)
            score += test

print(score)
