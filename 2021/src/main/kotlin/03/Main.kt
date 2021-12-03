package `03`

import Reader

fun main(args: Array<String>) {
    val filename = "input.txt"
    val lines: MutableList<String> = Reader().readFromFile("03/$filename")
    println(exo1(lines))
    println(exo2(lines))
}

private fun exo2(lines: MutableList<String>): Int{
    val possibleOxygen = findOxygenGeneratorRating(lines, 0, ::getGamma)
    val possibleDioxyde = findOxygenGeneratorRating(lines, 0, ::getEpsilon)
    return binaryStringToInt(possibleOxygen) * binaryStringToInt(possibleDioxyde)
}

private fun getGamma(numberZero:Int, numberOne: Int) : String {
    return if (numberZero > numberOne) "0" else "1"
}

private fun getEpsilon(numberZero:Int, numberOne: Int) : String {
    return if (numberZero > numberOne) "1" else "0"
}

private fun findOxygenGeneratorRating(pPossibleOxygen: MutableList<String>, index: Int, compare:(a:Int, b:Int) -> String): String {
    if (pPossibleOxygen.size == 1) {
        return pPossibleOxygen[0]
    }
    var possibleOxygen = pPossibleOxygen
    val linesInColumn = rotateMatrice(possibleOxygen)
    val string = linesInColumn[index]
    val numberOne = countOccurrences(string, '1')
    val numberZero = countOccurrences(string, '0')
    val stringToMatch =  compare(numberZero, numberOne)
    possibleOxygen = possibleOxygen.filter { it[index].toString() == stringToMatch } as MutableList<String>
    return findOxygenGeneratorRating(possibleOxygen, index+1, compare)
}


private fun exo1(lines: MutableList<String>): Int{
    var gamma = ""
    var epsilon = ""
    val linesInColumn = rotateMatrice(lines)
    linesInColumn.forEach {
        val numberOne = countOccurrences(it, '1')
        val numberZero = countOccurrences(it, '0')
        gamma +=  if (numberZero > numberOne) "0" else "1"
        epsilon += if (numberZero > numberOne) "1"  else "0"
    }

    return binaryStringToInt(gamma) * binaryStringToInt(epsilon)
}


private fun rotateMatrice(lines: MutableList<String>): Array<String>{
    val linesInColumn : Array<String> = Array(lines[0].length) { "" }
    for (rowIndex in lines.indices) {
        val chars: CharArray = lines[rowIndex].toCharArray()
        for (colIndex in chars.indices) {
            linesInColumn[colIndex] = linesInColumn[colIndex] + chars[colIndex]
        }
    }
    return linesInColumn
}


private fun countOccurrences(s: String, ch: Char): Int {
    return s.filter { it == ch }.count()
}


private fun binaryStringToInt(s: String): Int {
    return Integer.parseInt(s, 2)
}
