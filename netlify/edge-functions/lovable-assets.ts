// Images uploaded in Lovable are referenced as /__l5e/assets-v1/... and are only
// served by Lovable's hosting. Proxy those requests to the Lovable project host
// so the same URLs work on Netlify.
const LOVABLE_HOST = "https://id-preview--2f0f9ca9-b007-4f7d-9172-560957afb3d3.lovable.app";

export default async (req: Request) => {
  const { pathname, search } = new URL(req.url);
  const upstream = await fetch(`${LOVABLE_HOST}${pathname}${search}`, {
    method: req.method,
    headers: { accept: req.headers.get("accept") ?? "*/*" },
  });

  const headers = new Headers();
  for (const name of ["content-type", "content-length", "etag", "last-modified"]) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (upstream.ok) {
    headers.set("cache-control", "public, max-age=31536000, immutable");
  }

  return new Response(upstream.body, { status: upstream.status, headers });
};

export const config = {
  path: "/__l5e/assets-v1/*",
  method: "GET",
  cache: "manual",
};
