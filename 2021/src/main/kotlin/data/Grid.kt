package data

class Grid(val rows: List<List<Cell>>) {

    var winningCells: List<Cell>? = null
    var wins = false

    fun addNumber(draw: Int) {
        rows.forEach {
            it.forEach {
                if (it.value == draw) {
                    it.marked = true
                }
            }
        }
    }

    fun hasWin(): Boolean {
        val winnerColumns = IntArray(rows.size) { it }.toMutableList()
        rows.forEach {
            if (it.all { it.marked }) {
                winningCells = it
                wins = true
                return true
            }

            for (i in it.indices) {
                if (i in winnerColumns && !it[i].marked) {
                    winnerColumns.remove(i)
                }
            }
        }


        if (winnerColumns.size == 1) {
            val indexColWinner = winnerColumns[0]
            val winnerCells = mutableListOf<Cell>()
            rows.forEach { winnerCells.add(it[indexColWinner]) }
            winningCells = winnerCells
            wins = true
            return true
        }

        return false
    }

    fun getAllValueMarkedCells(): List<Int> {
        return rows.flatMap { it.filter { !it.marked }.map { it.value } }
    }

}

class Cell(
    val value: Int,
    var marked: Boolean) {


    override fun toString(): String = value.toString() + if (marked) 'X' else ""
}
