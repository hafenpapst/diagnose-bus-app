"use client";

import { useEffect, useState } from "react";

type Props = {
  storageKey: string;
  title: string;
  image: string;
  onClose: () => void;
};

export function OscilloscopePopup({ storageKey, title, image, onClose }: Props) {
  const [value, setValue] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const savedValue = localStorage.getItem(`${storageKey}-value`);
    const savedRating = localStorage.getItem(`${storageKey}-rating`);

    if (savedValue) setValue(savedValue);
    if (savedRating) setRating(savedRating);
  }, [storageKey]);

  function saveValue(newValue: string) {
    setValue(newValue);
    localStorage.setItem(`${storageKey}-value`, newValue);
  }

  function saveRating(newRating: string) {
    setRating(newRating);
    localStorage.setItem(`${storageKey}-rating`, newRating);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
  <h3 className="text-lg font-bold text-red-300">
    {title}
  </h3>

  <button
    onClick={onClose}
    className="rounded-full px-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
  >
    ✕
  </button>
</div>

      <img
        src={image}
        alt="Oszilloskop"
        className="max-h-[520px] w-full rounded-2xl border border-zinc-700 object-contain shadow-xl"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => saveValue(e.target.value)}
        placeholder="Messwert ablesen ..."
        className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-500"
      />

      <textarea
        value={rating}
        onChange={(e) => saveRating(e.target.value)}
        placeholder="Bewertung des Signals ..."
        rows={3}
        className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}