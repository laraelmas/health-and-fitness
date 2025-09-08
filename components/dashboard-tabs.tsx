'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, BarChart3, Calendar, Target, Zap, Dumbbell, Flame, Clock, Star, Heart, Trash2 } from 'lucide-react'

type DashboardTabKey = 'dashboard' | 'calories' | 'workouts'

const TAB_LABELS: Record<DashboardTabKey, string> = {
  dashboard: 'Dashboard',
  calories: 'Calories',
  workouts: 'Workouts',
}

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>('dashboard')

  return (
    <div className="mt-6 mb-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-full bg-white/70 shadow-sm p-1">
          <div className="grid grid-cols-3 gap-1">
            {Object.entries(TAB_LABELS).map(([key, label]) => {
              const isActive = activeTab === (key as DashboardTabKey)
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as DashboardTabKey)}
                  className={[
                    'w-full rounded-full px-6 py-2.5 text-center text-sm font-semibold transition-colors',
                    isActive
                      ? 'text-white bg-[#8B46FF]'
                      : 'text-black/80 hover:text-black',
                  ].join(' ')}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'calories' && (
          <div className="mt-6 space-y-6">
            {/* Macro Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-orange-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Calories</div>
                  <span className="text-xs rounded-full bg-orange-50 text-orange-600 px-2 py-0.5">36%</span>
                </div>
                <div className="mt-3 font-semibold text-black">710 / 2000</div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-2/5 rounded-full bg-black" />
                </div>
                <div className="mt-2 text-xs text-gray-500">1290 remaining</div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Protein</div>
                  <span className="text-xs rounded-full bg-blue-50 text-blue-600 px-2 py-0.5">39%</span>
                </div>
                <div className="mt-3 font-semibold text-black">58g / 150g</div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-1/4 rounded-full bg-black" />
                </div>
              </div>

              <div className="rounded-xl border border-green-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Carbs</div>
                  <span className="text-xs rounded-full bg-green-50 text-green-600 px-2 py-0.5">19%</span>
                </div>
                <div className="mt-3 font-semibold text-black">48g / 250g</div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-1/6 rounded-full bg-black" />
                </div>
              </div>

              <div className="rounded-xl border border-purple-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-gray-600">Fat</div>
                  <span className="text-xs rounded-full bg-purple-50 text-purple-600 px-2 py-0.5">54%</span>
                </div>
                <div className="mt-3 font-semibold text-black">35g / 65g</div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-1/2 rounded-full bg-black" />
                </div>
              </div>
            </div>

            {/* Add Food + Food Log */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold">Add Food</div>
                <p className="text-gray-500 text-sm mt-1">Log your meals and track your nutrition</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Food Name</div>
                    <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="e.g., Grilled Chicken" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Calories</div>
                      <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="250" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Serving Size</div>
                      <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="1 cup" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Protein (g)</div>
                      <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="25" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Carbs (g)</div>
                      <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="15" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Fat (g)</div>
                      <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="8" />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Meal Type</div>
                    <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Snack</option>
                    </select>
                  </div>

                  <button className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-md bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white font-semibold">
                    Add Food
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold">Today's Food Log</div>
                <p className="text-gray-500 text-sm mt-1">Track what you've eaten today</p>

                <div className="mt-6 space-y-4">
                  {[
                    { name: 'Greek Yogurt with Berries', tag: 'breakfast', cal: 180, protein: 15, carbs: 20, fat: 5, time: '8:30 AM' },
                    { name: 'Grilled Chicken Salad', tag: 'lunch', cal: 340, protein: 35, carbs: 12, fat: 18, time: '12:45 PM' },
                    { name: 'Apple with Peanut Butter', tag: 'snack', cal: 190, protein: 8, carbs: 16, fat: 12, time: '3:15 PM' },
                  ].map((item) => (
                    <div key={item.name} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="mt-1 text-sm text-gray-500 flex flex-wrap gap-4">
                            <span className="text-orange-600 font-semibold">{item.cal} cal</span>
                            <span className="text-blue-600 font-semibold">{item.protein}g protein</span>
                            <span className="text-green-600 font-semibold">{item.carbs}g carbs</span>
                            <span className="text-purple-600 font-semibold">{item.fat}g fat</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-gray-600">Easily log cardio, strength, pilates, or custom workouts with duration and notes.</p>
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
                <p className="text-gray-600">View your workouts in table format and track your fitness journey over time.</p>
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
                <p className="text-gray-600">Visualize your workout schedule and consistency with an intuitive calendar interface.</p>
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
                <p className="text-gray-600">Rate your workouts and add feedback to understand what works best for you.</p>
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
        )}

        {activeTab === 'workouts' && (
          <div className="mt-6 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-blue-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">Total Workouts</div>
                      <div className="mt-2 text-3xl font-extrabold text-blue-600">3</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <ActivityIcon />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">Total Time</div>
                      <div className="mt-2 text-3xl font-extrabold text-green-600">2h 15m</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">Calories Burned</div>
                      <div className="mt-2 text-3xl font-extrabold text-orange-600">850</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <Flame className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-600 text-sm">Avg Rating</div>
                      <div className="mt-2 text-3xl font-extrabold text-yellow-600">4.3</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Log + History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Log Workout */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold">Log Workout</div>
                <p className="text-gray-500 text-sm mt-1">Add a new workout to your log</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Workout Name</div>
                    <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="e.g., Morning Run" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Type</div>
                    <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                      <option>Cardio</option>
                      <option>Strength</option>
                      <option>Pilates</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Duration (min)</div>
                      <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="45" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Calories (optional)</div>
                      <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="300" />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Rating</div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Notes (optional)</div>
                    <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" placeholder="How did the workout feel?" />
                  </div>

                  <button className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white font-semibold">
                    <Plus className="h-5 w-5" />
                    Log Workout
                  </button>
                </div>
              </div>

              {/* History */}
              <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold">Workout History</div>
                <p className="text-gray-500 text-sm mt-1">Your recent workout sessions</p>

                <div className="mt-6 space-y-4">
                  {[
                    { name: 'Morning Run', tag: 'cardio', duration: '45 min', calories: 420, date: '1/15/2024', rating: 5, note: 'Great pace, felt energized throughout' },
                    { name: 'Upper Body Strength', tag: 'strength', duration: '60 min', calories: 280, date: '1/14/2024', rating: 4, note: 'Increased weight on bench press' },
                    { name: 'Pilates Core', tag: 'pilates', duration: '30 min', calories: 150, date: '1/13/2024', rating: 4, note: 'Focused on form and breathing' },
                  ].map((w) => {
                    const style = getWorkoutStyle(w.tag)
                    return (
                      <div key={w.name} className="rounded-xl border border-gray-200 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={["h-10 w-10 rounded-xl flex items-center justify-center", style.iconBg].join(' ')}>
                              {style.icon}
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{w.name}</div>
                              <div className="mt-1 text-sm text-gray-500 flex flex-wrap items-center gap-4">
                                <span className={["rounded-md px-2 py-0.5 text-xs font-medium", style.badgeBg, style.badgeText].join(' ')}>{w.tag}</span>
                                <span className="text-gray-600">{w.duration}</span>
                                <span className="text-gray-600">{w.calories} cal</span>
                                <span className="text-gray-600">{w.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={['h-4 w-4', i < w.rating ? 'text-yellow-500' : 'text-gray-300'].join(' ')} />
                            ))}
                            <button className="text-red-500 hover:text-red-600" aria-label="Delete">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <input className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" defaultValue={w.note} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityIcon() {
  return (
    <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function getWorkoutStyle(tag: string) {
  switch (tag) {
    case 'cardio':
      return {
        icon: <Heart className="h-5 w-5 text-pink-500" />,
        iconBg: 'bg-pink-100',
        badgeBg: 'bg-pink-100',
        badgeText: 'text-pink-700',
      }
    case 'strength':
      return {
        icon: <Dumbbell className="h-5 w-5 text-blue-600" />,
        iconBg: 'bg-blue-100',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-700',
      }
    case 'pilates':
      return {
        icon: <Zap className="h-5 w-5 text-green-600" />,
        iconBg: 'bg-green-100',
        badgeBg: 'bg-green-100',
        badgeText: 'text-green-700',
      }
    default:
      return {
        icon: <Dumbbell className="h-5 w-5 text-gray-600" />,
        iconBg: 'bg-gray-100',
        badgeBg: 'bg-gray-100',
        badgeText: 'text-gray-700',
      }
  }
}


