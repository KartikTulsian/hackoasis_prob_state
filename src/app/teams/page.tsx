// app/teams/page.tsx
"use client";
import React from "react";
import TeamCreationForm from "@/components/TeamCreationForm";
import ExportTeamsButton from "@/components/ExportTeamsButton";
import ExportSubmissionsButton from "@/components/ExportSubmissionsButton";
import SearchBar from "@/components/SearchBar";
import TeamUpdateForm from "@/components/TeamUpdateForm";

export default function TeamsPage() {
  return (
    <main className="min-h-screen flex flex-col gap-8 items-center justify-center">
      <TeamCreationForm />

      <SearchBar/>
      
      <TeamUpdateForm/>
      <ExportTeamsButton/>
      <ExportSubmissionsButton/>
    </main>
  );
}
