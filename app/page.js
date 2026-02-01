import React from 'react';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import HomeReel from './components/HomeReel';
import HomeFeatured from './components/HomeFeatured';
import Footer from './components/Footer';
import ScrollNav from './components/ScrollNav';
import { LiquidEffectAnimation } from './components/ui/LiquidEffectAnimation';

export default function LusionHomepage() {
  return (
    <div className="min-h-screen bg-[#f0f1fa] font-['Helvetica_Neue',sans-serif] relative">
      {/* Liquid Fabric Effect - Site-wide background */}
      <LiquidEffectAnimation isFixed={true} />

      {/* Lusion Header Component */}
      <Header />

      {/* Page Container */}
      <div id="page-container" className="relative z-10">
        <div id="page-container-inner">
          {/* Home Page */}
          <div id="home" className="page">
            {/* Home Hero Section */}
            <HomeHero />

            {/* Home Reel Section */}
            <HomeReel />

            <HomeFeatured />

            {/* Footer and ScrollNav - Excluded from liquid effect */}
            <div className="relative bg-[#f0f1fa]" style={{ zIndex: 100 }}>
              {/* Footer Section */}
              <Footer />

              {/* Scroll Nav Section */}
              <ScrollNav />
            </div>
          </div>
        </div>
      </div>

      {/* Old Hero Section - Will be replaced */}
      {/* <div className="px-16 pt-40 pb-12">
        <section>
          
          <div className="relative w-full aspect-[2.35/1] rounded-[28px] overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-black shadow-2xl">
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>

            
            <svg
              viewBox="0 0 1400 600"
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
              }}
            >
              
              <g opacity="0.95">
                
                <ellipse cx="320" cy="180" rx="35" ry="50" fill="#e8e8e8" transform="rotate(-25 320 180)" />
                <rect x="285" y="180" width="70" height="90" fill="#f0f0f0" rx="4" transform="rotate(-25 320 180)" />
                <ellipse cx="320" cy="270" rx="35" ry="50" fill="#d8d8d8" transform="rotate(-25 320 180)" />


                <ellipse cx="480" cy="220" rx="30" ry="45" fill="#e8e8e8" transform="rotate(35 480 220)" />
                <rect x="450" y="220" width="60" height="80" fill="#f0f0f0" rx="4" transform="rotate(35 480 220)" />

                <ellipse cx="580" cy="160" rx="32" ry="48" fill="#e8e8e8" transform="rotate(-10 580 160)" />
                <rect x="548" y="160" width="64" height="85" fill="#f0f0f0" rx="4" transform="rotate(-10 580 160)" />

                <ellipse cx="720" cy="200" rx="28" ry="42" fill="#e8e8e8" transform="rotate(50 720 200)" />
                <rect x="692" y="200" width="56" height="75" fill="#f0f0f0" rx="4" transform="rotate(50 720 200)" />


                <ellipse cx="920" cy="240" rx="33" ry="47" fill="#e8e8e8" transform="rotate(-40 920 240)" />
                <rect x="887" y="240" width="66" height="82" fill="#f0f0f0" rx="4" transform="rotate(-40 920 240)" />

                <ellipse cx="1080" cy="190" rx="30" ry="45" fill="#e8e8e8" transform="rotate(20 1080 190)" />
                <rect x="1050" y="190" width="60" height="80" fill="#f0f0f0" rx="4" transform="rotate(20 1080 190)" />


                <ellipse cx="400" cy="380" rx="28" ry="42" fill="#e0e0e0" transform="rotate(15 400 380)" />
                <rect x="372" y="380" width="56" height="75" fill="#f0f0f0" rx="4" transform="rotate(15 400 380)" />

                <ellipse cx="650" cy="420" rx="32" ry="48" fill="#e0e0e0" transform="rotate(-35 650 420)" />
                <rect x="618" y="420" width="64" height="85" fill="#f0f0f0" rx="4" transform="rotate(-35 650 420)" />
              </g>


              <g opacity="1">

                <ellipse cx="700" cy="350" rx="55" ry="75" fill="#0d4cb3" transform="rotate(-15 700 350)" />
                <rect x="645" y="350" width="110" height="140" fill="#1a5fd4" rx="6" transform="rotate(-15 700 350)" />
                <ellipse cx="700" cy="490" rx="55" ry="75" fill="#0a3a8f" transform="rotate(-15 700 350)" />


                <ellipse cx="520" cy="320" rx="42" ry="62" fill="#0d4cb3" transform="rotate(25 520 320)" />
                <rect x="478" y="320" width="84" height="110" fill="#1a5fd4" rx="5" transform="rotate(25 520 320)" />
                <ellipse cx="520" cy="430" rx="42" ry="62" fill="#0a3a8f" transform="rotate(25 520 320)" />
              </g>


              <g opacity="0.9">
                <ellipse cx="880" cy="380" rx="35" ry="52" fill="#2a2a2a" transform="rotate(40 880 380)" />
                <rect x="845" y="380" width="70" height="95" fill="#1a1a1a" rx="4" transform="rotate(40 880 380)" />

                <ellipse cx="1050" cy="350" rx="32" ry="48" fill="#2a2a2a" transform="rotate(-20 1050 350)" />
                <rect x="1018" y="350" width="64" height="88" fill="#1a1a1a" rx="4" transform="rotate(-20 1050 350)" />

                <ellipse cx="320" cy="420" rx="30" ry="45" fill="#2a2a2a" transform="rotate(10 320 420)" />
                <rect x="290" y="420" width="60" height="82" fill="#1a1a1a" rx="4" transform="rotate(10 320 420)" />
              </g>

 
              <defs>
                <linearGradient id="iridescent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.15" />
                  <stop offset="25%" stopColor="#ffd93d" stopOpacity="0.12" />
                  <stop offset="50%" stopColor="#6bcf7f" stopOpacity="0.15" />
                  <stop offset="75%" stopColor="#4d9fff" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#c77dff" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <path
                d="M 1100 80 Q 1200 120, 1300 100 Q 1350 140, 1400 120 L 1400 250 Q 1350 230, 1300 250 Q 1200 270, 1100 240 Z"
                fill="url(#iridescent)"
                className="opacity-60"
                style={{
                  filter: 'blur(40px)'
                }}
              />
            </svg>
          </div>

          <div className="flex items-center justify-between py-6 px-1">
            <span className="text-xl font-light text-black/40 transition-colors hover:text-black/70 cursor-pointer">+</span>
            <span className="text-xl font-light text-black/40 transition-colors hover:text-black/70 cursor-pointer">+</span>
            <span className="text-[9px] tracking-[0.25em] font-medium uppercase text-black/50">
              SCROLL TO EXPLORE
            </span>
            <span className="text-xl font-light text-black/40 transition-colors hover:text-black/70 cursor-pointer">+</span>
            <span className="text-xl font-light text-black/40 transition-colors hover:text-black/70 cursor-pointer">+</span>
          </div>
        </section>
      </div> */}
    </div >
  );
}