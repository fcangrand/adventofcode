import java.io.File
import java.io.InputStream
import java.net.URL

class Reader {

    fun readFromFile(filename: String): MutableList<String> {
        val lineList = mutableListOf<String>()
        val inputStream: InputStream = File(getResourceAsText(filename).path).inputStream()
        inputStream.bufferedReader().useLines { lines -> lines.forEach { lineList.add(it)} }
        return lineList
    }


    fun getResourceAsText(path: String): URL {
        return object {}.javaClass.getResource(path)
    }
}