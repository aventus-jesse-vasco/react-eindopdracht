"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addSpotAction, type AddSpotState } from "./actions";

const initialState: AddSpotState = { ok: true };

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p className="mt-2 text-xs font-medium text-red-200">{errors[0]}</p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 hover:bg-white/90"
    >
      {pending ? "Opslaan..." : "Spot opslaan"}
    </button>
  );
}

export function AddSpotForm() {
  const [state, formAction] = useActionState(addSpotAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <label className="text-sm font-semibold">Naam</label>
          <input
            name="naam"
            defaultValue={state.values?.naam ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-black/40"
            placeholder="bijv. Midnight Tacos"
          />
          <FieldError errors={state.fieldErrors?.naam} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <label className="text-sm font-semibold">Soort eten</label>
          <input
            name="soort_eten"
            defaultValue={state.values?.soort_eten ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-black/40"
            placeholder="bijv. burgers, sushi, vegan..."
          />
          <FieldError errors={state.fieldErrors?.soort_eten} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <label className="text-sm font-semibold">Locatie</label>
          <input
            name="locatie"
            defaultValue={state.values?.locatie ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-black/40"
            placeholder="bijv. Rotterdam Centrum"
          />
          <FieldError errors={state.fieldErrors?.locatie} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <label className="text-sm font-semibold">Afbeelding-URL</label>
          <input
            name="afbeelding_url"
            defaultValue={state.values?.afbeelding_url ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-black/40"
            placeholder="https://..."
          />
          <FieldError errors={state.fieldErrors?.afbeelding_url} />
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
        <label className="text-sm font-semibold">Omschrijving</label>
        <textarea
          name="omschrijving"
          defaultValue={state.values?.omschrijving ?? ""}
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-black/40"
          placeholder="Korte toelichting..."
        />
        <FieldError errors={state.fieldErrors?.omschrijving} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <label className="text-sm font-semibold">TikTok-URL (optioneel)</label>
          <input
            name="tiktok_url"
            defaultValue={state.values?.tiktok_url ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-black/40"
            placeholder="https://www.tiktok.com/@.../video/..."
          />
          <FieldError errors={state.fieldErrors?.tiktok_url} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
          <label className="text-sm font-semibold">
            Google Maps-URL (optioneel)
          </label>
          <input
            name="google_maps_url"
            defaultValue={state.values?.google_maps_url ?? ""}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-black/40"
            placeholder="https://maps.google.com/..."
          />
          <FieldError errors={state.fieldErrors?.google_maps_url} />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70">
          Tip: vul minimaal één van TikTok of Google Maps in.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}

