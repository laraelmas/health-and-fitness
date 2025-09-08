"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Workout } from "@/lib/types"

export async function createWorkout(formData: FormData) {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/auth/login")
  }

  const type = formData.get("type") as string
  const duration = Number.parseInt(formData.get("duration") as string)
  const notes = formData.get("notes") as string
  const workoutDate = formData.get("workout_date") as string

  const { data, error } = await supabase
    .from("workouts")
    .insert({
      user_id: user.id,
      type,
      duration,
      notes: notes || null,
      workout_date: workoutDate,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create workout: ${error.message}`)
  }

  revalidatePath("/workouts")
  return data
}

export async function getWorkouts(): Promise<Workout[]> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return []
  }

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .order("workout_date", { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch workouts: ${error.message}`)
  }

  return data || []
}

export async function deleteWorkout(workoutId: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/auth/login")
  }

  const { error } = await supabase.from("workouts").delete().eq("id", workoutId).eq("user_id", user.id)

  if (error) {
    throw new Error(`Failed to delete workout: ${error.message}`)
  }

  revalidatePath("/workouts")
}

export async function createWorkoutReview(workoutId: string, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/auth/login")
  }

  const rating = Number.parseInt(formData.get("rating") as string)
  const feedback = formData.get("feedback") as string
  const energyLevel = formData.get("energy_level") ? Number.parseInt(formData.get("energy_level") as string) : null
  const difficulty = formData.get("difficulty") ? Number.parseInt(formData.get("difficulty") as string) : null

  const { data, error } = await supabase
    .from("workout_reviews")
    .insert({
      workout_id: workoutId,
      user_id: user.id,
      rating,
      feedback: feedback || null,
      energy_level: energyLevel,
      difficulty,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create review: ${error.message}`)
  }

  revalidatePath("/workouts")
  revalidatePath("/review")
  return data
}
