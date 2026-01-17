-- Fix 1: Contact Messages - Drop existing policies (with trailing spaces) and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

CREATE POLICY "Admins can view contact messages"
ON public.contact_messages AS PERMISSIVE
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages AS PERMISSIVE
FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages AS PERMISSIVE
FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can submit contact messages"
ON public.contact_messages AS PERMISSIVE
FOR INSERT
WITH CHECK (true);

-- Fix 2: Form Submissions Storage - Make bucket private and restrict access
UPDATE storage.buckets 
SET public = false 
WHERE id = 'form-submissions';

-- Remove any existing public SELECT policy and add admin-only access
DROP POLICY IF EXISTS "Anyone can view form files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can view form files" ON storage.objects;

CREATE POLICY "Admins can view form submission files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'form-submissions' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Keep upload policy for public form submission
DROP POLICY IF EXISTS "Anyone can upload form files" ON storage.objects;

CREATE POLICY "Public can upload form submission files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'form-submissions');

-- Fix 3: User Roles - Drop existing policies and recreate as PERMISSIVE with proper OR logic
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

CREATE POLICY "Users can view own roles"
ON public.user_roles AS PERMISSIVE
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all user roles"
ON public.user_roles AS PERMISSIVE
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert user roles"
ON public.user_roles AS PERMISSIVE
FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update user roles"
ON public.user_roles AS PERMISSIVE
FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete user roles"
ON public.user_roles AS PERMISSIVE
FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));