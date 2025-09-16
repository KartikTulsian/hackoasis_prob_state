"use client";
import React, { useState, useEffect } from "react";
import TeamForm from "@/components/TeamForm";
import ProblemList from "@/components/ProblemList";
import ConfirmModal from "@/components/ConfirmModal";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  runTransaction,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { Problem_Statements, Team } from "@/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderFull from "@/components/HeaderFull";
import Particles from "@/components/Particles";
// import UploadTeamsButton from "@/components/UploadTeamsButton";
// import UploadProblemsButton from "@/components/UploadProblemsButton";

export default function Home() {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState<string | null>(null);
  const [problems, setProblems] = useState<Problem_Statements[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  // Smooth scroll to problem section
  useEffect(() => {
    if (domain && problems.length > 0) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        const element = document.getElementById("problem-statements-section");
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        }
      }, 100);
    }
  }, [domain, problems]);

  // Verify team
  const handleVerify = async (teamNameIn: string, leaderNameIn: string, phoneIn: string, emailIn: string) => {
    setLoading(true);
    setTeamName(teamNameIn.trim());
    setLeaderName(leaderNameIn.trim());
    setPhone(phoneIn.trim());
    setEmail(emailIn.trim());

    try {
      const q = query(
        collection(db, "teams"),
        where("phone", "==", phoneIn),
        where("email", "==", emailIn)
      );

      const snap = await getDocs(q);
      if (snap.empty) {
        toast.error("Team not found. Please check your details.");
        setLoading(false);
        return;
      }

      const teamDoc = snap.docs[0].data() as Team;

      // Check if already submitted
      const submissionQ = query(
        collection(db, "submissions"),
        where("phone", "==", phoneIn.trim()),
        where("email", "==", emailIn.trim())
      );
      const submissionSnap = await getDocs(submissionQ);
      if (!submissionSnap.empty) {
        toast.error("Your team has already selected a problem statement.");
        setLoading(false);
        setDomain(null);
        return;
      }

      setDomain(teamDoc.domain);

      // Fetch problems
      const pq = query(collection(db, "problem_statements"), where("domain", "==", teamDoc.domain));
      const psnap = await getDocs(pq);
      const pList: Problem_Statements[] = psnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Problem_Statements, "id">),
      }));
      setProblems(pList);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while verifying.");
    } finally {
      setLoading(false);
    }
  };

  const handleProblemSelect = (id: string) => {
    setConfirmId(id);
  };

  // Confirm selection
  const confirmSelection = async () => {
    if (!domain || !confirmId) return;
    setLoading(true);

    try {
      const problemRef = doc(db, "problem_statements", confirmId);
      const submissionRef = doc(db, "submissions", teamName.trim());

      await runTransaction(db, async (t) => {
        const pSnap = await t.get(problemRef);
        if (!pSnap.exists()) throw new Error("Problem not found.");

        const p = pSnap.data() as Problem_Statements;
        const taken = p.takenBy || [];
        const max = p.maxTeams || 1;

        if (taken.length >= max) throw new Error("This problem is already locked.");

        const sSnap = await t.get(submissionRef);
        if (sSnap.exists()) throw new Error("Your team already submitted a problem.");

        t.update(problemRef, { takenBy: arrayUnion(teamName) });
        t.set(submissionRef, {
          teamName,
          leaderName,
          phone,
          email,
          domain,
          problemId: confirmId,
          timestamp: serverTimestamp(),
        });
      });

      setProblems((prev) =>
        prev.map((p) => (p.id === confirmId ? { ...p, takenBy: [...(p.takenBy || []), teamName] } : p))
      );
      setSelectedId(confirmId);
      toast.success("Problem Statement locked successfully!");
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Error reserving problem.");
      }
    } finally {
      setLoading(false);
      setConfirmId(null);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-transparent">
      {/* Particles Background - Fixed positioning */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
        <Particles
          particleColors={["#a78bfa", "#7c3aed", "#c084fc"]}
          particleCount={1300}
          particleSpread={10}
          speed={0.10}
          particleBaseSize={140}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">
        <HeaderFull />
        <TeamForm loading={loading} onVerify={handleVerify} />

        {domain && problems.length > 0 && (
          <ProblemList
            domain={domain}
            problems={problems}
            selectedId={selectedId}
            loading={loading}
            // onSelect={(id) => setConfirmId(id)}
            onSelect={handleProblemSelect}
          />
        )}
      </div>

      {/* <UploadTeamsButton/> */}
      {/* <UploadProblemsButton /> */}

      <ConfirmModal open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={confirmSelection} />
    </main>
  );
}
