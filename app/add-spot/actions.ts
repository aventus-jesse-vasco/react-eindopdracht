"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { spotSchema, type SpotFormValues } from "../../lib/spotSchema";
import { createSpot } from "../../lib/spotsRepo";

export type AddSpotState = {
  ok: boolean;
  values?: Partial<Record<keyof SpotFormValues, string>>;
  fieldErrors?: Partial<Record<keyof SpotFormValues, string[]>>;
};

function getString(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

export async function addSpotAction(
  prevState: AddSpotState,
  formData: FormData
): Promise<AddSpotState> {
  const values = {
    naam: getString(formData, "naam"),
    soort_eten: getString(formData, "soort_eten"),
    locatie: getString(formData, "locatie"),
    omschrijving: getString(formData, "omschrijving"),
    afbeelding_url: getString(formData, "afbeelding_url"),
    tiktok_url: getString(formData, "tiktok_url"),
    google_maps_url: getString(formData, "google_maps_url")
  };

  const parsed = spotSchema.safeParse(values);
  if (!parsed.success) {
    return {
      ok: false,
      values,
      fieldErrors: parsed.error.flatten().fieldErrors as AddSpotState["fieldErrors"]
    };
  }

  createSpot({
    ...parsed.data,
    tiktok_url: parsed.data.tiktok_url ?? null,
    google_maps_url: parsed.data.google_maps_url ?? null
  });

  revalidatePath("/spots");
  redirect("/spots");
}

