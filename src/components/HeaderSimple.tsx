import Image from "next/image";
import React from "react";

export default function HeaderSimple() {
    return (
        <header className="py-8 text-center">
            {/* Hackathon Logo */}
            <div className="flex justify-center">
                <div className="relative group">
                    <Image
                        src="/hackoasis_logo.png"
                        alt="Hackathon Logo"
                        width={208}
                        height={208}
                        className="h-44 md:h-52 w-auto logo-shadow rounded-3xl border-2 border-purple-500/40 
                             bg-gradient-to-br from-slate-800/90 via-gray-900/80 to-slate-950/90 
                             p-4 backdrop-blur-lg hover:scale-105 transition-all duration-700
                             shadow-2xl shadow-purple-900/50 group-hover:shadow-purple-700/70"
                        priority
                        unoptimized={true}
                    />
                    <div className="absolute inset-0 rounded-3xl border-2 border-purple-400/30 blur-sm 
                                group-hover:border-purple-300/50 transition-all duration-700"></div>
                    {/* Glowing effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-2500/20 to-pink-2500/20 
                                rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
            </div>

            {/* Title */}
            <h1
                className="mt-5 text-5xl md:text-7xl font-black tracking-tight 
                         bg-clip-text text-transparent bg-gradient-to-r 
                         from-purple-400 via-pink-400 to-purple-300
                         drop-shadow-[0_0_30px_rgba(167,139,250,0.9)]
                         hover:scale-105 transition-transform duration-500"
            >
                IEM HACKOASIS 2.0
            </h1>

            {/* Tagline */}
            <h2 className="mt-7 text-lg md:text-xl font-semibold uppercase tracking-widest 
                           text-gray-200">
                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-700/50 
                               to-pink-2500/40 border border-purple-400/30 
                               shadow-2xl shadow-purple-900/250 backdrop-blur-lg
                               hover:shadow-purple-700/80 hover:scale-105 transition-all duration-500">
                    ✨ Innovate · Collaborate · Create ✨
                </span>
            </h2>

        </header>
    );
}
