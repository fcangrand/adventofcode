
score = 0

with open("input/exo1.txt") as f:
    for line in f:

        all_vals = list(map(int, line.split(' ')))
        length = len(all_vals)
        if length == 1:
            score += 1
            continue
        elif all_vals[0] == all_vals[1]:
            continue

        isIncreasing = all_vals[0] < all_vals[1]
        for (index, val) in enumerate(all_vals):
            if index == length - 1:
                score += 1
            else:
                subscribe = all_vals[index + 1] - all_vals[index]
                if isIncreasing and (subscribe > 3 or subscribe < 1):
                    break
                elif not isIncreasing and (subscribe < -3 or subscribe > -1):
                    break


print(score)
