package `04`

import Reader
import data.Cell
import data.Grid

var SIZE_GRID=5

fun main(args: Array<String>) {
    val filename = "input.txt"
    val lines: MutableList<String> = Reader().readFromFile("04/$filename")
    val draw = generateDraw(lines[0])
    val grids = generateGrids(lines.drop(1))

    // println(exo1(grids, draw))
    println(exo2(grids, draw))
}



private fun exo1(grids: List<Grid>, draw: List<Int>): Int {
    var winnerGrid: Grid? = null
    var index = 0
    while (winnerGrid == null && index < draw.size) {
        grids.forEach { it.addNumber(draw[index]) }
        grids.forEach {
            if (it.hasWin()) {
                winnerGrid = it
            }
        }
        index++
    }

    if (winnerGrid == null) {
        return 0
    }

    val sumWinners = winnerGrid!!.getAllValueMarkedCells().sum()
    return draw[index-1] * sumWinners
}



private fun generateDraw(line: String): List<Int> {
    return line.split(",").map { it.toInt() }
}

private fun generateGrids(lines: List<String>): List<Grid> {
    var sublines = lines
    val nbGrids = lines.size / (SIZE_GRID + 1)
    val grids = mutableListOf<Grid>()
    for (i in 0 until nbGrids) {
        grids.add(initGrid(sublines.subList(0, SIZE_GRID+1)))
        sublines = sublines.drop(SIZE_GRID+1)
    }
    return grids
}

fun initGrid(lines: List<String>): Grid {
    val rows = mutableListOf<List<Cell>>()
    val gridlines = lines.drop(1)

    for (i in 0 until SIZE_GRID) {
        val row = gridlines[i].split(" ").filter { it.isNotEmpty() }.map { Cell(it.toInt(), false) }
        rows.add(row)
    }
    return Grid(rows)
}


private fun exo2(pgrids: List<Grid>, draw: List<Int>): Int {
    val sizeGrids = pgrids.size
    var grids = pgrids as MutableList
    var winnerGrid: Grid? = null
    var nbWinner = 0
    var index = 0
    while (winnerGrid == null && index < draw.size) {
        grids = grids.filter { !it.wins } as MutableList<Grid>
        grids.forEach { it.addNumber(draw[index]) }
        grids.forEach {
            if (it.hasWin()) {
                nbWinner++
                if (nbWinner == sizeGrids) {
                    winnerGrid = it
                }
            }
        }
        index++
    }

    if (winnerGrid == null) {
        return 0
    }

    val sumWinners = winnerGrid!!.getAllValueMarkedCells().sum()

    return draw[index-1] * sumWinners
}
