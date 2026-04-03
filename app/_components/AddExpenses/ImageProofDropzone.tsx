import { Camera, UploadCloud } from "lucide-react";

export default function ImageProofDropzone() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-slate-700">Add Image Proof (Optional)</h2>

      <label className="group flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/25 px-5 py-6 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50/40">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-dash-primary shadow-sm">
          <UploadCloud size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Click to upload or drag image</p>
          <p className="mt-1 text-xs text-slate-400">PNG, JPG or PDF (up to 5MB)</p>
        </div>
        <input type="file" accept="image/png,image/jpeg,application/pdf" className="sr-only" />
      </label>

    </div>
  );
}
