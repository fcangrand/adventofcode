package `01`

import Reader

fun main(args: Array<String>) {
    val filename = "input.txt"
    val lines: MutableList<String> = Reader().readFromFile("01/$filename")

    // Try adding program arguments via Run/Debug configuration.
    // Learn more about running applications: https://www.jetbrains.com/help/idea/running-applications.html.
    println(exo1(lines.map { it.toInt() }))
    println(exo1WithMap(lines.map { it.toInt() }))
    println(exo12WithMap(lines.map { it.toInt() }))

}

private fun exo1(lines: List<Int>): Int{
    var nbIncreased = 0
    var previousVal = lines[0]
    for (value in lines) {
       if (value > previousVal) {
           nbIncreased++
       }
        previousVal = value
    }
    return nbIncreased
}

private fun exo1WithMap(lines: List<Int>): Int {
    return lines.mapIndexed { index, value ->
        if (index != 0 && lines[index - 1] < value) 1 else 0
    }.sum()
}


private fun exo12WithMap(lines: List<Int>): Int {
    return lines.mapIndexed { index, value -> compareWithPrevious(lines, index, value)
    }.sum()
}

fun compareWithPrevious(lines: List<Int>, index: Int, value: Int) : Int{
    if (index < 3) {
        return 0
    }
    val commonSum = lines[index-2] + lines[index-1]
    val previousSum = lines[index-3] + commonSum
    val currentSum =  value + commonSum
    return if (previousSum < currentSum) 1 else 0
}
