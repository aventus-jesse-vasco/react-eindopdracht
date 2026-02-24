import { AddSpotForm } from "./AddSpotForm";

export const runtime = "nodejs";

export default function AddSpotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Spot toevoegen</h1>
        <p className="mt-2 text-sm text-white/75">
          Vul de gegevens in. TikTok of Google Maps is verplicht (één van beide).
        </p>
      </div>

      <AddSpotForm />
    </div>
  );
}

