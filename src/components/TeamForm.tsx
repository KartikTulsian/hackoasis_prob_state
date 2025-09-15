"use client";
import React, { useState } from "react";

type Props = {
  loading: boolean;
  onVerify: (
    teamName: string,
    leaderName: string,
    phone: string,
    email: string
  ) => void;
};

export default function TeamForm({ loading, onVerify }: Props) {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!teamName || !leaderName || !phone || !email) return;
    onVerify(teamName, leaderName, phone, email);
  };

  return (
    <section className="mx-auto max-w-2xl mb-12 px-4 sm:px-6 lg:px-8">
      <div
        className="p-6 sm:p-8 md:p-10 rounded-2xl 
        bg-gradient-to-br from-gray-900 via-slate-900 to-black 
        border border-gray-400/40 
        shadow-[inset_0_0_20px_rgba(255,255,255,0.1),0_0_30px_rgba(168,85,247,0.4)]
        backdrop-blur-xl"
      >
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 text-center 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-gray-100 via-violet-400 to-blue-200
          [text-shadow:1px_1px_3px_rgba(255,255,255,0.3),-1px_-1px_3px_rgba(0,0,0,0.6)]
          drop-shadow-[0_0_18px_rgba(192,132,252,0.8)]"
        >
          Enter Team Details
        </h2>

        {/* Inputs */}
        <div className="grid gap-5 sm:gap-6">
          {[
            { value: teamName, set: setTeamName, placeholder: "Team Name" },
            { value: leaderName, set: setLeaderName, placeholder: "Leader Name" },
            { value: phone, set: setPhone, placeholder: "Leader Phone" },
            { value: email, set: setEmail, placeholder: "Leader Email" },
          ].map((field, i) => (
            <input
              key={i}
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.placeholder}
              className="p-3 sm:p-4 rounded-lg sm:rounded-xl 
              bg-gradient-to-r from-gray-800/80 via-slate-900/80 to-gray-950/80
              border border-gray-500/40
              shadow-[inset_0_0_10px_rgba(255,255,255,0.08)] 
              text-gray-200 
              placeholder-gray-400/70
              focus:ring-2 focus:ring-violet-400 focus:border-violet-400
              outline-none transition text-sm sm:text-base"
            />
          ))}

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 sm:mt-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold 
            text-base sm:text-lg tracking-wide
            bg-gradient-to-r from-gray-300/50 via-gray-700/60 to-black-300/50
            shadow-[0_0_20px_rgba(192,132,252,0.6)]
            hover:shadow-[0_0_35px_rgba(192,132,252,0.9)]
            hover:scale-105 transition-all duration-500
            text-white relative overflow-hidden
            disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {loading ? "Checking..." : "Show Domain & Problem Statements"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-lg sm:rounded-xl"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
