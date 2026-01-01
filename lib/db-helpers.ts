import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"
import type { User, MoodEntry, JournalEntry, ExerciseSession } from "./types"

export async function createUser(userData: Omit<User, "_id" | "createdAt" | "onboardingComplete">) {
  const db = await getDatabase()
  const result = await db.collection("users").insertOne({
    ...userData,
    createdAt: new Date(),
    onboardingComplete: false,
  })
  return result.insertedId.toString()
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase()
  const user = await db.collection("users").findOne({ email })
  if (!user) return null
  return { ...user, _id: user._id.toString() } as User
}

export async function findUserById(userId: string): Promise<User | null> {
  const db = await getDatabase()
  const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })
  if (!user) return null
  return { ...user, _id: user._id.toString() } as User
}

export async function updateUser(userId: string, updates: Partial<User>) {
  const db = await getDatabase()
  await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: updates })
}

export async function updateUserProfile(userId: string, profile: User["profile"]) {
  const db = await getDatabase()
  await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { profile } })
}

export async function updateUserPassword(userId: string, hashedPassword: string) {
  const db = await getDatabase()
  await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { password: hashedPassword } })
}

export async function createMoodEntry(moodData: Omit<MoodEntry, "_id" | "createdAt">) {
  const db = await getDatabase()
  const result = await db.collection("mood_entries").insertOne({
    ...moodData,
    createdAt: new Date(),
  })
  return result.insertedId.toString()
}

export async function getMoodEntries(userId: string, limit = 30): Promise<MoodEntry[]> {
  const db = await getDatabase()
  const entries = await db.collection("mood_entries").find({ userId }).sort({ date: -1 }).limit(limit).toArray()

  return entries.map((entry) => ({ ...entry, _id: entry._id.toString() })) as MoodEntry[]
}

export async function createJournalEntry(journalData: Omit<JournalEntry, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const now = new Date()
  const result = await db.collection("journal_entries").insertOne({
    ...journalData,
    createdAt: now,
    updatedAt: now,
  })
  return result.insertedId.toString()
}

export async function getJournalEntries(userId: string, limit = 20): Promise<JournalEntry[]> {
  const db = await getDatabase()
  const entries = await db.collection("journal_entries").find({ userId }).sort({ date: -1 }).limit(limit).toArray()

  return entries.map((entry) => ({ ...entry, _id: entry._id.toString() })) as JournalEntry[]
}

export async function updateJournalEntry(entryId: string, userId: string, updates: Partial<JournalEntry>) {
  const db = await getDatabase()
  await db
    .collection("journal_entries")
    .updateOne({ _id: new ObjectId(entryId), userId }, { $set: { ...updates, updatedAt: new Date() } })
}

export async function deleteJournalEntry(entryId: string, userId: string) {
  const db = await getDatabase()
  await db.collection("journal_entries").deleteOne({
    _id: new ObjectId(entryId),
    userId,
  })
}

export async function createExerciseSession(sessionData: Omit<ExerciseSession, "_id">) {
  const db = await getDatabase()
  const result = await db.collection("exercise_sessions").insertOne(sessionData)
  return result.insertedId.toString()
}

export async function getExerciseSessions(userId: string, limit = 50): Promise<ExerciseSession[]> {
  const db = await getDatabase()
  const sessions = await db
    .collection("exercise_sessions")
    .find({ userId })
    .sort({ completedAt: -1 })
    .limit(limit)
    .toArray()

  return sessions.map((session) => ({ ...session, _id: session._id.toString() })) as ExerciseSession[]
}

export async function createAdmin(userData: {
  email: string
  password: string
  name: string
}): Promise<string> {
  const db = await getDatabase()
  const result = await db.collection("users").insertOne({
    ...userData,
    createdAt: new Date(),
    onboardingComplete: true,
    isAdmin: true,
    isSuperAdmin: false,
  })
  return result.insertedId.toString()
}

export async function updateUserRole(userId: string, isAdmin: boolean) {
  const db = await getDatabase()
  await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { isAdmin } })
}

export async function hasSuperAdmin(): Promise<boolean> {
  const db = await getDatabase()
  const count = await db.collection("users").countDocuments({ isSuperAdmin: true })
  return count > 0
}

export async function createSuperAdmin(userData: {
  email: string
  password: string
  name: string
}): Promise<string> {
  const db = await getDatabase()
  const result = await db.collection("users").insertOne({
    ...userData,
    createdAt: new Date(),
    onboardingComplete: true,
    isSuperAdmin: true,
    isAdmin: false,
  })
  return result.insertedId.toString()
}

export async function getAllUsers(): Promise<User[]> {
  const db = await getDatabase()
  const users = await db.collection("users").find({}).sort({ createdAt: -1 }).toArray()
  return users.map((user) => ({ ...user, _id: user._id.toString() })) as User[]
}

export async function getAllMoodEntries(): Promise<MoodEntry[]> {
  const db = await getDatabase()
  const entries = await db.collection("mood_entries").find({}).sort({ date: -1 }).toArray()
  return entries.map((entry) => ({ ...entry, _id: entry._id.toString() })) as MoodEntry[]
}

export async function getAllJournalEntries(): Promise<JournalEntry[]> {
  const db = await getDatabase()
  const entries = await db.collection("journal_entries").find({}).sort({ date: -1 }).toArray()
  return entries.map((entry) => ({ ...entry, _id: entry._id.toString() })) as JournalEntry[]
}

export async function getAllExerciseSessions(): Promise<ExerciseSession[]> {
  const db = await getDatabase()
  const sessions = await db.collection("exercise_sessions").find({}).sort({ completedAt: -1 }).toArray()
  return sessions.map((session) => ({ ...session, _id: session._id.toString() })) as ExerciseSession[]
}

export async function deleteUser(userId: string) {
  const db = await getDatabase()
  await db.collection("users").deleteOne({ _id: new ObjectId(userId) })
  await db.collection("mood_entries").deleteMany({ userId })
  await db.collection("journal_entries").deleteMany({ userId })
  await db.collection("exercise_sessions").deleteMany({ userId })
}

export async function getUserWithStats(userId: string) {
  const db = await getDatabase()
  const user = await findUserById(userId)
  if (!user) return null

  const moodCount = await db.collection("mood_entries").countDocuments({ userId })
  const journalCount = await db.collection("journal_entries").countDocuments({ userId })
  const exerciseCount = await db.collection("exercise_sessions").countDocuments({ userId })

  return {
    ...user,
    stats: {
      moodEntries: moodCount,
      journalEntries: journalCount,
      exerciseSessions: exerciseCount,
    },
  }
}
