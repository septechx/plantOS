package com.siesque.plantos.ui.components

import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.siesque.plantos.types.ModuleData
import com.siesque.plantos.types.ModuleStatus

private fun intToRoman(num: Int): String {
    if (num <= 0) return ""
    
    val values = intArrayOf(1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1)
    val symbols = arrayOf("M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I")
    
    val sb = StringBuilder()
    var remaining = num
    
    for (i in values.indices) {
        while (remaining >= values[i]) {
            sb.append(symbols[i])
            remaining -= values[i]
        }
    }
    
    return sb.toString()
}

private fun getHumidityColor(humidity: Float): Color {
    return when {
        humidity < 30f -> Color(0xffffa500)
        humidity <= 60f -> Color.Yellow
        else -> Color.Green
    }
}

private fun getStatusColor(status: ModuleStatus): Color {
    return when (status) {
        ModuleStatus.Idle -> Color.Green
        ModuleStatus.Working -> Color(0xff005aff)
        ModuleStatus.Paused -> Color.Gray
    }
}

@Composable
fun ModuleCard(
    moduleData: ModuleData,
    index: Int,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(vertical = 4.dp),
        border = CardDefaults.outlinedCardBorder(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Module ${intToRoman(index + 1)}",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold
            )
            
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Status:",
                    fontWeight = FontWeight.Bold
                )

                Box(
                    modifier = Modifier
                        .size(12.dp)
                        .border(
                            width = 2.dp,
                            color = getStatusColor(moduleData.status),
                            shape = CircleShape
                        )
                )

                Text(
                    text = "Humidity:",
                    fontWeight = FontWeight.Bold
                )
                
                Box(
                    modifier = Modifier
                        .size(12.dp)
                        .border(
                            width = 2.dp,
                            color = getHumidityColor(moduleData.humidity),
                            shape = CircleShape
                        )
                )
            }
        }
    }
}
