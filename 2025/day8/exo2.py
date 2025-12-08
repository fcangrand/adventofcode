with open("input/exo1.txt") as f:
    lignes = [[int(i) for i in x.split(",")] for x in f]


####################################
class Box:
    def __init__(self, id, x, y, z):
        self.id = id
        self.x = x
        self.y = y
        self.z = z

    def __repr__(self):
        return f"Box {self.id}"


class Regroupement:
    def __init__(self, box1: Box, box2: Box):
        self.boxes = [box1, box2]

    def ajouter_box(self, box: Box):
        if box not in self.boxes:
            self.boxes.append(box)

    def contient_box(self, box: Box) -> bool:
        return box in self.boxes

    def __repr__(self):
        return "Regroupement: " + ", ".join([str(box) for box in self.boxes])


class Distance:
    def __init__(self, box1, box2, distance):
        self.box1 = box1
        self.box2 = box2
        self.distance = distance

    def __repr__(self):
        return f"Dist {self.box1.id} - {self.box2.id}: {self.distance:.2f}"


####################################

def calcul_distance(box1: Box, box2: Box) -> float:
    dx = box1.x - box2.x
    dy = box1.y - box2.y
    dz = box1.z - box2.z
    return ((dx ** 2) + (dy ** 2) + (dz ** 2)) ** 0.5


####################################

boxes = []

# 1. Construction des objets box
for i in range(len(lignes)):
    dimensions = lignes[i]
    x = int(dimensions[0])
    y = int(dimensions[1])
    z = int(dimensions[2])
    box = Box(i, x, y, z)
    boxes.append(box)

distances = []
for i in range(len(boxes)):
    for j in range(i + 1, len(boxes)):
        dist = calcul_distance(boxes[i], boxes[j])
        distances.append(Distance(boxes[i], boxes[j], dist))

# 3. On tri le tableau par distance croissante
distances = sorted(distances, key=lambda d: d.distance)

map_regroupements = {}
for i in range(len(distances)):
    # i += 1
    distance = distances[i]
    box1: Box = distance.box1
    box2: Box = distance.box2

    # On regarde si la box1 est déjà dans un regroupement (si la clé dans la map_regroupements existe)
    regroupement_1_existant = map_regroupements.get(box1.id)
    regroupement_2_existant = map_regroupements.get(box2.id)

    if regroupement_1_existant:
        if not regroupement_2_existant:
            # On ajoute la box2 dans le regroupement existant
            regroupement_1_existant.ajouter_box(box2)
            # On met à jour la map
            map_regroupements[box2.id] = regroupement_1_existant
        else:
            # Si les deux boxes sont déjà dans des regroupements différents, il faut les fusionner
            if regroupement_1_existant != regroupement_2_existant:
                # Fusion des deux regroupements
                for box in regroupement_2_existant.boxes:
                    regroupement_1_existant.ajouter_box(box)
                    map_regroupements[box.id] = regroupement_1_existant

    # On regarde si la box2 est déjà dans un regroupement
    elif regroupement_2_existant:
        if not regroupement_1_existant:
            # On ajoute la box1 dans le regroupement existant
            regroupement_2_existant.ajouter_box(box1)
            # On met à jour la map
            map_regroupements[box1.id] = regroupement_2_existant

    else:
        # Aucun regroupement existant, on en créé un
        regroupement = Regroupement(box1, box2)
        map_regroupements[box1.id] = regroupement
        map_regroupements[box2.id] = regroupement

    s = set(map_regroupements.values())
    regroupement = next(iter(s))
    nb_regroupement = len(s)
    if nb_regroupement == 1 and len(regroupement.boxes) == len(boxes):
        print(f"Toutes les boxes sont regroupées après {i + 1} itérations.")
        print(box1.x)
        print(box2.x)
        print(box2.x * box1.x)
        break
