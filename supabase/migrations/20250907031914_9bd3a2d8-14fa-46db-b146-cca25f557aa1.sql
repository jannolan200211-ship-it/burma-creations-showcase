-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting submissions (anyone can submit)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing submissions (admin only - no one for now)
CREATE POLICY "Only authenticated users can view submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (false);

-- Add sample submissions for testing
INSERT INTO public.contact_submissions (name, email, message, submitted_at) VALUES
  ('Aung Kyaw', 'aung@example.com', 'I am excited to join the no-code community in Myanmar! Looking forward to learning and building amazing projects together.', '2025-01-05 10:30:00+00'),
  ('Su Mon', 'sumon@example.com', 'Great initiative! I would love to collaborate on some no-code projects. Let me know how I can contribute.', '2025-01-06 14:45:00+00'),
  ('Thura Win', 'thura@example.com', 'Your portfolio is inspiring! Can we connect to discuss potential partnerships for tech education in Myanmar?', '2025-01-07 09:15:00+00');