import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Dumbbell, Calendar, Plus, BarChart3, Target, Zap } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FitTracker
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your personal fitness companion. Track workouts, monitor progress, and achieve your fitness goals.
          </p>
        </div>

        {/* Auth Section */}
        {!user ? (
          <div className="max-w-md mx-auto mb-12">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Sign up or log in to start tracking your workouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/auth/login">Log In</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-md mx-auto mb-12">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6 text-center">
                <p className="text-green-800 mb-4">Welcome back! Ready for your next workout?</p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Log New Workout
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Plus className="h-5 w-5 text-red-600" />
                </div>
                <CardTitle className="text-lg">Quick Logging</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Easily log cardio, strength, pilates, or custom workouts with duration and notes.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Progress Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                View your workouts in table format and track your fitness journey over time.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Calendar View</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visualize your workout schedule and consistency with an intuitive calendar interface.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Workout Reviews</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Rate your workouts and add feedback to understand what works best for you.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Multiple Types</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Support for cardio, strength training, pilates, and custom workout types.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Personal Data</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your workout data is private and secure, accessible only by you.</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions for Logged In Users */}
        {user && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-16 bg-transparent">
                <Link href="/add" className="flex flex-col items-center gap-2">
                  <Plus className="h-5 w-5" />
                  <span>Add Workout</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 bg-transparent">
                <Link href="/workouts" className="flex flex-col items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>View Workouts</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 bg-transparent">
                <Link href="/calendar" className="flex flex-col items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
