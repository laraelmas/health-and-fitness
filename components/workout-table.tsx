"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteWorkout } from "@/app/actions/workouts"
import type { Workout } from "@/lib/types"
import { Dumbbell, Heart, Zap, Plus, MoreHorizontal, Trash2, Search, Calendar } from "lucide-react"
import { format } from "date-fns"

const workoutTypeConfig = {
  cardio: { icon: Heart, color: "bg-red-100 text-red-700 border-red-200", label: "Cardio" },
  strength: { icon: Dumbbell, color: "bg-blue-100 text-blue-700 border-blue-200", label: "Strength" },
  pilates: { icon: Zap, color: "bg-purple-100 text-purple-700 border-purple-200", label: "Pilates" },
  custom: { icon: Plus, color: "bg-green-100 text-green-700 border-green-200", label: "Custom" },
}

interface WorkoutTableProps {
  workouts: Workout[]
}

export function WorkoutTable({ workouts }: WorkoutTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (workout.workout_date ? format(new Date(workout.workout_date), "PPP").toLowerCase().includes(searchTerm.toLowerCase()) : false),
  )

  const handleDelete = async (workoutId: string) => {
    setIsDeleting(workoutId)
    try {
      await deleteWorkout(workoutId)
    } catch (error) {
      console.error("Failed to delete workout:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  const getTotalDuration = () => {
    return filteredWorkouts.reduce((total, workout) => total + (typeof workout.duration === "number" ? workout.duration : 0), 0)
  }

  const getWorkoutTypeStats = () => {
    const stats = filteredWorkouts.reduce(
      (acc, workout) => {
        acc[workout.type] = (acc[workout.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    return stats
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Workouts</p>
                <p className="text-2xl font-bold">{filteredWorkouts.length}</p>
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
                <p className="text-2xl font-bold">{getTotalDuration()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">
                  {filteredWorkouts.length > 0 ? Math.round(getTotalDuration() / filteredWorkouts.length) : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {
                    workouts.filter((w) => {
                      const workoutDate = new Date(w.workout_date)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return workoutDate >= weekAgo
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Your Workouts</CardTitle>
              <CardDescription>Track and manage your fitness journey</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredWorkouts.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No workouts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start your fitness journey by logging your first workout"}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <a href="/add">Log Your First Workout</a>
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkouts.map((workout) => {
                    const config = workoutTypeConfig[workout.type]
                    const Icon = config.icon
                    return (
                      <TableRow key={workout.id}>
                        <TableCell>
                          <Badge variant="secondary" className={config.color}>
                            <Icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {typeof workout.duration === "number" ? `${workout.duration} min` : <span className="text-muted-foreground italic">-</span>}
                        </TableCell>
                        <TableCell>
                          {workout.workout_date ? format(new Date(workout.workout_date), "MMM d, yyyy") : (
                            <span className="text-muted-foreground italic">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          {workout.notes ? (
                            <span className="text-sm text-muted-foreground truncate block">{workout.notes}</span>
                          ) : (
                            <span className="text-sm text-muted-foreground italic">No notes</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleDelete(workout.id)}
                                disabled={isDeleting === workout.id}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {isDeleting === workout.id ? "Deleting..." : "Delete"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
