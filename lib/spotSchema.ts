import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v && v.length > 0 ? v : undefined))
  .pipe(z.string().url().optional());

export const spotSchema = z
  .object({
    naam: z.string().trim().min(1, "Naam is verplicht"),
    soort_eten: z.string().trim().min(1, "Soort eten is verplicht"),
    locatie: z.string().trim().min(1, "Locatie is verplicht"),
    omschrijving: z.string().trim().min(1, "Omschrijving is verplicht"),
    afbeelding_url: z.string().trim().url("Afbeelding-URL moet een geldige URL zijn"),
    tiktok_url: optionalUrl,
    google_maps_url: optionalUrl
  })
  .superRefine((val, ctx) => {
    if (!val.tiktok_url && !val.google_maps_url) {
      ctx.addIssue({
        code: "custom",
        path: ["tiktok_url"],
        message: "Vul een TikTok-URL of Google Maps-URL in (één van beide verplicht)"
      });
      ctx.addIssue({
        code: "custom",
        path: ["google_maps_url"],
        message: "Vul een TikTok-URL of Google Maps-URL in (één van beide verplicht)"
      });
    }
  });

export type SpotFormValues = z.infer<typeof spotSchema>;

