"use client";
import React, { useState } from "react";
import { Problem_Statements } from "@/types";
import ProblemCard from "./ProblemCard";
import ProblemModal from "./ProblemModal";

type Props = {
  domain: string;
  problems: Problem_Statements[];
  selectedId: string | null;
  loading: boolean;
  onSelect: (id: string) => void;
  hasAlreadySubmitted?: boolean;
  submittedProblemId?: string | null;
};

const ITEMS_PER_PAGE = 7;

export default function ProblemList({
  domain,
  problems,
  selectedId,
  loading,
  onSelect,
  hasAlreadySubmitted = false,
  submittedProblemId = null,
}: Props) {
  const [page, setPage] = useState(1);
  const [modalProblem, setModalProblem] =
    useState<Problem_Statements | null>(null);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProblems = problems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(problems.length / ITEMS_PER_PAGE);

  const handleCardClick = (problem: Problem_Statements) => {
    // Always allow viewing the modal, regardless of submission status
    setModalProblem(problem);
  };

  const handleModalSelect = (id: string) => {
    setModalProblem(null);
    onSelect(id);
  };

  const closeModal = () => {
    setModalProblem(null);
  };

  return (
    <section
      id="problem-statements-section"
      className="mt-10 sm:mt-16 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10"
    >
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-16 relative">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md rounded-3xl border border-gray-300/30 shadow-[0_0_35px_rgba(255,255,255,0.15)]"></div>

        <div className="relative z-10 py-6 sm:py-10 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text 
                         bg-gradient-to-r from-gray-100 via-purple-300 to-blue-500 
                         drop-shadow-[0_0_25px_rgba(200,200,255,0.7)]">
            {hasAlreadySubmitted ? "Your Selected Problem Statement" : "Problem Statements"}
          </h2>

          {/* Show submission status if already submitted */}
          {hasAlreadySubmitted && (
            <div className="mt-6 mx-auto max-w-2xl">
              <div className="p-4 rounded-xl bg-gradient-to-r from-green-800/60 to-emerald-900/60 border border-green-400/30">
                <p className="text-green-200 text-lg font-medium">
                  ✅ Your team has successfully selected this problem statement. You can view the details below.
                </p>
              </div>
            </div>
          )}

          {/* Only show judging criteria if not already submitted */}
          {!hasAlreadySubmitted && (
            <div className="mt-8 sm:mt-12 relative">
              <div className="absolute inset-0 backdrop-blur-md rounded-2xl border border-purple-400/30 shadow-[0_0_25px_rgba(192,132,252,0.4)]"></div>

              <div className="relative z-10 py-6 sm:py-8 px-4 sm:px-8 rounded-2xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text 
                               bg-gradient-to-r from-gray-200 via-purple-300 to-gray-600 
                               drop-shadow-[0_0_20px_rgba(200,150,255,0.6)] mb-6 sm:mb-8">
                  Judging Criteria
                </h3>

                <ul className="space-y-4 sm:space-y-5 text-gray-200 text-base sm:text-lg md:text-xl text-left max-w-3xl mx-auto">
                  {[
                    {
                      label: "Innovation",
                      desc: "The originality and creativity of the solution.",
                      color: "from-pink-400 to-purple-500",
                    },
                    {
                      label: "Functionality",
                      desc: "The effectiveness and usability of the solution.",
                      color: "from-purple-400 to-blue-500",
                    },
                    {
                      label: "Technical Implementation",
                      desc: "The quality of the code and use of appropriate technologies.",
                      color: "from-blue-400 to-cyan-500",
                    },
                    {
                      label: "Personalization",
                      desc: "The degree to which the solution delivers personalized experiences.",
                      color: "from-rose-400 to-pink-500",
                    },
                    {
                      label: "Business Impact",
                      desc: "The potential of the solution to drive positive business outcomes.",
                      color: "from-green-400 to-emerald-500",
                    },
                  ].map((c, i) => (
                    <li key={i} className="flex items-start gap-3 sm:gap-4">
                      <span
                        className={`mt-1 sm:mt-2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-r ${c.color} shadow-[0_0_12px_rgba(236,72,153,0.8)]`}
                      ></span>
                      <span>
                        <span className="font-semibold text-purple-200">
                          {c.label}:
                        </span>{" "}
                        {c.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Domain */}
          <p className="mt-8 sm:mt-10 text-lg sm:text-2xl md:text-3xl text-gray-300">
            Domain:{" "}
            <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-purple-300 to-blue-300">
              {domain}
            </span>
          </p>

          <div className="mt-4 sm:mt-6 w-28 sm:w-40 h-[4px] sm:h-[5px] mx-auto bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 rounded-full shadow-[0_0_18px_rgba(168,85,247,0.8)]"></div>
        </div>
      </div>

      {/* Problem Cards */}
      <div className="grid gap-6 sm:gap-10 grid-cols-1 pb-12 sm:pb-16">
        {currentProblems.map((p, idx) => (
          <div
            key={p.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            <ProblemCard
              problem_statements={p}
              disabled={loading}
              selected={selectedId === p.id}
              onClick={() => handleCardClick(p)}
              hasAlreadySubmitted={hasAlreadySubmitted}
            />
          </div>
        ))}
      </div>

      {/* Pagination - Only show if more than one page and not already submitted */}
      {totalPages > 1 && !hasAlreadySubmitted && (
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 mt-6 pb-6 text-white">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 via-gray-400 to-blue-200 text-sm sm:text-base text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition"
          >
            Prev
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  page === i + 1
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 via-gray-400 to-blue-200 text-sm sm:text-base text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Problem Modal */}
      {modalProblem && (
        <ProblemModal
          problem={modalProblem}
          onSelect={handleModalSelect}
          onClose={closeModal}
          loading={loading}
          hasAlreadySubmitted={hasAlreadySubmitted}
          isSelectedProblem={hasAlreadySubmitted && modalProblem.id === submittedProblemId}
        />
      )}
    </section>
  );
}