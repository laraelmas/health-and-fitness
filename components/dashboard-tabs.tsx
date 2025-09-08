'use client'

import { useState } from 'react'

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
      </div>
    </div>
  )
}


