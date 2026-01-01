"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Shield, Phone, Calendar, MapPin, AlertCircle, Stethoscope, UserCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProfileData {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  emergencyContact: string
  medicalHistory: string
  therapistName: string
  therapistContact: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
    therapistName: "",
    therapistContact: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.profile?.phone || "",
          dateOfBirth: data.profile?.dateOfBirth || "",
          gender: data.profile?.gender || "",
          address: data.profile?.address || "",
          emergencyContact: data.profile?.emergencyContact || "",
          medicalHistory: data.profile?.medicalHistory || "",
          therapistName: data.profile?.therapistName || "",
          therapistContact: data.profile?.therapistContact || "",
        })
      }
    } catch (error) {
      console.error("[v0] Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" })
      } else {
        setMessage({ type: "error", text: "Failed to update profile. Please try again." })
      }
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      setMessage({ type: "error", text: "An error occurred. Please try again." })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
              <UserCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Your Profile</h1>
              <p className="text-muted-foreground text-lg mt-1">Manage your personal information and settings</p>
            </div>
          </div>

          <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-900 dark:text-blue-100">
              Your personal information is encrypted and securely stored. This data is used to personalize your
              experience and generate professional reports for healthcare providers.
            </AlertDescription>
          </Alert>
        </div>

        {message && (
          <Alert
            className={`mb-6 ${
              message.type === "success"
                ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30"
                : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
            }`}
          >
            <AlertCircle
              className={`h-5 w-5 ${
                message.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            />
            <AlertDescription
              className={
                message.type === "success" ? "text-green-900 dark:text-green-100" : "text-red-900 dark:text-red-100"
              }
            >
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6 lg:p-8 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email Address *
                </Label>
                <Input id="email" type="email" value={profile.email} disabled className="h-11 bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="h-11 pl-10"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-base font-medium">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    className="h-11 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-base font-medium">
                  Gender
                </Label>
                <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-base font-medium">
                  Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="pl-10 min-h-[80px]"
                    placeholder="Street address, city, state, zip code"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Emergency Contact */}
          <Card className="p-6 lg:p-8 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-foreground">Emergency Contact</h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-base font-medium">
                Emergency Contact Information
              </Label>
              <Textarea
                id="emergencyContact"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="min-h-[100px]"
                placeholder="Name, relationship, and phone number of emergency contact"
              />
            </div>
          </Card>

          {/* Medical Information */}
          <Card className="p-6 lg:p-8 border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Medical Information</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory" className="text-base font-medium">
                  Medical History
                </Label>
                <Textarea
                  id="medicalHistory"
                  value={profile.medicalHistory}
                  onChange={(e) => setProfile({ ...profile, medicalHistory: e.target.value })}
                  className="min-h-[120px]"
                  placeholder="Relevant medical conditions, medications, allergies, etc."
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="therapistName" className="text-base font-medium">
                    Therapist/Counselor Name
                  </Label>
                  <Input
                    id="therapistName"
                    value={profile.therapistName}
                    onChange={(e) => setProfile({ ...profile, therapistName: e.target.value })}
                    className="h-11"
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="therapistContact" className="text-base font-medium">
                    Therapist Contact
                  </Label>
                  <Input
                    id="therapistContact"
                    value={profile.therapistContact}
                    onChange={(e) => setProfile({ ...profile, therapistContact: e.target.value })}
                    className="h-11"
                    placeholder="Phone or email"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => fetchProfile()} disabled={saving} size="lg">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity min-w-[150px]"
            >
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
