import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verify the requesting user is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user: requestingUser }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !requestingUser) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if requesting user is admin
    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", requestingUser.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { action, userId, role } = await req.json();

    // List all users with their roles
    if (action === "list") {
      console.log("Listing all users...");
      
      const { data: authUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (listError) {
        console.error("Error listing users:", listError);
        return new Response(
          JSON.stringify({ error: listError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get all roles
      const { data: roles, error: rolesError } = await supabaseAdmin
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
      }

      const rolesMap = new Map(roles?.map(r => [r.user_id, r.role]) || []);

      const users = authUsers.users.map(user => ({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        role: rolesMap.get(user.id) || "user",
      }));

      console.log(`Found ${users.length} users`);

      return new Response(
        JSON.stringify({ users }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update user role
    if (action === "updateRole") {
      if (!userId || !role) {
        return new Response(
          JSON.stringify({ error: "userId and role are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log(`Updating role for user ${userId} to ${role}`);

      // Delete existing role
      await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", userId);

      // Insert new role
      const { error: insertError } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: userId, role });

      if (insertError) {
        console.error("Error updating role:", insertError);
        return new Response(
          JSON.stringify({ error: insertError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Role updated successfully" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Delete user
    if (action === "delete") {
      if (!userId) {
        return new Response(
          JSON.stringify({ error: "userId is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Prevent self-deletion
      if (userId === requestingUser.id) {
        return new Response(
          JSON.stringify({ error: "Cannot delete your own account" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log(`Deleting user ${userId}`);

      // Delete from user_roles first
      await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", userId);

      // Delete user from auth
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

      if (deleteError) {
        console.error("Error deleting user:", deleteError);
        return new Response(
          JSON.stringify({ error: deleteError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "User deleted successfully" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
