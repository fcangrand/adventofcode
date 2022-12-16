with open("input/exo2.txt") as f:
    lines = f.readlines()


class Item:

    def __init__(self, _valeur):
        self.valeur = _valeur
        self.modulos = []

    def init_modulos(self):
        for _monkey in monkeys:
            modulo_for_monkey = self.valeur % _monkey.test.diviseur
            self.modulos.append(modulo_for_monkey)


class Operateur:

    def __init__(self, _operation, _valeur):
        self.operation = _operation
        self.valeur = _valeur

    def compute_worry_level(self, _item: Item):

        for i in range(len(_item.modulos)):
            left_part = _item.modulos[i]
            right_part = _item.modulos[i] if self.valeur == 'old' else int(self.valeur)
            if self.operation == '+':
                val = left_part + right_part
            elif self.operation == '*':
                val = left_part * right_part
            else:
                raise Exception('Impossible')

            _item.modulos[i] = val % monkeys[i].test.diviseur


class Test:

    def __init__(self, _diviseur, _success, _fail):
        self.diviseur = _diviseur
        self.success = _success
        self.fail = _fail

    def throw_item(self, val: Item, id_monkey: int):
        monkey_to_throw = self.success if val.modulos[id_monkey] == 0 else self.fail
        # print('sending to ' + str(monkey_to_throw))
        monkeys[monkey_to_throw].add_item(val)


class Monkey:

    def __init__(self, _id, _items: [Item], _operateur: Operateur, _test: Test):
        self.id = _id
        self.items = _items
        self.operateur = _operateur
        self.test = _test
        self.nb_inspections = 0

    def add_item(self, _item: Item):
        self.items.append(_item)

    def throw_all_items(self):
        for _item in self.items:
            self.nb_inspections += 1
            self.operateur.compute_worry_level(_item)
            self.test.throw_item(_item, self.id)
        self.items = []

    def init_modulo_items(self):
        for _item in self.items:
            _item.init_modulos()


monkeys = []
nb_monkeys = (len(lines) // 7) + 1

for i in range(nb_monkeys):
    name = i
    items = list(map(lambda x: int(x), lines[i * 7 + 1].strip().replace('Starting items: ', '').split(", ")))
    items = list(map(lambda x: Item(x), items))
    operation, valeur = lines[i * 7 + 2].strip().replace('Operation: new = old ', '').split(" ")
    diviseur = int(lines[i * 7 + 3].strip().replace('Test: divisible by ', ''))
    success = int(lines[i * 7 + 4].strip().replace('If true: throw to monkey', ''))
    fail = int(lines[i * 7 + 5].strip().replace('If false: throw to monkey ', ''))
    monkey = Monkey(name, items, Operateur(operation, valeur), Test(diviseur, success, fail))
    monkeys.append(monkey)

for monkey in monkeys:
    monkey.init_modulo_items()

nb_tours = 10000
for i in range(nb_tours):
    for monkey in monkeys:
        monkey.throw_all_items()

all_inspections = (list(map(lambda x: x.nb_inspections, monkeys)))
all_inspections = sorted(all_inspections)

print(all_inspections[-2] * all_inspections[-1])
