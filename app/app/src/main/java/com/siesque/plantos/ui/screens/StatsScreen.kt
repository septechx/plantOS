package com.siesque.plantos.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.material.icons.filled.ExpandMore
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
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.siesque.plantos.data.MockData
import com.siesque.plantos.types.StatType
import com.siesque.plantos.types.Statistic
import com.siesque.plantos.types.ZoneNode
import com.siesque.plantos.ui.components.Heading
import com.siesque.plantos.ui.theme.PlantOSTheme
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun StatisticsScreen(modifier: Modifier = Modifier) {
    var selectedDesign by remember { mutableStateOf(DesignType.LIST) }
    val expandedZones = remember { mutableStateMapOf<ZoneNode, Boolean>() }

    MockData.nodes.forEach { node ->
        if (!expandedZones.containsKey(node)) {
            expandedZones[node] = true
        }
    }

    fun toggleZone(node: ZoneNode) {
        expandedZones[node] = !(expandedZones[node] ?: true)
    }

    fun expandAll() {
        MockData.nodes.forEach { node ->
            expandedZones[node] = true
        }
    }

    fun collapseAll() {
        MockData.nodes.forEach { node ->
            expandedZones[node] = false
        }
    }

    Column(modifier = modifier
        .fillMaxSize()
        .padding(16.dp)
    ) {
        Heading(
            text = "Statistics",
            modifier = Modifier.padding(bottom = 16.dp)
        )

        DesignSelector(
            currentDesign = selectedDesign,
            onDesignSelected = { selectedDesign = it }
        )

        GlobalControls(
            onExpandAll = { expandAll() },
            onCollapseAll = { collapseAll() }
        )

        Box(modifier = Modifier.weight(1f)) {
            when (selectedDesign) {
                DesignType.GRAPH -> GraphStats(
                    nodes = MockData.nodes,
                    expandedZones = expandedZones,
                    onToggleZone = { toggleZone(it) }
                )

                DesignType.LIST -> ListStats(
                    nodes = MockData.nodes,
                    expandedZones = expandedZones,
                    onToggleZone = { toggleZone(it) }
                )
            }
        }
    }
}

enum class DesignType { LIST, GRAPH }

@Composable
fun GlobalControls(
    onExpandAll: () -> Unit,
    onCollapseAll: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        horizontalArrangement = Arrangement.End,
        verticalAlignment = Alignment.CenterVertically
    ) {
        TextButton(onClick = onExpandAll) {
            Text(
                text = "Expand All",
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.primary
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        TextButton(onClick = onCollapseAll) {
            Text(
                text = "Collapse All",
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}

@Composable
fun ZoneHeader(
    node: ZoneNode,
    isExpanded: Boolean,
    onToggle: () -> Unit,
    modifier: Modifier = Modifier
) {
    val rotation by animateFloatAsState(
        targetValue = if (isExpanded) 180f else 0f,
        label = "expand_icon_rotation"
    )

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onToggle() },
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .background(
                            MaterialTheme.colorScheme.secondaryContainer,
                            RoundedCornerShape(10.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text(node.icon, style = MaterialTheme.typography.titleMedium)
                }

                Text(
                    text = node.name,
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            Icon(
                imageVector = Icons.Default.ExpandMore,
                contentDescription = if (isExpanded) "Collapse" else "Expand",
                modifier = Modifier.rotate(rotation),
                tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }
    }
}

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
                shape = SegmentedButtonDefaults.itemShape(
                    index = index,
                    count = DesignType.entries.size
                ),
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
                        style = MaterialTheme.typography.labelLarge
                    )
                }
            )
        }
    }
}

@Composable
fun GraphStats(
    nodes: List<ZoneNode>,
    expandedZones: Map<ZoneNode, Boolean>,
    onToggleZone: (ZoneNode) -> Unit
) {
    Column(
        modifier = Modifier
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        nodes.forEach { node ->
            val isExpanded = expandedZones[node] ?: true

            Column(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                ZoneHeader(
                    node = node,
                    isExpanded = isExpanded,
                    onToggle = { onToggleZone(node) }
                )

                AnimatedVisibility(
                    visible = isExpanded,
                    enter = fadeIn() + expandVertically(),
                    exit = fadeOut() + shrinkVertically()
                ) {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(16.dp),
                        modifier = Modifier.padding(top = 4.dp)
                    ) {
                        node.statistics.forEach { statistic ->
                            GraphStatCard(
                                statistic = statistic,
                                zoneName = node.name
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun GraphStatCard(
    statistic: Statistic,
    zoneName: String
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(text = zoneName, style = MaterialTheme.typography.titleSmall)
                Text(
                    text = "${statistic.history.last()} ${statistic.type.unit}",
                    style = MaterialTheme.typography.titleMedium,
                    color = statistic.type.color
                )
            }
            Spacer(modifier = Modifier.height(16.dp))
            Canvas(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(100.dp)
            ) {
                val points = statistic.history
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
                        color = statistic.type.color,
                        style = Stroke(width = 4.dp.toPx(), cap = StrokeCap.Round)
                    )
                }
            }
        }
    }
}

@Composable
fun ListStats(
    nodes: List<ZoneNode>,
    expandedZones: Map<ZoneNode, Boolean>,
    onToggleZone: (ZoneNode) -> Unit
) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(nodes, key = { it.id }) { node ->
            val isExpanded = expandedZones[node] ?: true

            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                ZoneHeader(
                    node = node,
                    isExpanded = isExpanded,
                    onToggle = { onToggleZone(node) }
                )

                AnimatedVisibility(
                    visible = isExpanded,
                    enter = fadeIn() + expandVertically(),
                    exit = fadeOut() + shrinkVertically()
                ) {
                    Column(
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                        modifier = Modifier.padding(top = 4.dp)
                    ) {
                        node.statistics.forEach { statistic ->
                            StatCard(
                                statistic = statistic,
                                zoneName = node.name
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun StatCard(
    statistic: Statistic,
    zoneName: String
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(120.dp)
            .clip(RoundedCornerShape(topStart = 24.dp, bottomEnd = 24.dp))
            .background(
                brush = Brush.horizontalGradient(
                    colors = listOf(
                        statistic.type.color.copy(alpha = 0.2f),
                        statistic.type.color.copy(alpha = 0.05f)
                    )
                )
            )
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            drawCircle(
                color = statistic.type.color.copy(alpha = 0.1f),
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
                    .border(2.dp, statistic.type.color.copy(alpha = 0.3f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = getIconForType(statistic.type),
                    contentDescription = "${statistic.type.name} icon",
                    tint = statistic.type.color
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            Column {
                Text(
                    text = zoneName,
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.8f)
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "${statistic.history.last()} ${statistic.type.unit}",
                    style = MaterialTheme.typography.displaySmall,
                    fontSize = 24.sp,
                    color = statistic.type.color
                )
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
}

@Preview(showBackground = true)
@Composable
fun StatisticsScreenPreview() {
    PlantOSTheme {
        StatisticsScreen()
    }
}

@Preview(showBackground = true)
@Composable
fun ZoneHeaderPreview() {
    PlantOSTheme {
        ZoneHeader(
            node = MockData.nodes.first(),
            isExpanded = true,
            onToggle = {}
        )
    }
}

@Preview(showBackground = true)
@Composable
fun StatCardPreview() {
    PlantOSTheme {
        StatCard(
            statistic = MockData.nodes.first().statistics.first(),
            zoneName = "Test Zone"
        )
    }
}