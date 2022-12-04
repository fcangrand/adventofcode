score = 0


def calculate_score(string: str):
    string = string.swapcase()
    if string.isupper():
        return ord(string) - 64
    else:
        return ord(string) - 70


with open("input/exo1.txt") as f:
    for line in f:
        line = list(line.strip())
        half = len(line) // 2
        start_string, end_string = line[:half], line[half:]
        i = 0
        current_char = start_string[0]

        while current_char not in end_string and i < half:
            i += 1
            current_char = start_string[i]

        score += calculate_score(current_char)
        print(current_char)
        print(score)

print(score)
