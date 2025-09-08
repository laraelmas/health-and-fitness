import { WorkoutForm } from "@/components/workout-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function AddWorkoutPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Link
            href="/workouts"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workouts
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Log Your Workout</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Keep track of your fitness progress by logging each workout session. Every step counts towards your goals!
          </p>
        </div>

        <WorkoutForm />
      </div>
    </div>
  )
}
