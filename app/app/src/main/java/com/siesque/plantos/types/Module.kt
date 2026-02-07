package com.siesque.plantos.types

enum class ModuleStatus {
    Idle,
    Working,
    Paused
}

data class Module(
    val id: String,
    val name: String,
    val status: ModuleStatus,
    val humidity: Float,
    val temperature: Float,
    val lightLevel: Float,
    val battery: Int,
    val lastWatered: String
)