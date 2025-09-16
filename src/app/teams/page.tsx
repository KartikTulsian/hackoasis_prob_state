// app/teams/page.tsx
"use client";
import React from "react";
import TeamCreationForm from "@/components/TeamCreationForm";

export default function TeamsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <TeamCreationForm />
    </main>
  );
}
