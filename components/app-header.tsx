"use client"

import Link from "next/link"
import { Dumbbell, Settings } from "lucide-react"

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FitTracker Pro
              </div>
              <div className="text-xs text-gray-600">Your fitness companion</div>
            </div>
          </Link>

          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-white"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AppHeader


