"use client";
import React from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

// Extend Team type for export with createdAt as string
export type TeamExport = {
  "Team Name": string;
  "Leader Name": string;
  Phone: string;
  Email: string;
  Domain: string;
  "Created At": string;
};

export default function ExportTeamsButton() {
  const handleExport = async () => {
    try {
      const querySnap = await getDocs(collection(db, "teams"));
      const teams: TeamExport[] = [];

      querySnap.forEach((doc) => {
        const data = doc.data() as DocumentData;
        teams.push({
          "Team Name": data.teamName || "",
          "Leader Name": data.leaderName || "",
          Phone: data.phone || "",
          Email: data.email || "",
          Domain: data.domain || "",
          "Created At": data.createdAt?.toDate
            ? data.createdAt.toDate().toLocaleString()
            : "",
        });
      });

      if (teams.length === 0) {
        toast.error("No team data found!");
        return;
      }

      // Sort by Domain, then Team Name
      teams.sort((a, b) => {
        if (a["Domain"] < b["Domain"]) return -1;
        if (a["Domain"] > b["Domain"]) return 1;
        return a["Team Name"].localeCompare(b["Team Name"]);
      });

      // Convert to worksheet with custom headers
      const worksheet = XLSX.utils.json_to_sheet(teams, {
        header: ["Team Name", "Leader Name", "Phone", "Email", "Domain", "Created At"],
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

      // Auto column widths (nice-to-have)
      const colWidths = Object.keys(teams[0]).map((key) => ({
        wch: Math.max(
          key.length,
          ...teams.map((team) => String(team[key as keyof TeamExport]).length)
        ),
      }));
      worksheet["!cols"] = colWidths;

      // Export as Excel file
      XLSX.writeFile(workbook, "Teams_Data.xlsx");
      toast.success("Teams exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error exporting Teams data");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
    >
      Export Teams Data
    </button>
  );
}
