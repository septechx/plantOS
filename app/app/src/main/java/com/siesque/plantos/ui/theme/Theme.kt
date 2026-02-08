package com.siesque.plantos.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFFA5D6A7),
    onPrimary = Color(0xFF1B5E20),
    secondary = Color(0xFF81C784),
    onSecondary = Color(0xFF1B5E20),
    tertiary = Color(0xFF4FC3F7),
    onTertiary = Color(0xFF01579B),
    background = Color(0xFF1B1B1F),
    onBackground = Color(0xFFE3E3E3),
    surface = Color(0xFF2C2C2F),
    onSurface = Color(0xFFE3E3E3),
    surfaceVariant = Color(0xFF3C4043),
    onSurfaceVariant = Color(0xFFB0B0B0),
    secondaryContainer = Color(0xFF2E4A30),
    onSecondaryContainer = Color(0xFFA5D6A7),
    tertiaryContainer = Color(0xFF01579B),
    onTertiaryContainer = Color(0xFF4FC3F7)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF33691E),
    onPrimary = Color.White,
    secondary = Color(0xFF558B2F),
    onSecondary = Color.White,
    tertiary = Color(0xFF039BE5),
    onTertiary = Color.White,
    background = Color(0xFFF1F8E9),
    onBackground = Color(0xFF1C1B1F),
    surface = Color.White,
    onSurface = Color(0xFF1B5E20),
    surfaceVariant = Color(0xFFDCEDC8),
    onSurfaceVariant = Color(0xFF558B2F),
    secondaryContainer = Color(0xFFDCEDC8),
    onSecondaryContainer = Color(0xFF33691E),
    tertiaryContainer = Color(0xFFE3F2FD),
    onTertiaryContainer = Color(0xFF0277BD)
)

@Composable
fun PlantOSTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && darkTheme -> {
            val context = LocalContext.current
            dynamicDarkColorScheme(context)
        }

        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}