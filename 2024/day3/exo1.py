import re

pattern = re.compile(r"mul\((\d{1,3}),(\d{1,3})\)")

with open("input/exo1.txt") as f:
    contenu = f.read()

matches = pattern.findall(contenu)  # Liste de tuples (X, Y)

# Conversion en int et calcul des produits
produits = [int(x) * int(y) for x, y in matches]

print("Occurrences :", matches)
print("Produits :", produits)
print("Somme totale :", sum(produits))


