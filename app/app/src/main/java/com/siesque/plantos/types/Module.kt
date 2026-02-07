package com.siesque.plantos.types

enum class ModuleStatus {
    Idle,
    Working,
    Paused
}

data class Module(
    val status: ModuleStatus,
    val humidity: Float
)