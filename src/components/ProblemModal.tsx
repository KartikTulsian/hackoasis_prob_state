"use client";
import React, { useState, useEffect } from "react";
import { Problem_Statements } from "@/types";

type Props = {
  problem: Problem_Statements;
  onSelect: (id: string) => void;
  onClose: () => void;
  loading?: boolean;
  hasAlreadySubmitted?: boolean;
  isSelectedProblem?: boolean;
};

export default function ProblemModal({
  problem,
  onSelect,
  onClose,
  loading = false,
  hasAlreadySubmitted = false,
  isSelectedProblem = false,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSelect = () => {
    onSelect(problem.id);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const filled = (problem.takenBy?.length || 0) >= (problem.maxTeams || 1);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 
                  transition-all duration-300 ease-in-out
                  ${isVisible ? "bg-black/60 backdrop-blur-md opacity-100" : "bg-transparent opacity-0"}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-4xl 
                   rounded-2xl backdrop-blur-xl overflow-y-auto hide-scrollbar
                   transition-all duration-500 ease-out transform
                   shadow-[0_0_60px_rgba(255,255,255,0.25),inset_0_0_25px_rgba(255,255,255,0.1)]
                   ${hasAlreadySubmitted && isSelectedProblem 
                     ? "border border-green-400/60 bg-gradient-to-br from-green-900/20 via-gray-800 to-black" 
                     : "border border-purple-300/40 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                   }
                   ${isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}`}
        style={{
          maxHeight: "90vh",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center
                     rounded-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600
                     text-black font-extrabold text-xl
                     hover:scale-110 transition-transform duration-200
                     shadow-[inset_0_0_8px_rgba(255,255,255,0.6),0_0_18px_rgba(255,255,255,0.4)]
                     z-10"
        >
          ✕
        </button>

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-8 space-y-8">
          {/* Header */}
          <div className="text-center pb-6 border-b border-purple-400/40">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold 
                         bg-clip-text text-transparent 
                         bg-gradient-to-r from-gray-100 via-purple-300 to-blue-300
                         drop-shadow-[0_0_30px_rgba(200,200,255,0.7)]"
            >
              {problem.id}: {problem.title}
            </h2>

            {/* Status Badge */}
            <div className="flex justify-center mt-4">
              {hasAlreadySubmitted && isSelectedProblem ? (
                <span
                  className="px-4 py-2 text-sm sm:text-lg font-semibold rounded-lg
                             bg-gradient-to-r from-green-400 via-emerald-500 to-green-400
                             text-white shadow-[0_0_18px_rgba(34,197,94,0.8)]"
                >
                  ✅ Your Selected Problem Statement
                </span>
              ) : filled ? (
                <span
                  className="px-4 py-2 text-sm sm:text-lg font-semibold rounded-lg
                             bg-gradient-to-r from-red-400 via-red-600 to-red-400
                             text-white shadow-[0_0_18px_rgba(239,68,68,0.8)]"
                >
                  Locked – Not Available
                </span>
              ) : (
                <span
                  className="px-4 py-2 text-sm sm:text-lg font-semibold rounded-lg
                             bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-400
                             text-white shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                >
                  {(problem.takenBy?.length || 0)}/{problem.maxTeams} Teams Selected
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 text-gray-200 text-base sm:text-lg">
            {problem.challenge && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/60 shadow-inner">
                <h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">Challenge</h3>
                <p>{problem.challenge}</p>
              </div>
            )}

            {problem.yourMission && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/60 shadow-inner">
                <h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">Your Mission</h3>
                <p>{problem.yourMission}</p>
              </div>
            )}

            {problem.yourSolution && problem.yourSolution?.length > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/60 shadow-inner">
                <h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">Your Solution Should</h3>
                <ul className="list-disc list-inside space-y-1 ml-3">
                  {problem.yourSolution.map((sol, idx) => (
                    <li key={idx} className="hover:text-purple-200 transition">
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {problem.bonus && problem.bonus?.length > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/60 shadow-inner">
                <h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">Bonus Points</h3>
                <ul className="list-disc list-inside space-y-1 ml-3">
                  {problem.bonus.map((bns, idx) => (
                    <li key={idx} className="hover:text-purple-200 transition">
                      {bns}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {problem.sdgs?.length > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/60 to-gray-900/60 shadow-inner">
                <h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">Relevant SDGs</h3>
                <ul className="list-disc list-inside space-y-1 ml-3">
                  {problem.sdgs.map((sdg, idx) => (
                    <li key={idx} className="hover:text-purple-200 transition">
                      {sdg}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 border-t border-purple-400/30">
            <button
              onClick={handleClose}
              className="px-6 py-3 rounded-lg font-semibold text-base sm:text-lg
                         bg-gradient-to-r from-gray-500 to-gray-700
                         text-white shadow-md hover:scale-105 transition"
            >
              {hasAlreadySubmitted ? "Close" : "Cancel"}
            </button>

            {/* Only show select button if not already submitted */}
            {!hasAlreadySubmitted && (
              <button
                disabled={loading || filled}
                onClick={handleSelect}
                className={`px-8 py-3 rounded-lg font-semibold text-base sm:text-lg transition-all
                            transform hover:scale-105 shadow-lg ${
                  filled || loading
                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                    : "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-[0_0_25px_rgba(147,51,234,0.6)] hover:shadow-[0_0_35px_rgba(147,51,234,0.8)]"
                }`}
              >
                {loading ? "Selecting..." : filled ? "Locked" : "Select This Problem"}
              </button>
            )}

            {/* Show confirmation message if already submitted */}
            {hasAlreadySubmitted && isSelectedProblem && (
              <div className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-800/60 to-emerald-900/60 border border-green-400/30">
                <p className="text-green-200 text-base sm:text-lg font-medium">
                  ✅ You have successfully selected this problem statement
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}