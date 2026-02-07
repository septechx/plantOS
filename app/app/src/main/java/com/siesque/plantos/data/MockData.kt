package com.siesque.plantos.data

import com.siesque.plantos.types.Module
import com.siesque.plantos.types.ModuleStatus

object MockData {
    val modules = listOf(
        Module(
            id = "m1",
            name = "Monstera Deliciosa",
            status = ModuleStatus.Idle,
            humidity = 45f,
            temperature = 22.5f,
            lightLevel = 1200f,
            battery = 85,
            lastWatered = "2 days ago"
        ),
        Module(
            id = "m2",
            name = "Fiddle Leaf Fig",
            status = ModuleStatus.Working,
            humidity = 60f,
            temperature = 24.0f,
            lightLevel = 800f,
            battery = 42,
            lastWatered = "Today"
        ),
        Module(
            id = "m3",
            name = "Snake Plant",
            status = ModuleStatus.Idle,
            humidity = 30f,
            temperature = 21.0f,
            lightLevel = 400f,
            battery = 95,
            lastWatered = "1 week ago"
        ),
        Module(
            id = "m4",
            name = "Peace Lily",
            status = ModuleStatus.Paused,
            humidity = 75f,
            temperature = 23.5f,
            lightLevel = 600f,
            battery = 15,
            lastWatered = "Yesterday"
        ),
        Module(
            id = "m5",
            name = "Aloe Vera",
            status = ModuleStatus.Idle,
            humidity = 35f,
            temperature = 25.0f,
            lightLevel = 2000f,
            battery = 100,
            lastWatered = "5 days ago"
        )
    )
    
    val groupedModules = listOf(
        modules.subList(0, 2),
        modules.subList(2, 5)
    )
}
