
-- Remove overly permissive INSERT and DELETE policies on star-art bucket
DROP POLICY IF EXISTS "Allow public uploads to star-art" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes from star-art" ON storage.objects;

-- Only allow service_role (used by edge function) to insert
CREATE POLICY "Service role can insert star art"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'star-art' AND auth.role() = 'service_role');

-- Only allow service_role to delete (cleanup function uses service_role)
CREATE POLICY "Service role can delete star art"
ON storage.objects FOR DELETE
USING (bucket_id = 'star-art' AND auth.role() = 'service_role');
