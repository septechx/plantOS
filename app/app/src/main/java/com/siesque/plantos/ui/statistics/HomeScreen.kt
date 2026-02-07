package com.siesque.plantos.ui.statistics

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.siesque.plantos.intToRoman
import com.siesque.plantos.types.Module
import com.siesque.plantos.types.ModuleStatus
import com.siesque.plantos.ui.components.Heading
import com.siesque.plantos.ui.components.ModuleCard

@Composable
fun HomeScreen(modifier: Modifier = Modifier) {
    val data = arrayOf(
        arrayOf(
            Module(ModuleStatus.Idle, 40f),
            Module(ModuleStatus.Working, 20f),
        ),
        arrayOf(
            Module(ModuleStatus.Idle, 80f),
            Module(ModuleStatus.Paused, 10f),
        )
    )

    Column(modifier = modifier) {
        data.iterator().forEach { modules ->
            HubSection(modules = modules, index = data.indexOf(modules))
        }
    }
}

@Composable
fun HubSection(modules: Array<Module>, index: Int) {
    Column {
        Heading(
            text = "Hub ${intToRoman(index + 1)}",
            modifier = Modifier.padding(vertical = 4.dp)
        )
        modules.iterator().forEach { moduleData ->
            ModuleCard(
                moduleData = moduleData,
                index = modules.indexOf(moduleData),
                onClick = {}
            )
        }
    }
}