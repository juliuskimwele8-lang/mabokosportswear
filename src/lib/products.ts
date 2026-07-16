import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export const PRODUCT_CATEGORIES = [
  "Jerseys",
  "Boots",
  "Footballs",
  "Basketballs",
  "Volleyballs",
  "Rugby",
  "Apparel",
  "Accessories",
  "Custom",
] as const;

export const productsQueryOptions = (opts?: { adminView?: boolean }) =>
  queryOptions({
    queryKey: ["products", opts?.adminView ? "all" : "active"],
    queryFn: async (): Promise<Product[]> => {
      let query = supabase
        .from("products")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (!opts?.adminView) query = query.eq("active", true);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });
