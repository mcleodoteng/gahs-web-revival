-- Create form_submissions table for user form uploads
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  last_name TEXT NOT NULL,
  other_names TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create form_submission_files table for individual file uploads
CREATE TABLE public.form_submission_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES public.form_submissions(id) ON DELETE CASCADE,
  form_type TEXT NOT NULL, -- Bond, Study Leave, Appraisal/Promotional, Interview
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submission_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for form_submissions
-- Anyone can submit forms (public access for insert)
CREATE POLICY "Anyone can submit forms" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view all submissions
CREATE POLICY "Admins can view all form submissions" 
ON public.form_submissions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update submissions
CREATE POLICY "Admins can update form submissions" 
ON public.form_submissions 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete submissions
CREATE POLICY "Admins can delete form submissions" 
ON public.form_submissions 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for form_submission_files
-- Anyone can add files during form submission
CREATE POLICY "Anyone can add submission files" 
ON public.form_submission_files 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view files
CREATE POLICY "Admins can view submission files" 
ON public.form_submission_files 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete files
CREATE POLICY "Admins can delete submission files" 
ON public.form_submission_files 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for form submissions
INSERT INTO storage.buckets (id, name, public) 
VALUES ('form-submissions', 'form-submissions', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for form-submissions bucket
CREATE POLICY "Anyone can upload form files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'form-submissions');

CREATE POLICY "Anyone can view form files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'form-submissions');

CREATE POLICY "Admins can delete form files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'form-submissions' AND has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();