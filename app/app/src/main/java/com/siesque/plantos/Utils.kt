package com.siesque.plantos

fun intToRoman(num: Int): String {
    if (num <= 0) return ""

    val values = intArrayOf(1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1)
    val symbols = arrayOf("M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I")

    val sb = StringBuilder()
    var remaining = num

    for (i in values.indices) {
        while (remaining >= values[i]) {
            sb.append(symbols[i])
            remaining -= values[i]
        }
    }

    return sb.toString()
}