"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function UploadTeamsButton() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setLoading(true);
      toast.info("Starting team upload...");

      // Load the JSON file from public folder
      const response = await fetch("/teams_book_updated.json");
      if (!response.ok) {
        throw new Error("Failed to fetch JSON file. Make sure teams_book.json exists in public folder.");
      }

      const teams = await response.json();
      console.log("Loaded teams:", teams.length);

      let successCount = 0;
      let errorCount = 0;

      for (const team of teams) {
        // Skip teams without required data
        if (!team.teamName || !team.teamName.trim()) {
          console.log("Skipping team without name:", team);
          continue;
        }

        try {
          // Create team document with proper field mapping
          await addDoc(collection(db, "teams"), {
            teamName: team.teamName.trim(),
            leaderName: team.leaderName?.trim() || "",
            phone: team.phone?.trim() || "",
            email: team.email?.trim() || "",
            domain: team.domain?.trim() || "",
            noOfParticipants: team.noOfParticipants?.trim() || "",
            // Add timestamp for tracking
            createdAt: new Date()
          });

          successCount++;
          console.log(`Added team: ${team.teamName}`);
        } catch (docError) {
          console.error(`Error adding team ${team.teamName}:`, docError);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully uploaded ${successCount} teams!`);
      }

      if (errorCount > 0) {
        toast.warning(`${errorCount} teams failed to upload. Check console for details.`);
      }

      console.log(`Upload complete: ${successCount} successful, ${errorCount} failed`);

    } catch (err: unknown) {
      console.error("Upload error:", err);
      if (err instanceof Error) {
        toast.error("Error uploading teams: " + err.message);
      } else {
        toast.error("Error uploading teams: Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpload}
      disabled={loading}
      className="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center 
                 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 
                 text-white text-2xl font-bold shadow-lg hover:scale-110 
                 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                 z-50"
      title={loading ? "Uploading teams..." : "Upload teams from JSON"}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
      ) : (
        "📤"
      )}
    </button>
  );
}