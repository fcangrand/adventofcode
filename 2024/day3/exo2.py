import re

token_re = re.compile(r"do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)")

with open("input/exo1.txt") as f:
    contenu = f.read()


active = True  # do() implicite au début
total = 0
matches = []

for m in token_re.finditer(contenu):
    tok = m.group(0)
    if tok == "do()":
        active = True
    elif tok == "don't()":
        active = False
    else:
        if active:
            x = int(m.group(1))
            y = int(m.group(2))
            matches.append((x, y))
            total += x * y

print("Occurrences retenues :", matches)
print("Somme totale :", total)


