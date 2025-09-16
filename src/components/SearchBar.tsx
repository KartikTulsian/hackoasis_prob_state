"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface Submission {
  teamName: string;
  leaderName: string;
  email: string;
  phone: string;
  domain: string;
  problemId: string;
  timestamp?: Timestamp; // Firestore timestamp
}

export default function SearchBar() {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!phone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const q = query(collection(db, "submissions"), where("phone", "==", phone));
      const snap = await getDocs(q);

      if (snap.empty) {
        toast.error("No submission found with this phone number");
        setLoading(false);
        return;
      }

      const doc = snap.docs[0].data() as Submission;
      setResult(doc);
      toast.success("Submission found!");
    } catch (err) {
      console.error(err);
      toast.error("Error searching submission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-4 bg-gray-900 rounded-xl shadow-lg">
      {/* Input field */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h2 className="text-lg font-bold text-white mb-2">Submission Details</h2>
          <p className="text-gray-300">
            <span className="font-semibold">Team Name:</span> {result.teamName}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Leader:</span> {result.leaderName}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Email:</span> {result.email}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Phone:</span> {result.phone}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Domain:</span> {result.domain}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Problem ID:</span>{" "}
            <span className="text-green-400 font-bold">{result.problemId}</span>
          </p>
        </div>
      )}
    </div>
  );
}
