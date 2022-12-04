rock = 'A'
paper = 'B'
scissors = 'C'

rock_answer = 'X'
paper_answer = 'Y'
scissors_answer = 'Z'

lose = 0
draw = 3
win = 6

points = {
    rock_answer: 1,
    paper_answer: 2,
    scissors_answer: 3,
}


def calculate_rock(me):
    if me == rock_answer:
        return draw
    elif me == paper_answer:
        return win
    return lose


def calculate_paper(me):
    if me == rock_answer:
        return lose
    elif me == paper_answer:
        return draw
    return win


def calculate_scissors(me):
    if me == rock_answer:
        return win
    elif me == paper_answer:
        return lose
    return draw


def calculate_score(opponent, me):
    if opponent == rock:
        return calculate_rock(me)
    elif opponent == paper:
        return calculate_paper(me)
    else:
        return calculate_scissors(me)


score = 0

with open("input/exo1.txt") as f:
    for line in f:
        opponent, me = line.split(' ')
        me = me.strip()
        score += points[me]
        score += calculate_score(opponent, me)

print(score)
