package `05`

import Reader
import java.lang.Integer.max
import java.lang.Integer.min
import java.lang.Math.abs

var SIZE_GRID=1000

fun main(args: Array<String>) {
    val filename = "input.txt"
    val lines: MutableList<String> = Reader().readFromFile("05/$filename")
    val grid = initGrid()
    // println(exo1(grid, lines))
    println(exo2(grid, lines))
}



private fun exo1(grid: Grid, lines: MutableList<String>): Int {
    return fillGrid(grid, lines, false).getCrossNumber()
}

private fun exo2(grid: Grid, lines: MutableList<String>): Int {
    return fillGrid(grid, lines, true).getCrossNumber()
}

private fun fillGrid(grid: Grid, lines: MutableList<String>, useDiagonal: Boolean) : Grid {
    lines.forEach {
        val line = it
        val splitted_line = line.split("->")
        val firstCoords = splitted_line[0].split(",").map { it.trim().toInt() }
        val secondCoords = splitted_line[1].split(",").map { it.trim().toInt() }

        if (firstCoords[0] == secondCoords[0]) {
            for (i in min(firstCoords[1], secondCoords[1])..max(firstCoords[1], secondCoords[1])) {
                grid.addNumber(firstCoords[0], i)
            }
        } else if (firstCoords[1] == secondCoords[1]) {
            for (i in min(firstCoords[0], secondCoords[0])..max(firstCoords[0], secondCoords[0])) {
                grid.addNumber(i, firstCoords[1])
            }
        } else if (useDiagonal && isDiagonal(firstCoords, secondCoords)) {
            val incrementX = (firstCoords[0] < secondCoords[0])
            val incrementY = (firstCoords[1] < secondCoords[1])
            for (i in 0 ..kotlin.math.abs(firstCoords[0] - secondCoords[0])) {
                grid.addNumber(
                    if (incrementX) firstCoords[0] + i else firstCoords[0] - i,
                    if (incrementY) firstCoords[1] + i else firstCoords[1] - i
                )
            }

        }
    }

    return grid
}

fun isDiagonal(firstCoords: List<Int>, secondCoords: List<Int>): Boolean {
    return abs(firstCoords[0] - secondCoords[0]) == abs(firstCoords[1]  - secondCoords[1])
}

private fun initGrid(): Grid {
    val rows : MutableList<Row> = mutableListOf()
    for (i in 0 until SIZE_GRID) {
        val row = IntArray(SIZE_GRID) { 0 }.toMutableList()
        rows.add(Row(row))
    }
    return Grid(rows)
}

class Grid(val rows: List<Row>) {

    private var crossNumber: Int = 0

    fun getCrossNumber() : Int {
        return crossNumber
    }

    fun addNumber(x: Int, y: Int) {
        val previous_val = rows[x].cells[y]
        rows[x].cells[y] = previous_val + 1
        if (previous_val == 1) {
            crossNumber++
        }
    }

    override fun toString(): String = rows.joinToString { it.toString() }
}



class Row(val cells: MutableList<Int>) {
    override fun toString(): String = cells.joinToString { it.toString() }

}


