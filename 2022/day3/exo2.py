score = 0


def calculate_score(string: str):
    string = string.swapcase()
    if string.isupper():
        return ord(string) - 64
    else:
        return ord(string) - 70


with open("input/exo2.txt") as f:
    lines = f.readlines()

i = 0
while i < len(lines):
    first_line = list(lines[i].strip())
    second_line = list(lines[i+1].strip())
    third_line = list(lines[i+2].strip())
    j = 0
    current_char = first_line[0]

    while ((current_char not in second_line) or (current_char not in third_line)) and j < len(first_line):
        j += 1
        current_char = first_line[j]

    score += calculate_score(current_char)

    i += 3

    print(score)

print(score)
