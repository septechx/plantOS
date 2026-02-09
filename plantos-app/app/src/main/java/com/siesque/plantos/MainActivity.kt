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
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.siesque.plantos.ui.components.Heading
import com.siesque.plantos.ui.screens.HomeScreen
import com.siesque.plantos.ui.theme.PlantOSTheme
import com.siesque.plantos.ui.screens.StatisticsScreen

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

sealed class Screen(val route: String, val label: String) {
    data object Home : Screen("home", "Home")
    data object Statistics : Screen("statistics", "Statistics")
    data object Settings : Screen("settings", "Settings")
}

@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val navItems = listOf(
        Triple(Screen.Home.route, "Home", Icons.Filled.Home),
        Triple(Screen.Statistics.route, "Statistics", Icons.Filled.BarChart),
        Triple(Screen.Settings.route, "Settings", Icons.Filled.Settings)
    )

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            NavigationBar {
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentDestination = navBackStackEntry?.destination

                navItems.forEach { (route, label, icon) ->
                    NavigationBarItem(
                        icon = { 
                            Icon(
                                imageVector = icon, 
                                contentDescription = label
                            ) 
                        },
                        label = { Text(label) },
                        selected = currentDestination?.hierarchy?.any { 
                            it.route == route 
                        } == true,
                        onClick = {
                            navController.navigate(route) {
                                popUpTo(navController.graph.findStartDestination().id) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) { 
                HomeContent(
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
            }
            composable(Screen.Statistics.route) { 
                StatisticsContent(
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
            }
            composable(Screen.Settings.route) { 
                SettingsContent(
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
            }
        }
    }
}

@Composable
fun HomeContent(modifier: Modifier = Modifier) {
    HomeScreen(modifier = modifier)
}

@Composable
fun SettingsContent(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Heading(
            text = "Settings",
            modifier = Modifier.padding(bottom = 16.dp)
        )
        // TODO: Add settings options here
    }
}

@Composable
fun StatisticsContent(modifier: Modifier = Modifier) {
    StatisticsScreen(modifier = modifier)
}

@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    PlantOSTheme {
        MainScreen()
    }
}
