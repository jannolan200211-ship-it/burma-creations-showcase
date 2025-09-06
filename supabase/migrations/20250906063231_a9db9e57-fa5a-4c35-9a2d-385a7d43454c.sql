-- Create projects table for the portfolio gallery
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  media_url TEXT,
  technologies TEXT[],
  category TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (for future authentication if needed)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (title, description, image_url, media_url, technologies, category, live_url, featured)
VALUES 
  ('AI-Powered Language Learning App', 
   'Revolutionary app helping Myanmar youth master English through AI-driven conversations and gamification.',
   'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   ARRAY['React Native', 'TypeScript', 'TensorFlow', 'Node.js'],
   'Mobile App',
   'https://example.com',
   true),
   
  ('E-Commerce Platform for Local Artisans',
   'Connecting traditional Myanmar craftspeople with global markets through a modern digital marketplace.',
   'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
   'https://player.vimeo.com/video/427873956',
   ARRAY['Next.js', 'PostgreSQL', 'Stripe API', 'Tailwind CSS'],
   'Web Platform',
   'https://example.com',
   true),
   
  ('Smart City Dashboard',
   'Real-time data visualization platform for Yangon traffic and public transportation optimization.',
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
   NULL,
   ARRAY['Vue.js', 'D3.js', 'Python', 'AWS'],
   'Data Visualization',
   'https://example.com',
   false),
   
  ('Digital Health Consultation Platform',
   'Telemedicine solution connecting rural communities with healthcare professionals across Myanmar.',
   'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   ARRAY['React', 'WebRTC', 'Firebase', 'Material-UI'],
   'Healthcare',
   'https://example.com',
   true),
   
  ('Blockchain Supply Chain Tracker',
   'Transparent tracking system for agricultural products from farm to table using blockchain technology.',
   'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop',
   NULL,
   ARRAY['Solidity', 'Web3.js', 'React', 'IPFS'],
   'Blockchain',
   'https://example.com',
   false),
   
  ('AR Tourism Experience',
   'Augmented reality app bringing Myanmar''s historical sites to life with interactive storytelling.',
   'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
   'https://player.vimeo.com/video/427873956',
   ARRAY['Unity', 'ARCore', 'C#', 'Blender'],
   'AR/VR',
   'https://example.com',
   true);