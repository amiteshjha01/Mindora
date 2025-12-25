"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ONBOARDING_STEPS = [
  {
    title: "Welcome to your wellness space",
    description:
      "This is a private tool to help you track your mood, reflect through journaling, and practice calming exercises. Take what feels helpful and leave the rest.",
  },
  {
    title: "Your privacy matters",
    description:
      "Your data is stored securely and privately. Nothing you write here is shared with anyone. You're in full control of your information.",
  },
  {
    title: "This is a self-help tool",
    description:
      "This app supports everyday wellness and stress management. It's not a replacement for professional mental health care. If you're experiencing a mental health crisis, please reach out to a qualified professional or crisis helpline.",
  },
  {
    title: "Use what works for you",
    description:
      "There's no pressure to use every feature or track everything daily. This is your space to explore at your own pace. You can always come back when you need support.",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  const completeOnboarding = async () => {
    setIsCompleting(true)
    try {
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      })

      if (response.ok) {
        router.push("/dashboard")
        router.refresh()
      } else {
        console.error("[v0] Failed to complete onboarding")
        setIsCompleting(false)
      }
    } catch (error) {
      console.error("[v0] Onboarding completion error:", error)
      setIsCompleting(false)
    }
  }

  const step = ONBOARDING_STEPS[currentStep]
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex justify-center gap-2">
          {ONBOARDING_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${index === currentStep ? "w-8 bg-primary" : "w-2 bg-muted"}`}
            />
          ))}
        </div>

        <Card>
          <CardContent className="pt-8 pb-6 px-6 sm:px-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground text-balance">{step.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-balance">{step.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={handleNext} disabled={isCompleting} className="flex-1">
                  {isLastStep ? (isCompleting ? "Getting started..." : "Get started") : "Continue"}
                </Button>
                {!isLastStep && (
                  <Button onClick={handleSkip} variant="outline" disabled={isCompleting}>
                    Skip
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Step {currentStep + 1} of {ONBOARDING_STEPS.length}
          </p>
        </div>
      </div>
    </div>
  )
}
