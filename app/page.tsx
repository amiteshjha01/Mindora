import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, Activity, BookOpen, Layout, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-20 pb-32 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 -z-10" />
        <div className="container mx-auto px-4 text-center space-y-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Breaking Free from Stress</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-tight">
            Prioritize Your <span className="text-primary">Mental Wellness</span> <br />
            Without Compromise
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            The private, evidence-based companion for exam aspirants and professionals to manage stress, track mood, and
            find their calm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="h-14 px-10 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all rounded-full"
            >
              <Link href="/signup">
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-10 text-lg font-bold bg-background/50 backdrop-blur rounded-full"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Tools for Inner Peace</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to build a consistent mental wellness routine.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Mood Tracking"
              desc="Log and visualize your emotional patterns with intuitive daily check-ins."
              className="animate-slideUp animate-delay-100"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Private Journal"
              desc="Express your thoughts freely in a secure space designed for reflection."
              className="animate-slideUp animate-delay-200"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Calming Exercises"
              desc="Access a library of evidence-based techniques for instant stress relief."
              className="animate-slideUp animate-delay-300"
            />
          </div>
        </div>
      </section>

      <section className="py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                How Mindora Helps You <span className="text-primary">Break Free</span>
              </h2>
              <div className="space-y-6">
                <StepItem
                  number="01"
                  title="Check-In"
                  desc="Start your day with a quick mood check-in to build emotional awareness."
                />
                <StepItem
                  number="02"
                  title="Reflect"
                  desc="Use the private journal to process your thoughts and navigate daily challenges."
                />
                <StepItem
                  number="03"
                  title="Practice"
                  desc="Engage in tailored exercises when you need to recalibrate and focus."
                />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl animate-pulse-glow" />
              <div className="absolute inset-8 bg-card border rounded-2xl shadow-2xl p-6 flex items-center justify-center">
                <Layout className="w-24 h-24 text-primary opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to take control?</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto">
            Join thousands of others building resilience and finding their calm every day.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-14 px-12 text-lg font-bold rounded-full">
            <Link href="/signup">Start Your Journey Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc, className }: any) {
  return (
    <div
      className={`p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function StepItem({ number, title, desc }: any) {
  return (
    <div className="flex gap-6">
      <div className="text-3xl font-black text-primary/20">{number}</div>
      <div className="space-y-1">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
