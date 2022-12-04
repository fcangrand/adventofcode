rock = 'A'
paper = 'B'
scissors = 'C'

rock_answer = 'D'
paper_answer = 'E'
scissors_answer = 'F'

need_lose = 'X'
need_draw = 'Y'
need_win = 'Z'

need_points = {
    need_lose: 0,
    need_draw: 3,
    need_win: 6,
}

points = {
    rock_answer: 1,
    paper_answer: 2,
    scissors_answer: 3,
}


def calculate_rock(need):
    if need == need_lose:
        return scissors_answer
    elif need == need_draw:
        return rock_answer
    return paper_answer


def calculate_paper(need):
    if need == need_lose:
        return rock_answer
    elif need == need_draw:
        return paper_answer
    return scissors_answer


def calculate_scissors(need):
    if need == need_lose:
        return paper_answer
    elif need == need_draw:
        return scissors_answer
    return rock_answer


def calculate_score(opponent, need):
    if opponent == rock:
        return calculate_rock(need)
    elif opponent == paper:
        return calculate_paper(need)
    else:
        return calculate_scissors(need)


score = 0

with open("input/exo1.txt") as f:
    for line in f:
        opponent, need = line.split(' ')
        need = need.strip()
        print(need)
        score += need_points[need]
        score += points[calculate_score(opponent, need)]

print(score)
