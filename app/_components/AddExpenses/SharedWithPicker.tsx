"use client";

import { Check, Plus } from "lucide-react";
import { motion } from "framer-motion";

export type ExpenseMember = {
  id: string;
  name: string;
  tone: string;
};

type SharedWithPickerProps = {
  members: ExpenseMember[];
  selectedMembers: string[];
  allSelected: boolean;
  onToggleMember: (memberId: string) => void;
  onToggleSelectAll: () => void;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function SharedWithPicker({
  members,
  selectedMembers,
  allSelected,
  onToggleMember,
  onToggleSelectAll,
}: SharedWithPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">Shared With</h2>
        <button
          type="button"
          onClick={onToggleSelectAll}
          className="text-sm font-semibold text-dash-primary transition-opacity hover:opacity-85"
        >
          {allSelected ? "Clear" : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
        {members.map((member) => {
          const isSelected = selectedMembers.includes(member.id);
          return (
            <button
              key={member.id}
              type="button"
              onClick={() => onToggleMember(member.id)}
              className="group flex flex-col items-center gap-2"
            >
              <motion.span
                whileTap={{ scale: 0.95 }}
                className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full border text-sm font-semibold text-slate-700 transition-all ${
                  isSelected
                    ? "border-dash-primary ring-2 ring-indigo-100"
                    : "border-slate-200 group-hover:border-indigo-200"
                } ${member.tone}`}
              >
                {initials(member.name)}
                {isSelected && (
                  <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-dash-primary text-white">
                    <Check size={14} />
                  </span>
                )}
              </motion.span>
              <span className="text-sm text-slate-700">{member.name}</span>
            </button>
          );
        })}

      </div>
    </div>
  );
}
