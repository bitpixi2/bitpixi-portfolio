
-- Create a public storage bucket for temporary star art images
INSERT INTO storage.buckets (id, name, public) VALUES ('star-art', 'star-art', true);

-- Allow anyone to read star art images
CREATE POLICY "Star art images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'star-art');

-- Allow anonymous uploads (no auth required for this feature)
CREATE POLICY "Anyone can upload star art"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'star-art');

-- Allow deletion for cleanup
CREATE POLICY "Anyone can delete star art"
ON storage.objects FOR DELETE
USING (bucket_id = 'star-art');

-- Enable pg_cron and pg_net for scheduled cleanup
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
