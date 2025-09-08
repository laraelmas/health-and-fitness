import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getWorkouts } from "@/app/actions/workouts"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Dumbbell, Heart, Zap, Plus, Star, Calendar } from "lucide-react"
import { format, isAfter, subDays } from "date-fns"

const workoutTypeConfig = {
  cardio: { icon: Heart, color: "bg-red-100 text-red-700 border-red-200" },
  strength: { icon: Dumbbell, color: "bg-blue-100 text-blue-700 border-blue-200" },
  pilates: { icon: Zap, color: "bg-purple-100 text-purple-700 border-purple-200" },
  custom: { icon: Plus, color: "bg-green-100 text-green-700 border-green-200" },
}

export default async function ReviewPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  const workouts = await getWorkouts()

  // Get workouts that can be reviewed (completed in the last 7 days and don't have reviews yet)
  const reviewableWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(workout.workout_date)
    const sevenDaysAgo = subDays(new Date(), 7)
    return isAfter(workoutDate, sevenDaysAgo) || workout.workout_date === new Date().toISOString().split("T")[0]
  })

  // Get workouts that already have reviews
  const { data: reviewedWorkouts } = await supabase.from("workout_reviews").select("workout_id").eq("user_id", user.id)

  const reviewedWorkoutIds = new Set(reviewedWorkouts?.map((r) => r.workout_id) || [])
  const pendingReviews = reviewableWorkouts.filter((workout) => !reviewedWorkoutIds.has(workout.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Reviews</h1>
          <p className="text-gray-600">
            Rate your recent workouts to track how they felt and identify what works best for you.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold">{pendingReviews.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Recent Workouts</p>
                  <p className="text-2xl font-bold">{reviewableWorkouts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed Reviews</p>
                  <p className="text-2xl font-bold">{reviewedWorkoutIds.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews */}
        {pendingReviews.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Workouts Ready for Review</h2>
            <div className="grid gap-4">
              {pendingReviews.map((workout) => {
                const config = workoutTypeConfig[workout.type]
                const Icon = config.icon
                return (
                  <Card key={workout.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary" className={config.color}>
                            <Icon className="h-4 w-4 mr-1" />
                            {workout.type}
                          </Badge>
                          <div>
                            <p className="font-medium">{format(new Date(workout.workout_date), "EEEE, MMMM d")}</p>
                            <p className="text-sm text-muted-foreground">{workout.duration} minutes</p>
                          </div>
                          {workout.notes && (
                            <div className="max-w-md">
                              <p className="text-sm text-muted-foreground truncate">{workout.notes}</p>
                            </div>
                          )}
                        </div>
                        <Button asChild>
                          <Link href={`/review/${workout.id}`}>
                            <Star className="h-4 w-4 mr-2" />
                            Review
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Workouts to Review</h3>
              <p className="text-muted-foreground mb-4">
                {reviewableWorkouts.length === 0
                  ? "Complete some workouts to start reviewing them!"
                  : "You've reviewed all your recent workouts. Great job!"}
              </p>
              <Button asChild>
                <Link href="/add">Log a New Workout</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recently Reviewed */}
        {reviewedWorkoutIds.size > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Recently Reviewed</h2>
            <div className="grid gap-4">
              {reviewableWorkouts
                .filter((workout) => reviewedWorkoutIds.has(workout.id))
                .slice(0, 3)
                .map((workout) => {
                  const config = workoutTypeConfig[workout.type]
                  const Icon = config.icon
                  return (
                    <Card key={workout.id} className="opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary" className={config.color}>
                              <Icon className="h-4 w-4 mr-1" />
                              {workout.type}
                            </Badge>
                            <div>
                              <p className="font-medium">{format(new Date(workout.workout_date), "EEEE, MMMM d")}</p>
                              <p className="text-sm text-muted-foreground">{workout.duration} minutes</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-green-600">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">Reviewed</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
