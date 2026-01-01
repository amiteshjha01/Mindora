"use client"

import { useState } from "react"
import type { User } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Search, Shield, UserCog, KeyRound, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function UserManagementTable({
  users,
  currentUserId,
  isSuperAdmin,
}: {
  users: User[]
  currentUserId: string
  isSuperAdmin: boolean
}) {
  const [search, setSearch] = useState("")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showCreateAdminDialog, setShowCreateAdminDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This will delete all their data.")) return

    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    if (res.ok) {
      router.refresh()
    }
  }

  const handleChangePassword = async () => {
    if (!selectedUser || !newPassword) return

    setLoading(true)
    const res = await fetch("/api/admin/users/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUser._id, newPassword }),
    })

    if (res.ok) {
      setShowPasswordDialog(false)
      setNewPassword("")
      setSelectedUser(null)
      alert("Password changed successfully!")
    } else {
      alert("Failed to change password")
    }
    setLoading(false)
  }

  const handleCreateAdmin = async () => {
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    const res = await fetch("/api/admin/create-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminForm),
    })

    if (res.ok) {
      setShowCreateAdminDialog(false)
      setAdminForm({ name: "", email: "", password: "" })
      router.refresh()
      alert("Admin account created successfully!")
    } else {
      const error = await res.json()
      alert(error.error || "Failed to create admin account")
    }
    setLoading(false)
  }

  const getUserRole = (user: User) => {
    if (user.isSuperAdmin) return "Super Admin"
    if (user.isAdmin) return "Admin"
    return "User"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isSuperAdmin && (
          <Button onClick={() => setShowCreateAdminDialog(true)} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Create Admin Account
          </Button>
        )}
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              {isSuperAdmin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {user.isSuperAdmin ? (
                    <span className="inline-flex items-center gap-1 text-xs bg-secondary/20 text-secondary px-2 py-1 rounded font-medium">
                      <Shield className="w-3 h-3" />
                      Super Admin
                    </span>
                  ) : user.isAdmin ? (
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded font-medium">
                      <UserCog className="w-3 h-3" />
                      Admin
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">User</span>
                  )}
                </TableCell>
                {isSuperAdmin && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!user.isSuperAdmin && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user)
                              setShowPasswordDialog(true)
                            }}
                            className="text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <KeyRound className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(user._id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Change password for {selectedUser?.name} ({selectedUser?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleChangePassword} disabled={loading || !newPassword}>
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Admin Dialog */}
      <Dialog open={showCreateAdminDialog} onOpenChange={setShowCreateAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Admin Account</DialogTitle>
            <DialogDescription>Create a new admin account with read-only access to user data.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">Name</Label>
              <Input
                id="adminName"
                value={adminForm.name}
                onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                placeholder="Admin name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminForm.email}
                onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={adminForm.password}
                onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                placeholder="Secure password"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateAdminDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAdmin} disabled={loading}>
                {loading ? "Creating..." : "Create Admin"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
