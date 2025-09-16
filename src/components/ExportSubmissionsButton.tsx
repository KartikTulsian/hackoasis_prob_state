"use client";
import React from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

// Strong type for exported rows
export type SubmissionExport = {
  "Team Name": string;
  "Leader Name": string;
  Phone: string;
  Email: string;
  Domain: string;
  "Problem ID": string;
  "Submitted At": string;
};

export default function ExportSubmissionsButton() {
  const handleExport = async () => {
    try {
      const querySnap = await getDocs(collection(db, "submissions"));
      const submissions: SubmissionExport[] = [];

      querySnap.forEach((doc) => {
        const data = doc.data() as DocumentData;
        submissions.push({
          "Team Name": data.teamName || "",
          "Leader Name": data.leaderName || "",
          Phone: data.phone || "",
          Email: data.email || "",
          Domain: data.domain || "",
          "Problem ID": data.problemId || "",
          "Submitted At": data.timestamp?.toDate
            ? data.timestamp.toDate().toLocaleString()
            : "",
        });
      });

      if (submissions.length === 0) {
        toast.error("No submissions found!");
        return;
      }

      // Sort by Domain, then Team Name
      submissions.sort((a, b) => {
        if (a["Domain"] < b["Domain"]) return -1;
        if (a["Domain"] > b["Domain"]) return 1;
        return a["Team Name"].localeCompare(b["Team Name"]);
      });

      // Convert to worksheet with custom headers
      const worksheet = XLSX.utils.json_to_sheet(submissions, {
        header: [
          "Team Name",
          "Leader Name",
          "Phone",
          "Email",
          "Domain",
          "Problem ID",
          "Submitted At",
        ],
      });

      // Auto-adjust column widths
      const colWidths = Object.keys(submissions[0]).map((key) => ({
        wch: Math.max(
          key.length,
          ...submissions.map((row) =>
            String(row[key as keyof SubmissionExport]).length
          )
        ),
      }));
      worksheet["!cols"] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

      // Export as Excel file
      XLSX.writeFile(workbook, "Submissions_Data.xlsx");
      toast.success("Submissions exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error exporting Submissions data");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Export Submissions Data
    </button>
  );
}
