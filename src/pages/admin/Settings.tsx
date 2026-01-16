import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save, Key, User, Shield, Trash2, UserPlus } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

const AdminSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const fetchAdminUsers = async () => {
    // Fetch all user roles with admin role
    const { data: roles, error } = await supabase
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin");

    if (error) {
      console.error("Error fetching admin users:", error);
      return;
    }

    // For now, we'll use the user_id as a placeholder
    // In a real setup, you'd want to get user emails from an edge function
    setAdminUsers(
      roles.map((r) => ({
        id: r.user_id,
        email: r.user_id === user?.id ? user?.email || "Current User" : "Admin User",
        created_at: r.created_at,
      }))
    );
  };

  useEffect(() => {
    fetchAdminUsers();
  }, [user]);

  const handleCreateUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    if (newUserPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingUser(true);

    try {
      // Create user using Supabase admin function
      // Note: This requires admin/service role key, which we'd need an edge function for
      // For now, we'll use signUp but explain the limitation
      const { data, error } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) throw error;

      if (data.user) {
        // Add user role
        const { error: roleError } = await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "user",
        });

        if (roleError) {
          console.error("Error adding user role:", roleError);
        }

        toast({
          title: "Success",
          description: "User created successfully. They will receive an email to confirm their account.",
        });
        setNewUserEmail("");
        setNewUserPassword("");
        fetchAdminUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;

    // Remove admin role
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", deleteTarget.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove user access.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "User access removed successfully.",
      });
      fetchAdminUsers();
    }
    setDeleteTarget(null);
  };

  const handlePasswordChange = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(user?.email || "", {
      redirectTo: `${window.location.origin}/auth`,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for a link to reset your password.",
      });
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and admin settings.
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList>
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Key className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Shield className="h-4 w-4" />
              User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your account details and profile settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value={user?.email || ""} disabled />
                  <p className="text-xs text-muted-foreground">
                    Contact support to change your email address.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Account ID</Label>
                  <Input value={user?.id || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value="Administrator" disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Send a password reset link to your email address.
                  </p>
                  <Button onClick={handlePasswordChange} variant="outline">
                    Send Reset Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-6">
              {/* Create New User */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Create New User
                  </CardTitle>
                  <CardDescription>
                    Create a new user account. They can reset their password after logging in.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">Email Address</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        placeholder="user@gahs.org.gh"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Initial Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateUser}
                    disabled={isCreatingUser || !newUserEmail || !newUserPassword}
                    className="gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    {isCreatingUser ? "Creating..." : "Create User"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Users can reset their password using the "Forgot password" link on the login page.
                  </p>
                </CardContent>
              </Card>

              {/* Current Admin Users */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Users</CardTitle>
                  <CardDescription>
                    Users with administrative access to the dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                          {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user?.email}</p>
                          <p className="text-sm text-muted-foreground">Administrator (You)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    To grant admin access to other users, add them to the user_roles table in the database with role 'admin'.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User Access</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to remove access for <strong>{deleteTarget?.email}</strong>?
              This will revoke their admin privileges.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive hover:bg-destructive/90">
              Yes, Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminSettings;
