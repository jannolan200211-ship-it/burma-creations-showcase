-- Create profile table for bio data
CREATE TABLE public.profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  profile_picture TEXT,
  social_links TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing
CREATE POLICY "Profile is viewable by everyone" 
ON public.profile 
FOR SELECT 
USING (true);

-- Create trigger for updating timestamps
CREATE TRIGGER update_profile_updated_at
BEFORE UPDATE ON public.profile
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert example bio data
INSERT INTO public.profile (name, bio, profile_picture, social_links) 
VALUES (
  'Aung Kyaw',
  'I''m a no-code enthusiast from Yangon, passionate about empowering Myanmar youth through technology and building a vibrant no-code community.',
  'https://via.placeholder.com/150',
  ARRAY['https://github.com/jannolan200211-ship-it', 'https://linkedin.com/in/aungkyaw', 'https://x.com/aungkyaw']
);