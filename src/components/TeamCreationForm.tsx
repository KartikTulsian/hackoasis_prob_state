"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { Team, SpotTeam } from "@/types"; // adjust path if needed

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
  const [formData, setFormData] = useState<SpotTeam>({
    teamName: "",
    leaderName: "",
    phone: "",
    email: "",
    domain: "",
    noOfParticipants: "",
    institute: "",
    member1: "",
    member2: "",
    member3: "",
    member4: "",
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

      // Prepare data for teams collection (basic info only)
      const teamData: Team = {
        teamName: formData.teamName,
        leaderName: formData.leaderName,
        phone: formData.phone,
        email: formData.email,
        domain: formData.domain,
        noOfParticipants: formData.noOfParticipants,
      };

      // Prepare data for spotTeams collection (all details including members)
      const spotTeamData: SpotTeam = {
        ...formData,
        createdAt: serverTimestamp()
      };

      // Save to both collections
      await Promise.all([
        addDoc(collection(db, "teams"), {
          ...teamData,
          createdAt: serverTimestamp()
        }),
        addDoc(collection(db, "spotTeams"), spotTeamData)
      ]);

      toast.success("Team created successfully!");
      setFormData({
        teamName: "",
        leaderName: "",
        phone: "",
        email: "",
        domain: "",
        noOfParticipants: "",
        institute: "",
        member1: "",
        member2: "",
        member3: "",
        member4: "",
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
        {/* Required Fields */}
        <input
          type="text"
          name="teamName"
          placeholder="Team Name *"
          value={formData.teamName}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          required
        />

        <input
          type="text"
          name="leaderName"
          placeholder="Leader Name *"
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
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address *"
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
          <option value="">Select Domain *</option>
          {domains.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="noOfParticipants"
          placeholder="Number of Participants"
          value={formData.noOfParticipants}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
        />

        <input
          type="text"
          name="institute"
          placeholder="Institute Name *"
          value={formData.institute}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          required
        />

        {/* Team Members Section */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Team Members (Optional)</h3>
          
          <input
            type="text"
            name="member1"
            placeholder="Team Member 1"
            value={formData.member1}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          />

          <input
            type="text"
            name="member2"
            placeholder="Team Member 2"
            value={formData.member2}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          />

          <input
            type="text"
            name="member3"
            placeholder="Team Member 3"
            value={formData.member3}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          />

          <input
            type="text"
            name="member4"
            placeholder="Team Member 4"
            value={formData.member4}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-4 text-center">
        * Required fields
      </p>
    </div>
  );
}