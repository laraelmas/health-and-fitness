import { WorkoutReviewForm } from "@/components/workout-review-form"
import { getWorkouts } from "@/app/actions/workouts"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ReviewWorkoutPageProps {
  params: Promise<{ workoutId: string }>
}

export default async function ReviewWorkoutPage({ params }: ReviewWorkoutPageProps) {
  const { workoutId } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  const workouts = await getWorkouts()
  const workout = workouts.find((w) => w.id === workoutId)

  if (!workout) {
    redirect("/review")
  }

  // Check if already reviewed
  const { data: existingReview } = await supabase
    .from("workout_reviews")
    .select("id")
    .eq("workout_id", workoutId)
    .eq("user_id", user.id)
    .single()

  if (existingReview) {
    redirect("/review")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Link
            href="/review"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reviews
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rate Your Workout</h1>
          <p className="text-gray-600">Share how this workout felt to help track your progress and preferences.</p>
        </div>

        <WorkoutReviewForm
          workout={workout}
          onSuccess={() => {
            window.location.href = "/review"
          }}
        />
      </div>
    </div>
  )
}
