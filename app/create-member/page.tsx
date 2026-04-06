"use client";

import { User, Home, Sparkles, Check } from "lucide-react";
import { use, useState, useEffect } from "react";
import createMember from "../_actions/createMember";
import getTakenAvatars from "../_actions/getTakenAvatars";
import { useRouter } from "next/navigation";


const avatars = [
  "avatar-1.png",
  "avatar-2.png",
  "avatar-3.png",
  "avatar-4.png",
  "avatar-5.png",
  "avatar-6.png",
  "avatar-7.png",
  "avatar-8.png", // Added one more for better grid
];

export default function Page({ searchParams }: { searchParams: Promise<{ houseId?: string }> }) {
  const params = use(searchParams);
  const houseId = params?.houseId as string | undefined;
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [takenAvatars, setTakenAvatars] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");


  const router = useRouter()
  const submitHandler = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const result = await createMember(formData);

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      const nextUrl = `/dashboard?houseId=${encodeURIComponent(result.houseId)}&memberId=${encodeURIComponent(result.memberId)}`;
      router.replace(nextUrl);
      router.refresh();
      window.location.assign(nextUrl);

    }
    catch (error) {
      console.error("Error creating member:", error);
      setErrorMessage("Unable to create profile right now");
    }
    finally {
      setIsSubmitting(false);
    }
  };

  // Auto-select first avatar on load
  useEffect(() => {
    if (!selectedAvatar && avatars.length > 0) {
      const firstAvailableAvatar = avatars.find(
        (avatar) => !takenAvatars.includes(`/assets/avatars/${avatar}`)
      );

      if (firstAvailableAvatar) {
        setSelectedAvatar(firstAvailableAvatar);
      }
    }
  }, [takenAvatars, selectedAvatar]);

  useEffect(() => {
    if (!houseId) {
      return;
    }

    const loadTakenAvatars = async () => {
      const response = await getTakenAvatars(houseId);
      if (response.success) {
        setTakenAvatars(response.data);
      }
    };

    loadTakenAvatars();
  }, [houseId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8 md:py-6">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply opacity-70 blur-xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply opacity-70 blur-xl" />
      </div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Home size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {houseId ? "Join House" : "Create Space"}
              </h1>
            </div>
            <Sparkles className="text-yellow-300" size={24} />
          </div>
          <p className="text-blue-100 text-sm md:text-base">
            {houseId 
              ? "You're about to join an existing house" 
              : "Create a new shared space with your friends"}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <form action={submitHandler} className="space-y-8">
            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Avatar Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Choose Your Avatar
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Pick one that represents you
                  </p>
                </div>
                <div className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Required
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4">
                {avatars.map((avatar) => {
                  const avatarPath = `/assets/avatars/${avatar}`;
                  const isSelected = selectedAvatar === avatar;
                  const isTaken = takenAvatars.includes(avatarPath);

                  return (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => {
                        if (!isTaken) {
                          setSelectedAvatar(avatar);
                        }
                      }}
                      disabled={isTaken}
                      className={`
                        relative group aspect-square rounded-2xl transition-all duration-300
                        ${isSelected 
                          ? "ring-4 ring-blue-500 ring-offset-2 transform scale-105" 
                          : isTaken
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:scale-105 hover:ring-2 hover:ring-blue-300"
                        }
                      `}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl" />
                      <img
                        src={avatarPath}
                        alt={`Avatar ${avatar}`}
                        className="relative w-full h-full rounded-2xl object-cover p-1"
                      />
                      
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                          <Check size={16} />
                        </div>
                      )}

                      {isTaken && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/45 text-white text-xs font-semibold">
                          Taken
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className={`
                        absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:opacity-100
                        transition-opacity duration-200
                      `} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hidden inputs */}
            {houseId && (
              <input type="hidden" name="houseId" value={houseId} />
            )}

            {selectedAvatar && (
              <input
                type="hidden"
                name="avatar"
                value={`/assets/avatars/${selectedAvatar}`}
              />
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Show only if houseId not present */}
              {!houseId && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Home size={18} className="text-blue-600" />
                    </div>
                    <label htmlFor="houseName" className="text-sm font-medium text-gray-700">
                      House Name
                    </label>
                  </div>
                  <input
                    id="houseName"
                    name="houseName"
                    required
                    placeholder="e.g., Sunshine Villa, Flat 4B"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                             text-gray-800 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Choose a friendly name for your shared space
                  </p>
                </div>
              )}

              {/* Name Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User size={18} className="text-blue-600" />
                  </div>
                  <label className="text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                </div>
                <input
                  name="name"
                  required
                  placeholder="e.g., Swastik Patel"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                           text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This is how others will see you in the house
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !selectedAvatar ||
                isSubmitting ||
                takenAvatars.includes(`/assets/avatars/${selectedAvatar}`)
              }
              className={`
                w-full py-4 px-6 rounded-xl font-semibold text-white
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                ${isSubmitting 
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-400' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                }
                shadow-lg hover:shadow-xl disabled:shadow-lg
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Joining...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Home size={20} />
                  {houseId ? "Join House" : "Create & Join Space"}
                </span>
              )}
            </button>
          </form>


        </div>

        {/* Decorative bottom border */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
      </div>

      {/* Mobile optimization note */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          👆 Tap on an avatar to select
        </div>
      </div>
    </div>
  );
}