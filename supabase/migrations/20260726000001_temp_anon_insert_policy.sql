-- Temporary RLS Policy Migration for CMS Foundation Phase (Pre-Authentication)
-- Migration: 20260726000001_temp_anon_insert_policy.sql
-- Target: Supabase / PostgreSQL
-- NOTE: This project is in pre-authentication foundation phase.
-- TEMPORARY: Granting full management access to 'anon' role for product operations.
-- Revert / replace with strict auth role policies when Supabase Auth is implemented.

-- 1. products table
DROP POLICY IF EXISTS "Allow read access for anon" ON public.products;
DROP POLICY IF EXISTS "Allow anon full access" ON public.products;
DROP POLICY IF EXISTS "Allow anon full access (TEMPORARY)" ON public.products;

CREATE POLICY "Allow anon full access (TEMPORARY)" ON public.products
    FOR ALL TO anon
    USING (true)
    WITH CHECK (true);

-- 2. product_images table
DROP POLICY IF EXISTS "Allow read access for anon" ON public.product_images;
DROP POLICY IF EXISTS "Allow anon full access" ON public.product_images;
DROP POLICY IF EXISTS "Allow anon full access (TEMPORARY)" ON public.product_images;

CREATE POLICY "Allow anon full access (TEMPORARY)" ON public.product_images
    FOR ALL TO anon
    USING (true)
    WITH CHECK (true);

-- 3. product_variants table
DROP POLICY IF EXISTS "Allow read access for anon" ON public.product_variants;
DROP POLICY IF EXISTS "Allow anon full access" ON public.product_variants;
DROP POLICY IF EXISTS "Allow anon full access (TEMPORARY)" ON public.product_variants;

CREATE POLICY "Allow anon full access (TEMPORARY)" ON public.product_variants
    FOR ALL TO anon
    USING (true)
    WITH CHECK (true);

-- 4. categories table
DROP POLICY IF EXISTS "Allow read access for anon" ON public.categories;
DROP POLICY IF EXISTS "Allow anon full access" ON public.categories;
DROP POLICY IF EXISTS "Allow anon full access (TEMPORARY)" ON public.categories;

CREATE POLICY "Allow anon full access (TEMPORARY)" ON public.categories
    FOR ALL TO anon
    USING (true)
    WITH CHECK (true);
