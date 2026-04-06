import { House, HousePlus, MoveRight } from "lucide-react";
import createHouse from "../_actions/createHouse";
import { redirect } from "next/navigation";

async function submitHandler(formData: FormData) {
  "use server";
  const resp = await createHouse(formData);

  if (resp?.success && resp?.houseId) {
    redirect(`/create-member?houseId=${resp.houseId}`);
  }

  const errorMessage = encodeURIComponent(resp?.message || "Unable to create house");
  redirect(`/create-house?error=${errorMessage}`);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen w-full flex-center bg-gradient-to-br from-bg-primary to-bg-secondary px-4">
      
      <div className="w-full max-w-md rounded-3xl p-8 shadow-2xl 
        bg-bg-secondary/80 backdrop-blur border border-white/10 space-y-7">

        {/* Icon */}
        <div className="h-16 w-16 rounded-2xl 
          bg-gradient-to-br from-bg-tertiary to-indigo-500 
          flex-center shadow-lg">
          <House className="text-white" size={30} />
        </div>

        {/* Headings */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Let’s set up your space
          </h1>
          <p className="text-text-secondary mt-1 leading-relaxed">
            Create your shared home and start tracking expenses effortlessly.
          </p>
        </div>

        {/* Form */}
        <form action={submitHandler} className="space-y-5">

          {params?.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {params.error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm text-text-secondary flex items-center gap-2">
              <HousePlus size={16} />
              House name
            </label>

            <input
              name="houseName"
              required
              placeholder="Flat 4B / Room 404"
              className="input w-full 
                focus:ring-2 focus:ring-bg-tertiary/40 
                transition"
            />
          </div>

          {/* CTA Button */}
          <button
            className="
              w-full rounded-xl py-3
              flex-center gap-2
              font-medium text-white
              bg-gradient-to-r from-indigo-500 to-bg-tertiary
              hover:opacity-90 hover:scale-[1.01]
              active:scale-95
              transition-all duration-200
              shadow-lg
            "
          >
            Create House
            <MoveRight size={18} />
          </button>
        </form>

        {/* Footer link */}
        <p className="text-sm text-text-secondary text-center">
          Already have a space?{" "}
          <a
            href="/create-member"
            className="text-bg-tertiary font-medium hover:underline"
          >
            Join existing house →
          </a>
        </p>
      </div>
    </div>
  );
}
