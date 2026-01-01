import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { findUserById, getMoodEntries, getJournalEntries, getExerciseSessions } from "@/lib/db-helpers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BookOpen, Brain, TrendingUp, Heart, Sparkles, Target } from "lucide-react"

export const metadata = {
  title: "Dashboard - Your Wellness Journey",
  description: "Track your mood, journal entries, and calming exercises in one place",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const userData = await findUserById(user.userId)
  const recentMoods = await getMoodEntries(user.userId, 7)
  const recentJournals = await getJournalEntries(user.userId, 5)
  const recentExercises = await getExerciseSessions(user.userId, 10)

  const today = new Date().toDateString()
  const hasLoggedMoodToday = recentMoods.some((entry) => new Date(entry.date).toDateString() === today)

  const avgMood =
    recentMoods.length > 0
      ? (recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length).toFixed(1)
      : "N/A"

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full px-4 md:px-6 lg:px-12 xl:px-16 py-8 md:py-12 space-y-8">
        {/* ================= HERO ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-10 md:p-16 text-white animate-fadeIn">
          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Breaking Free from Stress</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Welcome back, {userData?.name}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {hasLoggedMoodToday
                ? "Great progress! You're building a consistent wellness routine."
                : "Take a moment to check in with yourself today. Your mental health matters."}
            </p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        </div>

        {/* ================= STATS ================= */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-slideInRight">
          <StatCard
            title="Mood This Week"
            value={avgMood}
            subtitle={`${recentMoods.length} entries logged`}
            icon={<Heart />}
            color="primary"
          />
          <StatCard
            title="Journal Entries"
            value={recentJournals.length}
            subtitle="Recent reflections"
            icon={<BookOpen />}
            color="secondary"
          />
          <StatCard
            title="Exercises Done"
            value={recentExercises.length}
            subtitle="Calming sessions"
            icon={<Brain />}
            color="accent"
          />
          <StatCard
            title="Check-In Streak"
            value={hasLoggedMoodToday ? "✓" : "—"}
            subtitle={hasLoggedMoodToday ? "Logged today" : "Not yet today"}
            icon={<TrendingUp />}
            color="primary"
          />
        </div>

        {/* ================= MISSION ================= */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 shadow-lg">
          <CardContent className="p-8 md:p-10 flex gap-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Our Mission: Help You Break Free from Stress</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're here to support you through exam pressure, work stress, and daily challenges with evidence-based
                techniques.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            href="/mood"
            title="Log Your Mood"
            desc="Check in with your emotions today"
            icon={<Heart className="w-8 h-8" />}
            color="primary"
          />
          <QuickAction
            href="/journal"
            title="Write in Journal"
            desc="Express your thoughts freely"
            icon={<BookOpen className="w-8 h-8" />}
            color="secondary"
          />
          <QuickAction
            href="/exercises"
            title="Calming Exercise"
            desc="Practice mindfulness & breathing"
            icon={<Brain className="w-8 h-8" />}
            color="accent"
          />
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Activity className="text-primary w-6 h-6" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMoods.length === 0 && recentJournals.length === 0 && recentExercises.length === 0 ? (
              <p className="text-center text-muted-foreground py-12 text-lg">
                No recent activity yet. Start your wellness journey today!
              </p>
            ) : (
              <div className="space-y-4">
                {recentMoods.slice(0, 3).map((m) => (
                  <div
                    key={m._id}
                    className="flex justify-between items-center p-5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-base font-medium">Mood logged</span>
                    <span className="font-bold text-primary text-xl">{m.mood}/5</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* ================= HELPERS ================= */

function StatCard({ title, value, subtitle, icon, color }: any) {
  return (
    <Card className={`border-${color}/30 bg-${color}/5 hover:shadow-lg transition-shadow`}>
      <CardHeader className="flex flex-row justify-between items-center pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`text-${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-5xl font-bold text-${color} mb-2`}>{value}</div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}

function QuickAction({ href, title, desc, icon, color }: any) {
  return (
    <Link
      href={href}
      className={`rounded-2xl bg-${color} text-white p-10 hover:opacity-90 hover:scale-105 transition-all shadow-lg`}
    >
      <div className="space-y-4">
        <div>{icon}</div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-white/90 text-base leading-relaxed">{desc}</p>
      </div>
    </Link>
  )
}
