package com.siesque.plantos

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.unit.dp
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import com.siesque.plantos.types.ModuleData
import com.siesque.plantos.types.ModuleStatus
import com.siesque.plantos.ui.components.Heading
import com.siesque.plantos.ui.components.ModuleCard
import com.siesque.plantos.ui.theme.PlantOSTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val mockData = arrayOf(
            ModuleData(ModuleStatus.Idle, 40f),
            ModuleData(ModuleStatus.Working, 20f),
            ModuleData(ModuleStatus.Working, 30f),
            ModuleData(ModuleStatus.Idle, 80f),
            ModuleData(ModuleStatus.Paused, 10f),
        );

        enableEdgeToEdge()
        setContent {
            PlantOSTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Column(
                        modifier = Modifier
                            .padding(innerPadding)
                            .padding(horizontal = 16.dp)
                    ) {
                        Heading(
                            text = "Modules",
                        )

                        mockData.iterator().forEach { moduleData ->
                            ModuleCard(
                                moduleData = moduleData,
                                index = mockData.indexOf(moduleData),
                                onClick = {}
                            )
                        }
                    }
                }
            }
        }
    }
}
