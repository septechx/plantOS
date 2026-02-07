package com.siesque.plantos.types

import androidx.compose.ui.graphics.Color

enum class StatType(val unit: String, val iconRes: String, val color: Color) {
    TEMPERATURE("°C", "thermostat", Color(0xFFFF5722)),
    HUMIDITY("%", "water_drop", Color(0xFF2196F3)),
    LIGHT("lx", "light_mode", Color(0xFFFFC107)),
    SOIL_MOISTURE("%", "grass", Color(0xFF4CAF50)),
    BATTERY("%", "battery_full", Color(0xFF9C27B0))
}

data class Statistic(
    val id: Int,
    val type: StatType,
    val label: String,
    val value: Float,
    val history: List<Float> // Mock history for graphs
)