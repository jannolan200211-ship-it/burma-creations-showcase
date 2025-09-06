export interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}