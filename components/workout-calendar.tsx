"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Workout } from "@/lib/types"
import { ChevronLeft, ChevronRight, Dumbbell, Heart, Zap, Plus } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns"

const workoutTypeConfig = {
  cardio: { icon: Heart, color: "bg-red-100 text-red-700 border-red-200", dotColor: "bg-red-500" },
  strength: { icon: Dumbbell, color: "bg-blue-100 text-blue-700 border-blue-200", dotColor: "bg-blue-500" },
  pilates: { icon: Zap, color: "bg-purple-100 text-purple-700 border-purple-200", dotColor: "bg-purple-500" },
  custom: { icon: Plus, color: "bg-green-100 text-green-700 border-green-200", dotColor: "bg-green-500" },
}

interface WorkoutCalendarProps {
  workouts: Workout[]
}

export function WorkoutCalendar({ workouts }: WorkoutCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get the first day of the week for the month (to handle padding)
  const firstDayOfWeek = monthStart.getDay()
  const paddingDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const date = new Date(monthStart)
    date.setDate(date.getDate() - (firstDayOfWeek - i))
    return date
  })

  // Get workouts for a specific day
  const getWorkoutsForDay = (date: Date) => {
    return workouts.filter((workout) => isSameDay(new Date(workout.workout_date), date))
  }

  // Get total duration for a day
  const getTotalDurationForDay = (date: Date) => {
    const dayWorkouts = getWorkoutsForDay(date)
    return dayWorkouts.reduce((total, workout) => total + workout.duration, 0)
  }

  // Navigate months
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const goToToday = () => setCurrentDate(new Date())

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{format(currentDate, "MMMM yyyy")}</CardTitle>
              <CardDescription>Track your workout consistency and patterns</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week day headers */}
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {/* Padding days from previous month */}
            {paddingDays.map((date, index) => (
              <div key={`padding-${index}`} className="p-2 h-24 text-muted-foreground/50">
                <div className="text-sm">{format(date, "d")}</div>
              </div>
            ))}

            {/* Current month days */}
            {calendarDays.map((date) => {
              const dayWorkouts = getWorkoutsForDay(date)
              const totalDuration = getTotalDurationForDay(date)
              const isToday = isSameDay(date, new Date())
              const hasWorkouts = dayWorkouts.length > 0

              return (
                <div
                  key={date.toISOString()}
                  className={`p-2 h-24 border rounded-lg transition-colors ${
                    isToday
                      ? "bg-blue-50 border-blue-200"
                      : hasWorkouts
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className={`text-sm font-medium ${isToday ? "text-blue-600" : ""}`}>{format(date, "d")}</div>

                    {hasWorkouts ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="flex-1 cursor-pointer">
                            <div className="flex flex-wrap gap-1 mt-1">
                              {dayWorkouts.slice(0, 2).map((workout, index) => {
                                const config = workoutTypeConfig[workout.type]
                                return (
                                  <div
                                    key={workout.id}
                                    className={`w-2 h-2 rounded-full ${config.dotColor}`}
                                    title={`${workout.type} - ${workout.duration}min`}
                                  />
                                )
                              })}
                              {dayWorkouts.length > 2 && (
                                <div className="text-xs text-muted-foreground">+{dayWorkouts.length - 2}</div>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{totalDuration}min</div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="start">
                          <div className="space-y-3">
                            <div className="font-semibold">{format(date, "EEEE, MMMM d")}</div>
                            <div className="space-y-2">
                              {dayWorkouts.map((workout) => {
                                const config = workoutTypeConfig[workout.type]
                                const Icon = config.icon
                                return (
                                  <div
                                    key={workout.id}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Badge variant="secondary" className={config.color}>
                                        <Icon className="h-3 w-3 mr-1" />
                                        {workout.type}
                                      </Badge>
                                      <span className="text-sm font-medium">{workout.duration}min</span>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="text-sm text-muted-foreground border-t pt-2">
                              Total: {totalDuration} minutes
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Workouts This Month</p>
                <p className="text-2xl font-bold">
                  {workouts.filter((w) => isSameMonth(new Date(w.workout_date), currentDate)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Minutes</p>
                <p className="text-2xl font-bold">
                  {workouts
                    .filter((w) => isSameMonth(new Date(w.workout_date), currentDate))
                    .reduce((total, w) => total + w.duration, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Active Days</p>
                <p className="text-2xl font-bold">
                  {
                    new Set(
                      workouts
                        .filter((w) => isSameMonth(new Date(w.workout_date), currentDate))
                        .map((w) => format(new Date(w.workout_date), "yyyy-MM-dd")),
                    ).size
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Per Day</p>
                <p className="text-2xl font-bold">
                  {(() => {
                    const monthWorkouts = workouts.filter((w) => isSameMonth(new Date(w.workout_date), currentDate))
                    const activeDays = new Set(monthWorkouts.map((w) => format(new Date(w.workout_date), "yyyy-MM-dd")))
                      .size
                    const totalMinutes = monthWorkouts.reduce((total, w) => total + w.duration, 0)
                    return activeDays > 0 ? Math.round(totalMinutes / activeDays) : 0
                  })()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
