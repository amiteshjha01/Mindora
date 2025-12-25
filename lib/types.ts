export interface User {
  _id: string
  email: string
  password: string
  name: string
  createdAt: Date
  onboardingComplete: boolean
  isSuperAdmin?: boolean
  isAdmin?: boolean
  profile?: {
    phone?: string
    dateOfBirth?: string
    gender?: string
    address?: string
    emergencyContact?: string
    medicalHistory?: string
    therapistName?: string
    therapistContact?: string
  }
  preferences?: {
    notifications?: boolean
    theme?: "light" | "dark"
  }
}

export interface MoodEntry {
  _id: string
  userId: string
  date: Date
  mood: 1 | 2 | 3 | 4 | 5
  note?: string
  triggers?: string[]
  createdAt: Date
}

export interface JournalEntry {
  _id: string
  userId: string
  date: Date
  content: string
  mood?: 1 | 2 | 3 | 4 | 5
  createdAt: Date
  updatedAt: Date
}

export interface Exercise {
  id: string
  title: string
  description: string
  duration: number // in seconds
  type: "breathing" | "mindfulness" | "grounding"
  instructions: string[]
}

export interface ExerciseSession {
  _id: string
  userId: string
  exerciseId: string
  completedAt: Date
  duration: number
}

export interface LearningArticle {
  id: string
  title: string
  description: string
  content: string
  category: "stress" | "anxiety" | "sleep" | "mindfulness" | "productivity"
  readTime: number // in minutes
  tags: string[]
}
