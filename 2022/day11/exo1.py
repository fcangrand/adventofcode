with open("input/exo1.txt") as f:
    lines = f.readlines()


class Item:

    def __init__(self, valeur):
        self.valeur = valeur


class Operateur:

    def __init__(self, operation, valeur):
        self.operation = operation
        self.valeur = valeur

    def compute_worry_level(self, item):
        right_part = item if self.valeur == 'old' else int(self.valeur)
        if self.operation == '+':
            val = item + right_part
        elif self.operation == '*':
            val = item * right_part
        else:
            raise Exception('Impossible')

        return val # // 3


class Test:

    def __init__(self, diviseur, success, fail):
        self.diviseur = diviseur
        self.success = success
        self.fail = fail

    def throw_item(self, val):
        monkey_to_throw = self.success if val % self.diviseur == 0 else self.fail
        monkeys[monkey_to_throw].add_item(val)


class Monkey:

    def __init__(self, name, items: [int], operateur: Operateur, test: Test):
        self.name = name
        self.items = items
        self.operateur = operateur
        self.test = test
        self.nb_inspections = 0

    def add_item(self, item):
        self.items.append(item)

    def throw_all_items(self):
        for item in self.items:
            self.nb_inspections += 1
            val = self.operateur.compute_worry_level(item)
            self.test.throw_item(val)
        self.items = []


monkeys = []
nb_monkeys = (len(lines) // 7) + 1

for i in range(nb_monkeys):
    name = i
    items = list(map(lambda x: int(x), lines[i*7 + 1].strip().replace('Starting items: ', '').split(", ")))
    operation, valeur = lines[i*7 + 2].strip().replace('Operation: new = old ', '').split(" ")
    diviseur = int(lines[i*7 + 3].strip().replace('Test: divisible by ', ''))
    success = int(lines[i*7 + 4].strip().replace('If true: throw to monkey', ''))
    fail = int(lines[i*7 + 5].strip().replace('If false: throw to monkey ', ''))
    monkey = Monkey(name, items, Operateur(operation, valeur), Test(diviseur, success, fail))
    monkeys.append(monkey)


nb_tours = 20
for i in range(nb_tours):
    for monkey in monkeys:
        monkey.throw_all_items()

print(list(map(lambda x: x.nb_inspections, monkeys)))
