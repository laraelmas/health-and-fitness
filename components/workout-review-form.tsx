"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { createWorkoutReview } from "@/app/actions/workouts"
import type { Workout } from "@/lib/types"
import { Star, Zap, Target, Dumbbell, Heart, Plus } from "lucide-react"
import { format } from "date-fns"

const workoutTypeConfig = {
  cardio: { icon: Heart, color: "bg-red-100 text-red-700 border-red-200" },
  strength: { icon: Dumbbell, color: "bg-blue-100 text-blue-700 border-blue-200" },
  pilates: { icon: Zap, color: "bg-purple-100 text-purple-700 border-purple-200" },
  custom: { icon: Plus, color: "bg-green-100 text-green-700 border-green-200" },
}

interface WorkoutReviewFormProps {
  workout: Workout
  onSuccess?: () => void
}

export function WorkoutReviewForm({ workout, onSuccess }: WorkoutReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [energyLevel, setEnergyLevel] = useState(0)
  const [difficulty, setDifficulty] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    if (rating === 0) {
      setError("Please provide an overall rating")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Add the rating values to form data
      formData.set("rating", rating.toString())
      if (energyLevel > 0) formData.set("energy_level", energyLevel.toString())
      if (difficulty > 0) formData.set("difficulty", difficulty.toString())

      await createWorkoutReview(workout.id, formData)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review")
    } finally {
      setIsLoading(false)
    }
  }

  const config = workoutTypeConfig[workout.type]
  const Icon = config.icon

  const StarRating = ({
    value,
    onChange,
    label,
    icon: RatingIcon,
  }: {
    value: number
    onChange: (value: number) => void
    label: string
    icon?: React.ComponentType<{ className?: string }>
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        {RatingIcon && <RatingIcon className="h-4 w-4" />}
        {label}
      </Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 rounded transition-colors ${
              star <= value ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
            }`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Badge variant="secondary" className={config.color}>
            <Icon className="h-4 w-4 mr-1" />
            {workout.type}
          </Badge>
          <span>Review Your Workout</span>
        </CardTitle>
        <CardDescription>
          {format(new Date(workout.workout_date), "EEEE, MMMM d, yyyy")} • {workout.duration} minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* Workout Notes Display */}
          {workout.notes && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium text-muted-foreground">Your workout notes:</Label>
              <p className="text-sm mt-1">{workout.notes}</p>
            </div>
          )}

          {/* Overall Rating */}
          <StarRating value={rating} onChange={setRating} label="Overall Rating *" icon={Star} />

          {/* Energy Level */}
          <StarRating value={energyLevel} onChange={setEnergyLevel} label="Energy Level (Optional)" icon={Zap} />

          {/* Difficulty */}
          <StarRating value={difficulty} onChange={setDifficulty} label="Difficulty (Optional)" icon={Target} />

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium">
              Additional Feedback (Optional)
            </Label>
            <Textarea
              id="feedback"
              name="feedback"
              placeholder="How did this workout feel? What went well? What could be improved?"
              className="min-h-[100px] resize-none"
            />
          </div>

          {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || rating === 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
