package com.siesque.plantos.data

import com.siesque.plantos.types.ZoneNode
import com.siesque.plantos.types.ZoneStatus
import com.siesque.plantos.types.Statistic
import com.siesque.plantos.types.StatType

object MockData {
    val nodes = listOf(
        ZoneNode(
            parent = 0,
            id = 0,
            name = "Monstera Deliciosa",
            status = ZoneStatus.Idle,
            lastWatered = "2 days ago",
            statistics = listOf(
                Statistic(1, StatType.TEMPERATURE, listOf(21f, 22f, 22.5f, 23f, 22.5f, 22f, 21.5f)),
                Statistic(2, StatType.HUMIDITY, listOf(40f, 42f, 45f, 48f, 50f, 45f, 43f)),
                Statistic(3, StatType.LIGHT, listOf(800f, 1000f, 1200f, 1400f, 1300f, 1200f, 900f)),
                Statistic(4, StatType.BATTERY, listOf(95f, 93f, 91f, 89f, 87f, 85f, 83f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 1,
            name = "Fiddle Leaf Fig",
            status = ZoneStatus.Working,
            lastWatered = "Today",
            statistics = listOf(
                Statistic(5, StatType.TEMPERATURE, listOf(22f, 23f, 24f, 24.5f, 24f, 23.5f, 23f)),
                Statistic(6, StatType.HUMIDITY, listOf(55f, 58f, 60f, 62f, 65f, 60f, 58f)),
                Statistic(7, StatType.LIGHT, listOf(600f, 700f, 800f, 900f, 850f, 800f, 700f)),
                Statistic(8, StatType.BATTERY, listOf(55f, 52f, 49f, 46f, 44f, 42f, 40f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 2,
            name = "Snake Plant",
            status = ZoneStatus.Idle,
            lastWatered = "1 week ago",
            statistics = listOf(
                Statistic(9, StatType.TEMPERATURE, listOf(20f, 20.5f, 21f, 21.5f, 21f, 20.5f, 20f)),
                Statistic(10, StatType.HUMIDITY, listOf(25f, 28f, 30f, 32f, 35f, 30f, 28f)),
                Statistic(11, StatType.LIGHT, listOf(300f, 350f, 400f, 450f, 500f, 400f, 350f)),
                Statistic(12, StatType.BATTERY, listOf(99f, 98f, 97f, 96f, 95f, 94f, 93f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 3,
            name = "Peace Lily",
            status = ZoneStatus.Paused,
            lastWatered = "Yesterday",
            statistics = listOf(
                Statistic(13, StatType.TEMPERATURE, listOf(22f, 22.5f, 23f, 24f, 23.5f, 23f, 22.5f)),
                Statistic(14, StatType.HUMIDITY, listOf(70f, 72f, 75f, 78f, 80f, 75f, 73f)),
                Statistic(15, StatType.LIGHT, listOf(400f, 500f, 600f, 700f, 650f, 600f, 550f)),
                Statistic(16, StatType.BATTERY, listOf(25f, 23f, 21f, 19f, 17f, 15f, 13f))
            )
        ),
        ZoneNode(
            parent = 0,
            id = 4,
            name = "Aloe Vera",
            status = ZoneStatus.Idle,
            lastWatered = "5 days ago",
            statistics = listOf(
                Statistic(17, StatType.TEMPERATURE, listOf(23f, 24f, 25f, 26f, 25f, 24.5f, 24f)),
                Statistic(18, StatType.HUMIDITY, listOf(30f, 32f, 35f, 38f, 40f, 35f, 33f)),
                Statistic(19, StatType.LIGHT, listOf(1500f, 1800f, 2000f, 2200f, 2100f, 2000f, 1700f)),
                Statistic(20, StatType.BATTERY, listOf(100f, 100f, 100f, 100f, 100f, 100f, 100f))
            )
        )
    )
}
