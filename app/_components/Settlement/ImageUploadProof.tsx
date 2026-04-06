"use client";

import { UploadCloud, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";

type ImageUploadProofProps = {
  file: File | null;
  previewUrl: string | null;
  onFileChange: (file: File | null, previewUrl: string | null) => void;
};

export default function ImageUploadProof({ file, previewUrl, onFileChange }: ImageUploadProofProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onFileChange(file, event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onFileChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">UPI Payment Proof</h2>
        <AnimatePresence>
          {previewUrl && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={handleRemove}
              className="text-xs font-bold text-red-500 hover:text-red-700"
            >
              Remove
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-4">
        {/* Upload Dropzone */}
        <label className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all p-6 ${previewUrl ? 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 min-h-35' : 'border-indigo-200 bg-indigo-50/30 hover:border-indigo-300 hover:bg-indigo-50/50 min-h-45'}`}>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-dash-primary ring-1 ring-slate-100 group-hover:scale-105 transition-transform duration-300">
            <UploadCloud size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-700">{previewUrl ? "Change receipt" : "Upload Proof"}</p>
            <p className="mt-1 text-xs font-medium text-slate-400">PNG, JPG or PDF {previewUrl ? "" : "(max 5MB)"}</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,application/pdf"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>

        {/* Preview Area */}
        <AnimatePresence mode="popLayout">
          {previewUrl && (
             <motion.div
               initial={{ opacity: 0, scale: 0.95, x: -10 }}
               animate={{ opacity: 1, scale: 1, x: 0 }}
               exit={{ opacity: 0, scale: 0.95, x: -10 }}
               className="relative overflow-hidden rounded-2xl bg-teal-50 border border-teal-100"
             >
               <div className="absolute inset-0 bg-teal-800/5 mix-blend-multiply pointer-events-none"></div>
               <img 
                 src={previewUrl} 
                 alt="Payment Proof" 
                 className="w-full h-36 md:h-full object-cover object-top opacity-90 transition-transform duration-500 hover:scale-105"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4 pt-10">
                 <div className="flex items-center justify-between">
                   <div className="truncate pr-4">
                     <p className="truncate text-sm font-bold text-white shadow-sm">{file?.name}</p>
                     <p className="text-[10px] font-medium text-slate-200">
                       {file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : ""} • Uploaded
                     </p>
                   </div>
                   <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dash-primary text-white shadow-sm">
                     <CheckCircle2 size={14} />
                   </div>
                 </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
