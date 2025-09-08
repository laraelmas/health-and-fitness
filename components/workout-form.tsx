"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createWorkout } from "@/app/actions/workouts"
import { useRouter } from "next/navigation"
import { Dumbbell, Heart, Zap, Plus } from "lucide-react"

const workoutTypes = [
  { value: "cardio", label: "Cardio", icon: Heart, color: "text-red-500" },
  { value: "strength", label: "Strength", icon: Dumbbell, color: "text-blue-500" },
  { value: "pilates", label: "Pilates", icon: Zap, color: "text-purple-500" },
  { value: "custom", label: "Custom", icon: Plus, color: "text-green-500" },
]

export function WorkoutForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string>("")
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await createWorkout(formData)
      router.push("/workouts")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create workout")
    } finally {
      setIsLoading(false)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Add New Workout
        </CardTitle>
        <CardDescription>Track your fitness journey with detailed workout logging</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Workout Type
            </Label>
            <Select name="type" value={selectedType} onValueChange={setSelectedType} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${type.color}`} />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">
                Duration (minutes)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                max="480"
                placeholder="30"
                step="1"
                
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workout_date" className="text-sm font-medium">
                Workout Date
              </Label>
              <Input
                id="workout_date"
                name="workout_date"
                type="date"
                max={today}
                
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes (optional)
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="How did the workout feel? Any specific exercises or achievements..."
              className="min-h-[100px] resize-none"
            />
          </div>

          {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? "Saving..." : "Save Workout"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
