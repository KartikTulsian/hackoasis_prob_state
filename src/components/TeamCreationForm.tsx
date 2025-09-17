"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { Team } from "@/types"; // adjust path if needed

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
  "Robotics & Drones"
];

export default function TeamCreationForm() {
  const [formData, setFormData] = useState<Team>({
    teamName: "",
    leaderName: "",
    phone: "",
    email: "",
    domain: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.teamName || !formData.leaderName || !formData.email || !formData.domain) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "teams"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      toast.success("Team created successfully!");
      setFormData({
        teamName: "",
        leaderName: "",
        phone: "",
        email: "",
        domain: ""
      });
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900/60 p-6 rounded-xl shadow-md backdrop-blur-md my-10">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Create New Team</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          value={formData.teamName}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          required
        />

        <input
          type="text"
          name="leaderName"
          placeholder="Leader Name"
          value={formData.leaderName}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          required
        />

        <select
          name="domain"
          value={formData.domain}
          onChange={handleChange}
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
          {loading ? "Creating..." : "Create Team"}
        </button>
      </form>
    </div>
  );
}
