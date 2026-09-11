-- 1. Private schema not exposed to the API
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO anon, authenticated, service_role;

-- 2. Recreate products policies against private.has_role
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (active = true OR private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can insert products" ON public.products
  FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update products" ON public.products
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete products" ON public.products
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- 3. Storage policies: drop duplicate public read, recreate admin write policies
DROP POLICY IF EXISTS "Public can read product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete product images" ON storage.objects;

CREATE POLICY "Admins upload product images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins update product images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete product images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

-- 4. Remove the API-exposed SECURITY DEFINER function
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);