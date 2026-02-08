package com.siesque.plantos.data

import com.siesque.plantos.types.ZoneNode
import com.siesque.plantos.types.ZoneStatus
import com.siesque.plantos.types.Statistic
import com.siesque.plantos.types.StatType
import java.time.Instant
import java.time.temporal.ChronoUnit

object MockData {
    val nodes = listOf(
        ZoneNode(
            parent = 0,
            id = 0,
            name = "Monstera Deliciosa",
            icon = "🌿",
            status = ZoneStatus.Idle,
            lastWatered = Instant.now().minus(2, ChronoUnit.DAYS),
            statistics = listOf(
                Statistic(StatType.TEMPERATURE, listOf(21f, 22f, 22.5f, 23f, 22.5f, 22f, 21.5f)),
                Statistic(StatType.HUMIDITY, listOf(40f, 42f, 45f, 48f, 50f, 45f, 43f)),
                Statistic(StatType.LIGHT, listOf(800f, 1000f, 1200f, 1400f, 1300f, 1200f, 900f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 1,
            name = "Fiddle Leaf Fig",
            icon = "🌿",
            status = ZoneStatus.Working,
            lastWatered = Instant.now(),
            statistics = listOf(
                Statistic(StatType.TEMPERATURE, listOf(22f, 23f, 24f, 24.5f, 24f, 23.5f, 23f)),
                Statistic(StatType.HUMIDITY, listOf(55f, 58f, 60f, 62f, 65f, 60f, 58f)),
                Statistic(StatType.LIGHT, listOf(600f, 700f, 800f, 900f, 850f, 800f, 700f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 2,
            name = "Snake Plant",
            icon = "🌿",
            status = ZoneStatus.Idle,
            lastWatered = Instant.now().minus(7, ChronoUnit.DAYS),
            statistics = listOf(
                Statistic(StatType.TEMPERATURE, listOf(20f, 20.5f, 21f, 21.5f, 21f, 20.5f, 20f)),
                Statistic(StatType.HUMIDITY, listOf(25f, 28f, 30f, 32f, 35f, 30f, 28f)),
                Statistic(StatType.LIGHT, listOf(300f, 350f, 400f, 450f, 500f, 400f, 350f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 3,
            name = "Peace Lily",
            icon = "🌿",
            status = ZoneStatus.Paused,
            lastWatered = Instant.now().minus(1, ChronoUnit.DAYS),
            statistics = listOf(
                Statistic(StatType.TEMPERATURE, listOf(22f, 22.5f, 23f, 24f, 23.5f, 23f, 22.5f)),
                Statistic(StatType.HUMIDITY, listOf(70f, 72f, 75f, 78f, 80f, 75f, 73f)),
                Statistic(StatType.LIGHT, listOf(400f, 500f, 600f, 700f, 650f, 600f, 550f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 4,
            name = "Aloe Vera",
            icon = "🌿",
            status = ZoneStatus.Idle,
            lastWatered = Instant.now().minus(5, ChronoUnit.DAYS),
            statistics = listOf(
                Statistic(StatType.TEMPERATURE, listOf(23f, 24f, 25f, 26f, 25f, 24.5f, 24f)),
                Statistic(StatType.HUMIDITY, listOf(30f, 32f, 35f, 38f, 40f, 35f, 33f)),
                Statistic(StatType.LIGHT, listOf(1500f, 1800f, 2000f, 2200f, 2100f, 2000f, 1700f))
            )
        )
    )
}
