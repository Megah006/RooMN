import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { supabaseServer } from "../../lib/supabaseServer";

// Define what a "new listing" must look like (what the frontend sends)
const CreateListingSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),

  campus: z.string().min(2),
  startDate: z.string().min(8),          // e.g. "2026-03-01"
  endDate: z.string().min(8).optional(), // optional

  roomType: z.string().min(2),
  rent: z.number().int().nonnegative(),

  contact: z.string().min(3),

  utilitiesIncluded: z.boolean().optional(),
  furnished: z.boolean().optional(),
  pets: z.boolean().optional(),
  images: z.array(z.string().url()).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET = read listings from Supabase
  if (req.method === "GET") {
    const { data, error } = await supabaseServer
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  // POST = create a new listing in Supabase
  if (req.method === "POST") {
    const parsed = CreateListingSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid body",
        details: parsed.error.flatten(),
      });
    }

    // Map frontend camelCase -> DB snake_case
    const payload = {
      title: parsed.data.title,
      description: parsed.data.description,

      campus: parsed.data.campus,
      start_date: parsed.data.startDate,
      end_date: parsed.data.endDate ?? null,

      room_type: parsed.data.roomType,
      rent: parsed.data.rent,

      contact: parsed.data.contact,

      utilities_included: parsed.data.utilitiesIncluded ?? false,
      furnished: parsed.data.furnished ?? false,
      pets: parsed.data.pets ?? false,
      images: parsed.data.images ?? [],
    };

    const { data, error } = await supabaseServer
      .from("listings")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
