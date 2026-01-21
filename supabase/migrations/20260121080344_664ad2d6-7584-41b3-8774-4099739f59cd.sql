-- Add status column to form_submissions table
ALTER TABLE public.form_submissions 
ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' 
CHECK (status IN ('pending', 'completed'));