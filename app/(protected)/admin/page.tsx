import { getCurrentUser } from "@/lib/auth"
import {
  findUserById,
  getAllUsers,
  getAllMoodEntries,
  getAllJournalEntries,
  getAllExerciseSessions,
} from "@/lib/db-helpers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, BookOpen, Brain, TrendingUp, Shield, UserCog } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Admin Dashboard - User Management & Analytics",
  description: "Manage users and view platform analytics",
}

export default async function AdminDashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  const userData = await findUserById(user.userId)
  if (!userData?.isSuperAdmin && !userData?.isAdmin) redirect("/dashboard")

  const allUsers = await getAllUsers()
  const allMoods = await getAllMoodEntries()
  const allJournals = await getAllJournalEntries()
  const allExercises = await getAllExerciseSessions()

  const activeUsers = allUsers.filter((u) => {
    const lastActive = new Date(u.createdAt)
    const daysSince = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince <= 30
  }).length

  const isSuperAdmin = userData.isSuperAdmin === true

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-6 lg:px-12 xl:px-16 py-8 md:py-12 space-y-8">
        {/* Admin Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-secondary p-10 md:p-16 text-white shadow-2xl animate-fadeIn">
          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
              {isSuperAdmin ? (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Super Admin Dashboard</span>
                </>
              ) : (
                <>
                  <UserCog className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              {isSuperAdmin ? "Platform Analytics & User Management" : "Platform Overview"}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {isSuperAdmin
                ? "Monitor platform health, manage users, and export comprehensive reports"
                : "View platform statistics and user data"}
            </p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />
        </div>

        {/* Platform Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slideUp animate-delay-100">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Total Users</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-1">{allUsers.length}</div>
              <p className="text-sm text-muted-foreground">{activeUsers} active in last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-gradient-to-br from-card to-secondary/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slideUp animate-delay-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Mood Entries</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-secondary mb-1">{allMoods.length}</div>
              <p className="text-sm text-muted-foreground">Across all users</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slideUp animate-delay-300">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Journal Entries</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent mb-1">{allJournals.length}</div>
              <p className="text-sm text-muted-foreground">Private reflections</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-indigo-500/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slideUp animate-delay-400">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">Exercise Sessions</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{allExercises.length}</div>
              <p className="text-sm text-muted-foreground">Calming practices</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                User Management
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {isSuperAdmin ? "View, edit, and manage user accounts" : "View user accounts and information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/users">
                <Button className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all">
                  {isSuperAdmin ? "Manage Users" : "View Users"}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                Platform Analytics {isSuperAdmin ? "& Reports" : ""}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {isSuperAdmin ? "View detailed analytics and export data" : "View platform analytics"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/analytics">
                <Button
                  variant="secondary"
                  className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users Table */}
        <Card className="shadow-xl border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Recent Users</CardTitle>
            <CardDescription className="text-base">Latest user registrations on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {allUsers.slice(0, 10).map((u, idx) => (
                <div
                  key={u._id}
                  className="flex items-center justify-between p-5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-all duration-200 hover:shadow-md border border-border/50"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-base text-foreground">{u.name}</p>
                      <p className="text-sm text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Joined {new Date(u.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {u.isSuperAdmin && (
                      <span className="text-xs bg-primary/20 text-primary px-3 py-1.5 rounded-full font-semibold border border-primary/30">
                        Super Admin
                      </span>
                    )}
                    {u.isAdmin && !u.isSuperAdmin && (
                      <span className="text-xs bg-secondary/20 text-secondary px-3 py-1.5 rounded-full font-semibold border border-secondary/30">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
