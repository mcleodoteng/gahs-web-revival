-- Add CHECK constraints for form_submissions table
ALTER TABLE public.form_submissions 
  ADD CONSTRAINT form_submissions_last_name_length CHECK (length(last_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT form_submissions_other_names_length CHECK (length(other_names) BETWEEN 1 AND 100),
  ADD CONSTRAINT form_submissions_phone_length CHECK (length(phone) BETWEEN 5 AND 20),
  ADD CONSTRAINT form_submissions_email_format CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  ADD CONSTRAINT form_submissions_email_length CHECK (length(email) BETWEEN 3 AND 255);

-- Add CHECK constraints for form_submission_files table
ALTER TABLE public.form_submission_files
  ADD CONSTRAINT form_files_file_name_length CHECK (length(file_name) BETWEEN 1 AND 255),
  ADD CONSTRAINT form_files_file_url_length CHECK (length(file_url) BETWEEN 1 AND 2048),
  ADD CONSTRAINT form_files_description_length CHECK (description IS NULL OR length(description) <= 1000);

-- Add CHECK constraints for contact_messages table (defense in depth)
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_name_length CHECK (length(name) BETWEEN 2 AND 100),
  ADD CONSTRAINT contact_email_format CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  ADD CONSTRAINT contact_email_length CHECK (length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_phone_length CHECK (phone IS NULL OR length(phone) <= 20),
  ADD CONSTRAINT contact_subject_length CHECK (length(subject) BETWEEN 3 AND 200),
  ADD CONSTRAINT contact_message_length CHECK (length(message) BETWEEN 10 AND 5000);