-- Storage Bucket Setup Migration: products
-- Migration: 20260726000002_storage_products_bucket.sql
-- Target: Supabase Storage / PostgreSQL

-- 1. Create the 'products' public storage bucket if it does not exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'products',
    'products',
    true,
    10485760, -- 10MB limit per image
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- 2. Storage RLS Policies for 'products' bucket
-- Public Read Access for anyone
DROP POLICY IF EXISTS "Public Read Access for Products Bucket" ON storage.objects;
CREATE POLICY "Public Read Access for Products Bucket"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'products');

-- Full Upload/Insert Access for authenticated & anon (pre-auth CMS phase)
DROP POLICY IF EXISTS "Allow Upload Access for Products Bucket" ON storage.objects;
CREATE POLICY "Allow Upload Access for Products Bucket"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'products');

-- Full Update Access
DROP POLICY IF EXISTS "Allow Update Access for Products Bucket" ON storage.objects;
CREATE POLICY "Allow Update Access for Products Bucket"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'products');

-- Full Delete Access
DROP POLICY IF EXISTS "Allow Delete Access for Products Bucket" ON storage.objects;
CREATE POLICY "Allow Delete Access for Products Bucket"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'products');
