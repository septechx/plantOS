package com.siesque.plantos

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BarChart
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.siesque.plantos.types.ModuleData
import com.siesque.plantos.types.ModuleStatus
import com.siesque.plantos.ui.components.Heading
import com.siesque.plantos.ui.components.ModuleCard
import com.siesque.plantos.ui.theme.PlantOSTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        enableEdgeToEdge()
        setContent {
            PlantOSTheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun MainScreen() {
    var selectedItem by remember { mutableIntStateOf(0) }
    val navItems = listOf(
        "Home" to Icons.Filled.Home,
        "Statistics" to Icons.Filled.BarChart,
        "Settings" to Icons.Filled.Settings
    )

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            NavigationBar {
                navItems.forEachIndexed { index, (label, icon) ->
                    NavigationBarItem(
                        icon = { Icon(icon, label) },
                        label = { Text(label) },
                        selected = selectedItem == index,
                        onClick = { selectedItem = index }
                    )
                }
            }
        }
    ) { innerPadding ->
        when (selectedItem) {
            0 -> HomeContent(
                modifier = Modifier
                    .padding(innerPadding)
                    .padding(horizontal = 16.dp)
            )
            1 -> StatisticsContent(
                modifier = Modifier
                    .padding(innerPadding)
                    .padding(horizontal = 16.dp)
            )
            2 -> SettingsContent(
                modifier = Modifier
                    .padding(innerPadding)
                    .padding(horizontal = 16.dp)
            )
        }
    }
}

@Composable
fun HomeContent(modifier: Modifier = Modifier) {
    val data = arrayOf(
        arrayOf(
            ModuleData(ModuleStatus.Idle, 40f),
            ModuleData(ModuleStatus.Working, 20f),
        ),
        arrayOf(
            ModuleData(ModuleStatus.Idle, 80f),
            ModuleData(ModuleStatus.Paused, 10f),
        )
    )

    Column(modifier = modifier) {
        data.iterator().forEach { modules ->
            HubSection(modules = modules, index = data.indexOf(modules))
        }
    }
}

@Composable
fun HubSection(modules: Array<ModuleData>, index: Int) {
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

@Composable
fun SettingsContent(modifier: Modifier = Modifier) {
    Column(modifier = modifier) {
        Heading(text = "Settings")
        // TODO: Add settings options here
    }
}

@Composable
fun StatisticsContent(modifier: Modifier = Modifier) {
    Column(modifier = modifier) {
        Heading(text = "Statistics")
        // TODO: Add statistics here
    }
}
