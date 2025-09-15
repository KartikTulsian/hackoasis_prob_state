"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function UploadProblemsButton() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setLoading(true);
      toast.info("Starting problem statements upload...");

      // Load the JSON file from public folder
      const response = await fetch("/problem_stats.json");
      if (!response.ok) {
        throw new Error("Failed to fetch JSON file. Make sure hosa_problems.json exists in public folder.");
      }

      const problems = await response.json();
      console.log("Loaded problems:", problems.length);

      let successCount = 0;
      let errorCount = 0;

      for (const problem of problems) {
        if (!problem.id || !problem.id.trim()) {
          console.log("Skipping problem without id:", problem);
          continue;
        }

        try {
          // Use problem.id as Firestore document ID
          const ref = doc(collection(db, "problem_statements"), problem.id.trim());
          await setDoc(ref, {
            id: problem.id.trim(),
            title: problem.title || "",
            challenge: problem.challenge || "",
            yourMission: problem.yourMission || "",
            yourSolution: problem.yourSolution || [],
            bonus: problem.bonus || [],
            domain: problem.domain || "",
            sdgs: problem.sdgs || [],
            maxTeams: problem.maxTeams || 1,
            takenBy: problem.takenBy || []
          });

          successCount++;
          console.log(`Added problem: ${problem.id}`);
        } catch (docError) {
          console.error(`Error adding problem ${problem.id}:`, docError);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully uploaded ${successCount} problem statements!`);
      }

      if (errorCount > 0) {
        toast.warning(`${errorCount} problems failed to upload. Check console for details.`);
      }

      console.log(`Upload complete: ${successCount} successful, ${errorCount} failed`);

    } catch (err: unknown) {
      console.error("Upload error:", err);
      if (err instanceof Error) {
        toast.error("Error uploading problems: " + err.message);
      } else {
        toast.error("Error uploading problems: Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpload}
      disabled={loading}
      className="fixed bottom-6 right-24 w-16 h-16 flex items-center justify-center 
                 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 
                 text-white text-2xl font-bold shadow-lg hover:scale-110 
                 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                 z-50"
      title={loading ? "Uploading problems..." : "Upload problems from JSON"}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
      ) : (
        "📝"
      )}
    </button>
  );
}
