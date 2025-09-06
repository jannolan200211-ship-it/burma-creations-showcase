export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  media_url?: string | null;
  technologies?: string[] | null;
  category?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}