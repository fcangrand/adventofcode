package `02`

import Reader

fun main(args: Array<String>) {
    val filename = "input.txt"
    val lines: MutableList<String> = Reader().readFromFile("02/$filename")

    // Try adding program arguments via Run/Debug configuration.
    // Learn more about running applications: https://www.jetbrains.com/help/idea/running-applications.html.
    println(exo1(lines))
    println(exo2(lines))


}

private fun exo2(lines: MutableList<String>): Int{
    var pos = 0
    var depth = 0
    var aim = 0
    lines.forEach {
        val splitted = it.split(" ")
        val action = splitted[0]
        val value = splitted[1].toInt()

        when(action) {
            "forward" -> {
                pos = pos + value
                depth = depth + (aim*value)
            }
            "down" -> aim = aim + value
            "up" -> aim = aim - value
        }

    }
    return pos * depth
}



private fun exo1(lines: MutableList<String>): Int{
    var pos = 0
    var depth = 0
    lines.forEach {
        val splitted = it.split(" ")
        val action = splitted[0]
        val value = splitted[1].toInt()

        when(action) {
            "forward" -> pos = pos + value
            "down" -> depth = depth + value
            "up" -> depth = depth - value
        }

    }
    return pos * depth
}