
current_dial = 50
max_dial = 100
min_dial = 0
score = 0

with open("input/exo1.txt") as f:
    for line in f:
        rotation = line[0]
        dial = int(line[1:])

        score += dial // max_dial # On incrémente du nombre de tours qu'on fait dans le vide

        dial = dial%max_dial  # Vraie rotation à effectuer
        previous_dial = current_dial
        print(f"Rotation: {rotation}{dial}, Dial: {current_dial}, Score before: {score}")
        if rotation == 'L':
            current_dial -= dial
            if current_dial < min_dial:
                current_dial = max_dial - abs(current_dial)
                if previous_dial != 0:  # Ne pas incrémenter si on était déjà à 0
                    score += 1
            elif current_dial == 0:
                score += 1

        else:
            current_dial += dial
            if current_dial >= max_dial:
                current_dial = current_dial - max_dial
                score += 1
print(score)
