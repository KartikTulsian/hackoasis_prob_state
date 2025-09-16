// app/teams/page.tsx
"use client";
import React from "react";
import TeamCreationForm from "@/components/TeamCreationForm";
import ExportTeamsButton from "@/components/ExportTeamsButton";
import ExportSubmissionsButton from "@/components/ExportSubmissionsButton";
import SearchBar from "@/components/SearchBar";

export default function TeamsPage() {
  return (
    <main className="min-h-screen flex flex-col gap-8 items-center justify-center">
      <TeamCreationForm />

      <SearchBar/>
      
      <ExportTeamsButton/>
      <ExportSubmissionsButton/>
    </main>
  );
}
