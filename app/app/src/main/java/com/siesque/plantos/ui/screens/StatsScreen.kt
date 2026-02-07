package com.siesque.plantos.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ShowChart
import androidx.compose.material.icons.filled.BatteryFull
import androidx.compose.material.icons.filled.Grass
import androidx.compose.material.icons.filled.LightMode
import androidx.compose.material.icons.filled.Thermostat
import androidx.compose.material.icons.filled.ViewStream
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.siesque.plantos.data.MockData
import com.siesque.plantos.types.StatType
import com.siesque.plantos.types.Statistic
import com.siesque.plantos.types.ZoneNode

@Composable
fun StatisticsScreen(modifier: Modifier = Modifier) {
    var selectedDesign by remember { mutableStateOf(DesignType.LIST) }



    Column(modifier = modifier.fillMaxSize()) {
        DesignSelector(
            currentDesign = selectedDesign,
            onDesignSelected = { selectedDesign = it }
        )

        Spacer(modifier = Modifier.height(16.dp))

        Box(modifier = Modifier.weight(1f)) {
            when (selectedDesign) {
                DesignType.GRAPH -> GraphStats(MockData.nodes)
                DesignType.LIST -> ListStats(MockData.nodes)
            }
        }
    }
}

enum class DesignType { LIST, GRAPH }

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DesignSelector(
    currentDesign: DesignType,
    onDesignSelected: (DesignType) -> Unit
) {
    SingleChoiceSegmentedButtonRow(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
    ) {
        DesignType.entries.forEachIndexed { index, design ->
            SegmentedButton(
                shape = SegmentedButtonDefaults.itemShape(index = index, count = DesignType.entries.size),
                onClick = { onDesignSelected(design) },
                selected = currentDesign == design,
                icon = {
                    SegmentedButtonDefaults.Icon(active = currentDesign == design) {
                        Icon(
                            imageVector = when (design) {
                                DesignType.GRAPH -> Icons.AutoMirrored.Filled.ShowChart
                                DesignType.LIST -> Icons.Default.ViewStream
                            },
                            contentDescription = design.name,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                },
                label = {
                    Text(
                        text = design.name.lowercase().replaceFirstChar { it.uppercase() },
                        style = MaterialTheme.typography.labelLarge,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            )
        }
    }
}

@Composable
fun GraphStats(nodes: List<ZoneNode>) {
    val stats = nodes.flatMap { item ->
        item.statistics.map { statistic ->
            statistic to item.name
        }
    }

    Column(
        modifier = Modifier
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        stats.forEach { stat ->
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = stat.second, style = MaterialTheme.typography.titleSmall)
                        Text(
                            text = "${stat.first.history.last()} ${stat.first.type.unit}",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = stat.first.type.color
                        )
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    Canvas(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(100.dp)
                    ) {
                        val points = stat.first.history
                        if (points.isNotEmpty()) {
                            val max = points.maxOrNull() ?: 100f
                            val min = points.minOrNull() ?: 0f
                            val range = if (max - min == 0f) 1f else max - min
                            
                            val path = Path()
                            val widthPerPoint = size.width / (points.size - 1)
                            
                            points.forEachIndexed { index, value ->
                                val x = index * widthPerPoint
                                val y = size.height - ((value - min) / range * size.height)
                                if (index == 0) path.moveTo(x, y) else path.lineTo(x, y)
                            }
                            
                            drawPath(
                                path = path,
                                color = stat.first.type.color,
                                style = Stroke(width = 4.dp.toPx(), cap = StrokeCap.Round)
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ListStats(nodes: List<ZoneNode>) {
    val stats = nodes.flatMap { item ->
        item.statistics.map { statistic ->
            statistic to item.name
        }
    }

    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(stats) { stat ->
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .clip(RoundedCornerShape(topStart = 24.dp, bottomEnd = 24.dp))
                    .background(
                        brush = Brush.horizontalGradient(
                            colors = listOf(
                                stat.first.type.color.copy(alpha = 0.2f),
                                stat.first.type.color.copy(alpha = 0.05f)
                            )
                        )
                    )
            ) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    drawCircle(
                        color = stat.first.type.color.copy(alpha = 0.1f),
                        radius = size.height * 0.8f,
                        center = Offset(size.width * 0.9f, size.height * 0.9f)
                    )
                }
                
                Row(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(50.dp)
                            .clip(CircleShape)
                            .background(Color.White)
                            .border(2.dp, stat.first.type.color.copy(alpha = 0.3f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = getIconForType(stat.first.type),
                            contentDescription = null,
                            tint = stat.first.type.color
                        )
                    }
                    
                    Spacer(modifier = Modifier.width(16.dp))
                    
                    Column {
                        Text(
                            text = stat.second,
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.SemiBold,
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.8f)
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "${stat.first.history.last()} ${stat.first.type.unit}",
                            style = MaterialTheme.typography.displaySmall,
                            fontSize = 24.sp,
                            color = stat.first.type.color
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun getIconForType(type: StatType) = when (type) {
    StatType.TEMPERATURE -> Icons.Default.Thermostat
    StatType.HUMIDITY -> Icons.Default.WaterDrop
    StatType.LIGHT -> Icons.Default.LightMode
    StatType.SOIL_MOISTURE -> Icons.Default.Grass
    StatType.BATTERY -> Icons.Default.BatteryFull
}