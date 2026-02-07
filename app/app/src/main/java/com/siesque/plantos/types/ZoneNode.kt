package com.siesque.plantos.types

enum class ZoneStatus {
    Idle,
    Working,
    Paused
}

data class ZoneNode(
    val parent: Int,
    val id: Int,
    val name: String,
    val status: ZoneStatus,
    val lastWatered: String, // FIXME: Replace with timestamp
    val statistics: List<Statistic>
)