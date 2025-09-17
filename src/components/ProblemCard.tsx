"use client";
import React from "react";
import { Problem_Statements } from "@/types";

type Props = {
  problem_statements: Problem_Statements;
  disabled?: boolean;
  onClick: () => void;
  selected?: boolean;
  hasAlreadySubmitted?: boolean;
};

export default function ProblemCard({
  problem_statements,
  disabled = false,
  onClick,
  selected,
  hasAlreadySubmitted = false,
}: Props) {
  const filled =
    (problem_statements.takenBy?.length || 0) >=
    (problem_statements.maxTeams || 1);

  return (
    <div
      className={`relative rounded-2xl p-4 sm:p-6 backdrop-blur-xl 
              transition-all duration-700 ease-in-out transform
              hover:-translate-y-1 hover:scale-[1.02]
              shadow-[0_0_25px_rgba(192,192,192,0.3),inset_0_0_20px_rgba(255,255,255,0.1)]
              ${selected
          ? hasAlreadySubmitted 
            ? "border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
            : "border-2 border-purple-400 animate-pulse"
          : "border border-gray-400/40"
        }
              cursor-pointer
              ${hasAlreadySubmitted 
                ? "bg-gradient-to-br from-green-900/40 via-gray-800 to-gray-950" 
                : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950"
              }
              ${disabled ? "opacity-50" : ""}
              `}
      onClick={onClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none 
                  bg-gradient-to-br from-white/10 via-transparent to-white/5 
                  [mask-image:linear-gradient(to_bottom,white,transparent,white)]"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 sm:gap-6 relative z-10">
        {/* Checkbox */}
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={selected || false}
            readOnly
            className={`w-5 h-5 sm:w-6 sm:h-6 ${hasAlreadySubmitted ? "accent-green-600" : "accent-violet-700"}`}
          />
        </div>

        {/* Problem Content */}
        <div className="flex-1 space-y-2 sm:space-y-3">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-extrabold 
                   bg-clip-text text-transparent 
                   bg-gradient-to-r from-gray-100 via-gray-400 to-gray-200
                   drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]
                   break-words"
          >
            {problem_statements.id}: {problem_statements.title}
          </h3>

          {problem_statements.challenge && (
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              <span className="font-semibold text-purple-300">Challenge:</span>{" "}
              {problem_statements.challenge}
            </p>
          )}

          <div className="text-[10px] sm:text-xs text-purple-400 italic">
            {hasAlreadySubmitted ? (
              <span className="text-green-400">✓ This is your selected problem statement</span>
            ) : filled ? (
              <span>Reached maximum selection</span>
            ) : (
              <span>Click to view full details</span>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col items-end flex-shrink-0">
          {hasAlreadySubmitted ? (
            <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-lg
                           bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-white 
                           shadow-[0_0_12px_rgba(34,197,94,0.7)]">
              Selected ✓
            </span>
          ) : (
            <span
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-lg shadow-md ${
                filled
                  ? "bg-gradient-to-r from-red-400 via-red-600 to-red-400 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.7)]"
                  : "bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-300 text-white shadow-[0_0_7px_rgba(34,197,94,0.7)]"
              }`}
            >
              {filled
                ? "Locked"
                : `${problem_statements.takenBy?.length || 0}/${problem_statements.maxTeams} Available`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
