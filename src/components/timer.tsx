"use client";
import React, { useEffect, useState } from "react";

interface TimeCount {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

const getTimeLeft = (expiry: string): TimeCount => {
    let days = "00",
        hours = "00",
        minutes = "00",
        seconds = "00";

    const difference = new Date(expiry).getTime() - new Date().getTime();
    if (difference <= 0) return { days, hours, minutes, seconds };

    const dys = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((difference / (1000 * 60)) % 60);
    const secs = Math.floor((difference / 1000) % 60);

    days = dys < 10 ? `0${dys}` : `${dys}`;
    hours = hrs < 10 ? `0${hrs}` : `${hrs}`;
    minutes = mins < 10 ? `0${mins}` : `${mins}`;
    seconds = secs < 10 ? `0${secs}` : `${secs}`;

    return { days, hours, minutes, seconds };
};

export default function Timer({ launchDate }: { launchDate: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeCount | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTimer = () => setTimeLeft(getTimeLeft(launchDate));
        updateTimer();

        const interval = setInterval(() => {
            const time = getTimeLeft(launchDate);
            setTimeLeft(time);
            if (
                time.days === "00" &&
                time.hours === "00" &&
                time.minutes === "00" &&
                time.seconds === "00"
            ) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [launchDate]);

    const timerUnit = (value: string, label: string) => (
        <div
            className="relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 
      rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
      shadow-[inset_0_0_25px_rgba(255,255,255,0.2),0_0_40px_rgba(168,85,247,0.4)]
      border border-gray-400/40 hover:scale-110 transition-transform duration-500 group overflow-hidden"
        >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-white/10 opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>

            {/* Outer Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-600 blur-xl opacity-20 group-hover:opacity-50 animate-pulse"></div>

            {/* Value */}
            <span
                className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold 
        text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100
        drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] tracking-wider"
            >
                {value}
            </span>

            {/* Label */}
            <small
                className="relative text-sm md:text-base font-semibold 
        text-gray-300 uppercase tracking-widest mt-1
        drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
            >
                {label}
            </small>
        </div>
    );

    const handleGoogleCalendarClick = () => {
        // Fixed date for 20th Sept 2025, 6AM–6PM
        const start = new Date("2025-09-20T06:00:00");
        const end = new Date("2025-09-20T18:00:00");

        const format = (d: Date) =>
            d.toISOString().replace(/[-:]/g, "").split(".")[0];

        const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Problem+Statements+Release&dates=${format(start)}/${format(end)}&details=Join+us+for+the+IEM+HackOasis+2.0+problem+statements+unveiling!`;

        window.open(gcalUrl, "_blank");
    };


    if (!mounted || !timeLeft) return null;

    return (
        <div className="flex flex-col items-center gap-14 w-full mb-10 px-4">

            {/* Announcement */}
            <div className="text-center space-y-4 max-w-3xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-gray-100 via-violet-400 to-blue-200
          drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]
          tracking-wide leading-snug">
                    🚀 Problem Statements <br />Will Be <br />Unlock Soon!
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium 
          text-gray-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
                    We will be <span className="font-bold text-gray-100">LIVE on 20th September 2025</span>
                </h2>
            </div>

            {/* Timer Grid */}
            <div
                className="flex flex-wrap justify-center gap-8 sm:gap-10 w-full max-w-6xl 
        bg-gradient-to-br from-slate-900 via-gray-800 to-slate-950 
        p-8 sm:p-10 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.5),inset_0_0_20px_rgba(255,255,255,0.2)]
        border border-gray-500/30 backdrop-blur-xl"
            >
                {timerUnit(timeLeft.days, "Days")}
                {timerUnit(timeLeft.hours, "Hours")}
                {timerUnit(timeLeft.minutes, "Minutes")}
                {timerUnit(timeLeft.seconds, "Seconds")}
            </div>

            {/* Add to Calendar Button */}
            <button
                onClick={handleGoogleCalendarClick}
                className="mt-6 rounded-xl px-8 py-4 text-lg 
        bg-gradient-to-r from-violet-500 via-blue-600 to-indigo-600 
        text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.7)] 
        hover:shadow-[0_0_35px_rgba(168,85,247,0.9)] hover:scale-105 
        transition-all duration-500 backdrop-blur-md border border-white/10"
            >
                📅 Add to My Google Calendar
            </button>
        </div>
    );
}
