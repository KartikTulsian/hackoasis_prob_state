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
import Timer from "@/components/timer";

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
  const [hasAlreadySubmitted, setHasAlreadySubmitted] = useState(false);
  const [submittedProblemId, setSubmittedProblemId] = useState<string | null>(null);
  
  // Add a flag for controlling activation
  const isActive = true;

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

  // Function to fetch problem statements
  const fetchProblemStatements = async (teamDomain: string, isRefresh = false) => {
    try {
      if (hasAlreadySubmitted && submittedProblemId && !isRefresh) {
        // If already submitted and not refreshing, fetch only the selected problem
        const selectedProblemDoc = await getDocs(
          query(collection(db, "problem_statements"), where("__name__", "==", submittedProblemId))
        );
        
        if (!selectedProblemDoc.empty) {
          const selectedProblem: Problem_Statements = {
            id: selectedProblemDoc.docs[0].id,
            ...(selectedProblemDoc.docs[0].data() as Omit<Problem_Statements, "id">),
          };
          setProblems([selectedProblem]);
        }
      } else {
        // Fetch all problems for the domain
        const pq = query(collection(db, "problem_statements"), where("domain", "==", teamDomain));
        const psnap = await getDocs(pq);
        const pList: Problem_Statements[] = psnap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Problem_Statements, "id">),
        }));
        setProblems(pList);
        
        if (isRefresh) {
          toast.success("Problem statements refreshed successfully!");
        }
      }
    } catch (error) {
      console.error("Error fetching problem statements:", error);
      if (isRefresh) {
        toast.error("Failed to refresh problem statements. Please try again.");
      }
    }
  };

  // Refresh function for problem statements
  const handleRefreshProblems = async () => {
    if (!domain) return;
    
    try {
      await fetchProblemStatements(domain, true);
    } catch (error) {
      console.error("Error refreshing problems:", error);
      toast.error("Failed to refresh problem statements.");
    }
  };

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
        // Team has already submitted, get their selected problem
        const submissionData = submissionSnap.docs[0].data();
        const selectedProblemId = submissionData.problemId;
        
        setDomain(teamDoc.domain);
        setHasAlreadySubmitted(true);
        setSubmittedProblemId(selectedProblemId);
        setSelectedId(selectedProblemId);
        
        // Fetch the selected problem statement
        await fetchProblemStatements(teamDoc.domain, false);
        toast.success("Showing your selected problem statement.");
        
        setLoading(false);
        return;
      }

      // Team hasn't submitted yet, show all problems for their domain
      setDomain(teamDoc.domain);
      setHasAlreadySubmitted(false);
      setSubmittedProblemId(null);
      setSelectedId(null);

      // Fetch all problems for the domain
      await fetchProblemStatements(teamDoc.domain, false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while verifying.");
    } finally {
      setLoading(false);
    }
  };

  const handleProblemSelect = (id: string) => {
    // Only allow selection if team hasn't already submitted
    if (!hasAlreadySubmitted) {
      setConfirmId(id);
    }
  };

  // Confirm selection
  const confirmSelection = async () => {
    if (!domain || !confirmId || hasAlreadySubmitted) return;
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
      setHasAlreadySubmitted(true);
      setSubmittedProblemId(confirmId);
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
          particleCount={1100}
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
        {/* <Timer launchDate="2025-09-20T05:50:59" /> */}
        {isActive && (
          <>
            <TeamForm loading={loading} onVerify={handleVerify} />

            {domain && problems.length > 0 && (
              <ProblemList
                domain={domain}
                problems={problems}
                selectedId={selectedId}
                loading={loading}
                onSelect={handleProblemSelect}
                hasAlreadySubmitted={hasAlreadySubmitted}
                submittedProblemId={submittedProblemId}
                onRefresh={handleRefreshProblems}
              />
            )}
          </>
        )}
      </div>

      <ConfirmModal 
        open={!!confirmId} 
        onCancel={() => setConfirmId(null)} 
        onConfirm={confirmSelection} 
      />
    </main>
  );
}