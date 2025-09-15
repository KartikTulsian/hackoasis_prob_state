"use client";
import Image from "next/image";
import React from "react";
import LogoLoop from "./LogoLoop";

export default function HeaderFull() {
  return (
    <header className="py-10 md:py-14 text-center relative overflow-hidden bg-transparent">
      {/* Hackathon Logo */}
      <div className="flex justify-center">
        <div className="relative group">
          <Image
            src="/hackoasis_logo.png"
            alt="Hackathon Logo"
            width={208}
            height={208}
            className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto logo-shadow rounded-2xl border 
            border-purple-400/60 
            bg-gradient-to-br from-slate-900 via-gray-800 to-slate-950
            p-3 sm:p-4 backdrop-blur-lg hover:scale-105 transition-all duration-700
            shadow-[0_0_20px_rgba(168,85,247,0.6),inset_0_0_15px_rgba(255,255,255,0.15)] 
            group-hover:shadow-[0_0_30px_rgba(192,132,252,0.8),inset_0_0_25px_rgba(255,255,255,0.25)]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 rounded-2xl border border-purple-300/40 blur-sm"></div>
        </div>
      </div>

      {/* Title */}
      <h1
        className="mt-5 text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-gray-100 via-violet-400 to-blue-200
        drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]
        hover:scale-105 transition-transform duration-500
        [text-shadow:1px_1px_3px_rgba(255,255,255,0.3),-1px_-1px_3px_rgba(0,0,0,0.6)]"
      >
        IEM HACKOASIS 2.0
      </h1>

      {/* Tagline */}
      <h2 className="mt-6 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-widest">
        <span
          className="px-4 sm:px-6 py-2 rounded-full border border-gray-300/40 
          shadow-[0_0_12px_rgba(255,255,255,0.4)] backdrop-blur-lg
          bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 text-transparent bg-clip-text
          hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500"
        >
          ✨ Innovate · Collaborate · Create ✨
        </span>
      </h2>

      {/* Subtitle */}
      <h2
        className="mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold relative inline-block 
        bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200
        drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
      >
        Problem Statement Selection
        <span
          className="absolute left-0 -bottom-2 w-full h-[3px] sm:h-[4px] 
          bg-gradient-to-r from-gray-300 via-white to-gray-400 
          animate-pulse rounded-full shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        ></span>
      </h2>

      {/* Sponsors Section */}
      <div className="mt-8 sm:mt-10 space-y-6">
        <h3
          className="text-base sm:text-lg md:text-xl font-semibold 
          bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-200
          drop-shadow-[0_0_15px_rgba(200,200,200,0.7)]
          uppercase tracking-wider"
        >
          Proudly Sponsored By
        </h3>

        <div className="relative w-full overflow-x-auto pb-12 sm:pb-20 pt-2 sm:pt-3 scrollbar-hide">
          <div className="flex items-center gap-6 sm:gap-10 justify-center sm:justify-center px-4">
            {sponsors.map((sponsor, i) => (
              <div
                key={i}
                className="flex-shrink-0 group cursor-pointer w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-36"
              >
                <div
                  className="relative w-full h-full 
                  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  rounded-xl sm:rounded-2xl border border-gray-400/40 
                  shadow-[inset_0_0_12px_rgba(255,255,255,0.1),0_0_20px_rgba(192,132,252,0.4)]
                  hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.2),0_0_30px_rgba(192,132,252,0.7)]
                  hover:scale-110 transition-all duration-500 backdrop-blur-sm
                  flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    width={sponsor.width}
                    height={sponsor.height}
                    className="max-w-[70%] max-h-[70%] sm:max-w-[80%] sm:max-h-[80%] object-contain 
                    opacity-90 group-hover:opacity-100 transition duration-300
                    filter group-hover:brightness-110"
                    unoptimized
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-purple-300/10 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Collaborators */}
          <h3
            className="text-base sm:text-lg md:text-xl font-semibold mt-8 sm:mt-12 pt-2 pb-5 sm:py-4
            bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-200
            drop-shadow-[0_0_15px_rgba(200,200,200,0.6)] uppercase tracking-wider"
          >
            Collaborated By
          </h3>

          <LogoLoop
            logos={collaborators}
            speed={100}
            direction="left"
            logoHeight={32}
            gap={24}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
          />
        </div>
      </div>
    </header>
  );
}

const sponsors = [
  { src: "/SCONTO_LOGO_IIT_KGP.png", alt: "Sconto IIT KGP", width: 250, height: 250 },
  { src: "/glb.jpeg", alt: "GLBXTNT", width: 250, height: 250 }
];

const collaborators = [
  { src: "/AIZENERA.png", alt: "Aizenera", width: 250, height: 250 },
  { src: "/cloud_native.jpeg", alt: "Cloud Native", width: 250, height: 250 },
  { src: "/codasarus.png", alt: "Codasarus", width: 250, height: 250 },
  { src: "/Group_9.png", alt: "Group 9", width: 250, height: 250 },
  { src: "/innovatex.jpg", alt: "InnovateX", width: 250, height: 250 },
  { src: "/lastminuteengineering-logo.png", alt: "Last Minute Engineering", width: 250, height: 250 },
  { src: "/Logo-01.png", alt: "Logo 01", width: 250, height: 250 },
  { src: "/sourcify.jpeg", alt: "Sourcify", width: 250, height: 250 }
];
