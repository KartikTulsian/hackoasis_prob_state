"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const domains = [
  "GenAI",
  "Agentic AI",
  "Blockchain & Cybersecurity",
  "Cloud Computing",
  "Disaster Management",
  "Fitness & Sports",
  "IOT",
  "MedTech/BioTech/HealthTech",
  "Miscellaneous",
  "Smart Automation",
  "Smart Education",
  "Sustainable & Renewable Energy",
  "Travel & Tourism",
  "Robotics & Drones",
];

interface TeamData {
  id: string;
  teamName: string;
  leaderName: string;
  phone: string;
  domain: string;
}

export default function TeamUpdateForm() {
  const [phone, setPhone] = useState("");
  const [team, setTeam] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(false);

  // Step 1: Search team by phone
  const handleSearch = async () => {
    if (!phone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    setLoading(true);
    setTeam(null);

    try {
      const q = query(collection(db, "teams"), where("phone", "==", phone));
      const snap = await getDocs(q);

      if (snap.empty) {
        toast.error("No team found with this phone number");
        setLoading(false);
        return;
      }

      const docSnap = snap.docs[0];
      setTeam({
        id: docSnap.id,
        ...(docSnap.data() as Omit<TeamData, "id">),
      });

      toast.success("Team found!");
    } catch (err) {
      console.error(err);
      toast.error("Error searching team");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Update team fields
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    try {
      setLoading(true);
      const ref = doc(db, "teams", team.id);

      await updateDoc(ref, {
        teamName: team.teamName,
        leaderName: team.leaderName,
        domain: team.domain,
      });

      toast.success("Team updated successfully!");

      // ✅ Reset UI
      setTeam(null);
      setPhone("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900/60 p-6 rounded-xl shadow-md backdrop-blur-md my-10">
      <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">
        Update Team
      </h2>

      {/* Search by Phone */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Leader Phone Number"
          className="flex-1 p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Editable fields */}
      {team && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={team.teamName}
            onChange={(e) => setTeam({ ...team, teamName: e.target.value })}
            placeholder="Team Name"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
            required
          />

          <input
            type="text"
            value={team.leaderName}
            onChange={(e) => setTeam({ ...team, leaderName: e.target.value })}
            placeholder="Leader Name"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
            required
          />

          <select
            value={team.domain}
            onChange={(e) => setTeam({ ...team, domain: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
            required
          >
            <option value="">Select Domain</option>
            {domains.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Team"}
          </button>
        </form>
      )}
    </div>
  );
}
