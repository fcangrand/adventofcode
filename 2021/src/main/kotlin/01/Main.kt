package `01`

import Reader

fun main(args: Array<String>) {
    val filename = "input.txt"
    val lines: MutableList<String> = Reader().readFromFile("01/$filename")

    // Try adding program arguments via Run/Debug configuration.
    // Learn more about running applications: https://www.jetbrains.com/help/idea/running-applications.html.
    println("Lines: $lines")
    for (s in lines) {
        println("Line: $s")
    }
}