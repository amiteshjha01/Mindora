import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { findUserById, updateUser, updateUserProfile } from "@/lib/db-helpers"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userData = await findUserById(user.userId)

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      name: userData.name,
      email: userData.email,
      profile: userData.profile || {},
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      phone,
      dateOfBirth,
      gender,
      address,
      emergencyContact,
      medicalHistory,
      therapistName,
      therapistContact,
    } = body

    // Update name if changed
    if (name) {
      await updateUser(user.userId, { name })
    }

    // Update profile information
    await updateUserProfile(user.userId, {
      phone,
      dateOfBirth,
      gender,
      address,
      emergencyContact,
      medicalHistory,
      therapistName,
      therapistContact,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
