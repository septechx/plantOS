package com.siesque.plantos.types

import java.time.Instant

enum class ZoneStatus {
    Idle,
    Working,
    Paused
}

data class ZoneNode(
    val parent: Int,
    val id: Int,
    val name: String,
    val icon: String,
    val status: ZoneStatus,
    val lastWatered: Instant,
    val statistics: List<Statistic>
)