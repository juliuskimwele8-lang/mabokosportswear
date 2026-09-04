import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "product-images";

/** Extract the storage object path from a Supabase public/authenticated URL. */
function storagePath(url: string): string | null {
  const marker = `/${BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return null;
  if (!url.includes("/storage/v1/object/")) return null;
  return decodeURIComponent(url.slice(i + marker.length).split("?")[0]);
}

/**
 * Renders a product photo. Photos live in a private storage bucket, so URLs
 * pointing at it are exchanged for a short-lived signed URL before display.
 */
export function ProductImage({
  url,
  alt,
  className,
}: {
  url: string | null;
  alt: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(url && !storagePath(url) ? url : null);

  useEffect(() => {
    let cancelled = false;
    if (!url) {
      setSrc(null);
      return;
    }
    const path = storagePath(url);
    if (!path) {
      setSrc(url);
      return;
    }
    setSrc(null);
    supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, 60 * 60)
      .then(({ data }) => {
        if (!cancelled && data?.signedUrl) setSrc(data.signedUrl);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!src) {
    return <div className={className} aria-hidden />;
  }

  return <img src={src} alt={alt} loading="lazy" className={className} />;
}
