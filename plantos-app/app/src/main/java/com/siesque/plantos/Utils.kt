package com.siesque.plantos

import java.time.*
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

object Utils {
    fun formatRelativeTime(
        instant: Instant,
        zone: ZoneId = ZoneId.systemDefault()
    ): String {
        val nowInstant = Instant.now()

        // handle future times simply (keeps output date-only for far future)
        if (instant.isAfter(nowInstant)) {
            val nowDate = nowInstant.atZone(zone).toLocalDate()
            val targetDate = instant.atZone(zone).toLocalDate()
            return when (val daysFuture = ChronoUnit.DAYS.between(nowDate, targetDate)) {
                0L -> "Today"
                1L -> "Tomorrow"
                in 2..6 -> "In $daysFuture days"
                in 7..27 -> {
                    val weeks = daysFuture / 7
                    if (weeks == 1L) "In 1 week" else "In $weeks weeks"
                }
                else -> targetDate.format(DateTimeFormatter.ISO_LOCAL_DATE) // date-only
            }
        }

        val duration = Duration.between(instant, nowInstant)
        val seconds = duration.seconds

        if (seconds < 60) return "Just now"

        if (seconds < 60 * 60) {
            val mins = duration.toMinutes()
            return if (mins == 1L) "1 minute ago" else "$mins minutes ago"
        }

        if (seconds < 60 * 60 * 24) {
            val hours = duration.toHours()
            return if (hours == 1L) "1 hour ago" else "$hours hours ago"
        }

        // for days+ use LocalDate/Period so months/years are calendar-aware
        val date = instant.atZone(zone).toLocalDate()
        val nowDate = nowInstant.atZone(zone).toLocalDate()
        return when (val days = ChronoUnit.DAYS.between(date, nowDate)) {
            0L -> "Today" // safety, should never happen
            1L -> "Yesterday"
            in 2..6 -> "$days days ago"
            in 7..27 -> {
                val weeks = days / 7
                if (weeks == 1L) "1 week ago" else "$weeks weeks ago"
            }
            else -> {
                val period = Period.between(date, nowDate)
                val totalMonths = period.years * 12 + period.months
                when {
                    totalMonths in 1..11 -> if (totalMonths == 1) "1 month ago" else "$totalMonths months ago"
                    else -> {
                        val years = period.years
                        if (years <= 1) "1 year ago" else "$years years ago"
                    }
                }
            }
        }
    }
}