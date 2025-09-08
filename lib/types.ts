export interface Workout {
  id: string
  user_id: string
  type: "cardio" | "strength" | "pilates" | "custom"
  duration?: number | null // in minutes
  notes?: string
  workout_date?: string | null // ISO date string
  created_at: string
  updated_at: string
}

export interface WorkoutReview {
  id: string
  workout_id: string
  user_id: string
  rating: number // 1-5
  feedback?: string
  energy_level?: number // 1-5
  difficulty?: number // 1-5
  created_at: string
  updated_at: string
}

export interface WorkoutWithReview extends Workout {
  review?: WorkoutReview
}

export type WorkoutType = "cardio" | "strength" | "pilates" | "custom"
