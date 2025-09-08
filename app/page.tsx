import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Dumbbell, Calendar, Plus, BarChart3, Target, Zap, Flame, Activity, Droplet } from "lucide-react"
import { DashboardTabs } from "@/components/dashboard-tabs"

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
          <div className="mb-12">
            <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 p-6 sm:p-8 text-white shadow-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-3xl font-bold leading-tight">Welcome back! 👋</p>
                  <p className="text-white/80 text-lg">Ready to crush your fitness goals today?</p>
                </div>
                <Button asChild className="bg-white text-purple-700 hover:bg-white/90 shadow-sm px-5 h-11">
                  <Link href="/add" className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Log Workout
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Card className="border-orange-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">Today's Calories</p>
                      <p className="mt-2 text-3xl font-extrabold text-orange-600">1,247</p>
                      <p className="text-gray-500">Goal: 2,000</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <Flame className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-gradient-to-r from-black to-indigo-900" style={{ width: "62%" }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">Workouts</p>
                      <p className="mt-2 text-3xl font-extrabold text-green-600">12</p>
                      <p className="text-gray-500">This week</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">Streak</p>
                      <p className="mt-2 text-3xl font-extrabold text-blue-600">7</p>
                      <p className="text-gray-500">Days</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">Water</p>
                      <p className="mt-2 text-3xl font-extrabold text-purple-600">6/8</p>
                      <p className="text-gray-500">Glasses</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Droplet className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-gradient-to-r from-black to-indigo-900" style={{ width: "75%" }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tabs Selector below stats */}
        <DashboardTabs />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow border-red-200">
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

          <Card className="hover:shadow-lg transition-shadow border-blue-200">
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

          <Card className="hover:shadow-lg transition-shadow border-purple-200">
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

          <Card className="hover:shadow-lg transition-shadow border-green-200">
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

          <Card className="hover:shadow-lg transition-shadow border-yellow-200">
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

          <Card className="hover:shadow-lg transition-shadow border-indigo-200">
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
          <div className="max-w-6xl mx-auto">
            <Card className="bg-white/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
                <CardDescription>Get started with these common actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Button asChild className="h-20 sm:h-24 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white shadow-md">
                    <Link href="/add" className="flex w-full flex-col items-center justify-center gap-2">
                      <Plus className="h-5 w-5" />
                      <span className="font-semibold">Add Workout</span>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-20 sm:h-24 bg-white text-black/80 border-gray-200">
                    <Link href="/workouts" className="flex w-full flex-col items-center justify-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-semibold">View Progress</span>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-20 sm:h-24 bg-white text-black/80 border-gray-200">
                    <Link href="/calendar" className="flex w-full flex-col items-center justify-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-semibold">Calendar</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
