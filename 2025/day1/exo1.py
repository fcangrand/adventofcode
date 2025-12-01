
current_dial = 50
max_dial = 100
min_dial = 0
score = 0

with open("input/exo1.txt") as f:
    for line in f:
        rotation = line[0]
        dial = int(line[1:])
        dial = dial%max_dial  # Ensure dial is within bounds
        print(f"Rotation: {rotation}{dial}, Dial: {current_dial}, Score before: {score}")
        if rotation == 'L':
            current_dial -= dial
            if current_dial < min_dial:
                current_dial = max_dial - abs(current_dial)
        else:
            current_dial += dial
            if current_dial >= max_dial:
                current_dial = current_dial - max_dial
        if current_dial == 0:
            score += 1

print(score)
