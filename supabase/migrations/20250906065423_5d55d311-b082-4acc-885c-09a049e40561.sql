-- Create blogs table for the no-code community
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing
CREATE POLICY "Blogs are viewable by everyone" 
ON public.blogs 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample blog posts for testing
INSERT INTO public.blogs (title, content, date, image_url) VALUES
(
  'Building Myanmar''s No-Code Revolution',
  'The no-code movement is transforming how Myanmar youth approach technology. With tools like Lovable.dev, anyone can build professional web applications without writing a single line of code. This democratization of technology is creating opportunities for creative minds who previously felt excluded from the tech industry. Join us as we explore the tools, techniques, and success stories from Myanmar''s growing no-code community.',
  '2024-01-15 10:00:00+00',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'
),
(
  'From Idea to App in 24 Hours',
  'Last weekend, we hosted Myanmar''s first no-code hackathon. Participants built amazing applications ranging from local business directories to educational platforms. The winning team created a platform connecting local artisans with global markets, all without writing code. This event proved that technical barriers should no longer hold back creative solutions to real-world problems.',
  '2024-01-10 14:30:00+00',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80'
),
(
  'The Power of Visual Programming',
  'Visual programming is changing how we think about software development. Instead of writing complex code, developers can now drag and drop components to build sophisticated applications. This approach is particularly powerful for Myanmar youth who are visual learners and creative thinkers. Learn how visual programming tools are making technology accessible to everyone.',
  '2024-01-05 09:15:00+00',
  'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80'
);