import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Heart, Sparkles, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-slate-900 dark:via-background dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero content */}
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Your journey to calm starts here
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Find peace
              </span>{" "}
              in your everyday life
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              A private, supportive space designed for exam aspirants and young professionals to manage stress, track
              emotions, and build resilience through evidence-based practices.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp animate-delay-200">
            <Button asChild size="lg" className="text-base h-12 px-8 shadow-lg hover:shadow-xl transition-all">
              <Link href="/signup">Start your journey</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-card/50 backdrop-blur border-2"
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <div className="rounded-2xl bg-card border border-border p-6 space-y-3 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-slideUp animate-delay-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Mood Tracking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Log your emotions daily and discover patterns in your mental wellness
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6 space-y-3 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-slideUp animate-delay-400">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg">Calming Exercises</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Practice breathing techniques and mindfulness to reduce stress instantly
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6 space-y-3 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-slideUp animate-delay-400">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Private Journal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Express your thoughts freely in a secure, judgment-free space
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6 space-y-3 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-slideUp animate-delay-400">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Learn & Grow</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access evidence-based resources on stress, sleep, and resilience
              </p>
            </div>
          </div>

          {/* Mission statement */}
          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">Built for your well-being</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This is a self-help tool designed specifically for everyday stress management. While not a replacement for
              professional mental health care, it provides practical techniques and a supportive environment to help you
              navigate challenges with confidence.
            </p>
          </div>

          {/* Footer disclaimer */}
          <div className="pt-12 text-sm text-muted-foreground border-t border-border/50">
            <p className="text-balance">Private. Secure. Supportive. Your data stays with you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
