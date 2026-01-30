'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icon Components
const FactoryIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 21V10L9 6V10L14 6V10L19 6V21H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CornerIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const [soundOn, setSoundOn] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header
                id="header"
                className="fixed left-0 top-0 z-[52] w-full pointer-events-none transition-colors duration-[250ms]"
                style={{
                    padding: 'var(--base-padding-y, 48px) var(--base-padding-x, 64px)',
                    fontSize: 'clamp(1rem, 1vw, 1.5rem)'
                }}
            >
                {/* Header Container */}
                <div
                    id="header-container"
                    className="flex justify-between items-center overflow-hidden pb-[0.1em]"
                >
                    {/* Header Background - gradient overlay for menu */}
                    <div
                        id="header-background"
                        className="absolute top-0 right-0 w-[50vw] opacity-0 pointer-events-none transition-opacity duration-400"
                        style={{
                            height: 'calc(var(--vh, 1vh) * 100)',
                            background: 'linear-gradient(270deg, rgba(11,11,18,0.5) 0%, rgba(11,11,18,0) 100%)',
                            transitionDelay: '0.4s'
                        }}
                    />

                    {/* Logo */}
                    <Link
                        id="header-logo"
                        href="/"
                        aria-label="Go to home page"
                        className="pointer-events-auto"
                    >
                        <div
                            style={{
                                width: '121px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '24px',
                                fontWeight: '600',
                                letterSpacing: '-0.02em',
                                mixBlendMode: 'exclusion',
                                color: 'currentColor'
                            }}
                        >
                            Renai
                        </div>
                    </Link>

                    {/* Header Center - Back Button (for project pages) */}
                    <div id="header-center" className="absolute left-1/2 -translate-x-1/2">
                        <button
                            id="header-center-project-back-btn"
                            aria-label="Back"
                            className="hidden pointer-events-auto cursor-pointer text-[0.875em] h-[3.2em] px-[1.5em] pl-[1em] bg-white text-black font-medium rounded-full border-none uppercase w-fit flex items-center gap-[0.625em] overflow-hidden"
                        >
                            <svg
                                id="header-center-project-back-btn-svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="h-[1.2em] w-[1.2em] z-[1] transition-all duration-[400ms]"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.1, 1)' }}
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M8 12.243 3.757 8m0 0L8 3.757M3.757 8h8.486" />
                            </svg>
                            <p id="header-center-project-back-btn-text" className="m-0 z-[1] transition-all duration-500">back</p>
                        </button>
                    </div>

                    {/* Header Right - Buttons */}
                    <div id="header-right" className="flex items-center gap-3 pointer-events-auto">
                        {/* Sound Button */}
                        <button
                            onClick={() => setSoundOn(!soundOn)}
                            className="hidden md:flex w-11 h-11 items-center justify-center rounded-full hover:bg-white transition-colors"
                            style={{ backgroundColor: '#e4e6ef' }}
                            aria-label="Toggle sound"
                        >
                            {soundOn ? (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path
                                        d="M2 9 Q 4.5 5, 7 9 T 12 9 T 17 9"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                        className="animate-pulse"
                                    />
                                </svg>
                            ) : (
                                <svg width="18" height="2" viewBox="0 0 18 2" fill="none">
                                    <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            )}
                        </button>

                        {/* Let's Talk Button */}
                        <Link href="mailto:hello@lusion.co">
                            <button
                                className="group relative flex items-center gap-4 h-11 rounded-full transition-all duration-500 text-xs md:text-sm font-medium uppercase overflow-hidden bg-black text-white shadow-md"
                                style={{ backgroundColor: '#000000', padding: '1em 1.5em 1em 1.625em', boxShadow: '0 6px 10px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04)' }}
                            >
                                {/* Arrow - slides in from left on hover */}
                                <span
                                    className="absolute left-4 flex items-center justify-center h-5 w-5 text-white rounded-full -translate-x-12 transition-all duration-400 group-hover:translate-x-0 z-20"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                        className="transition-colors duration-500"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
                                        />
                                    </svg>
                                </span>

                                {/* Text - slides right on hover */}
                                <span
                                    className="relative z-20 transition-all duration-400 group-hover:translate-x-6"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                                >
                                    LET&apos;S TALK
                                </span>

                                {/* Animated Dot - expands on hover (right side) */}
                                <span
                                    className="inline-block relative w-2 h-2 bg-white rounded-full z-10 transition-all duration-400 group-hover:scale-[40] group-hover:bg-[#0016ec]"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                                ></span>
                            </button>
                        </Link>

                        {/* Menu Button */}
                        <button
                            id="header-right-menu-btn"
                            aria-label="Menu button"
                            className="text-[0.875em] rounded-[6.25em] pl-4 pr-4 h-11 font-medium uppercase border-none cursor-pointer transition-colors duration-[400ms] bg-[#e4e6ef] text-black"
                            onClick={toggleMenu}
                            onMouseEnter={() => setIsMenuHovered(true)}
                            onMouseLeave={() => setIsMenuHovered(false)}
                        >
                            <div
                                id="header-right-menu-btn-inner"
                                className="flex justify-center items-center relative bg-transparent overflow-hidden gap-[0.625em]"
                            >
                                <span
                                    id="header-right-menu-btn-text"
                                    className="leading-[1.2em] transition-transform duration-300"
                                    style={{
                                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.1, 1)',
                                        transform: isMenuOpen ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)'
                                    }}
                                >
                                    Menu
                                </span>
                                <span
                                    id="header-right-menu-btn-text-close"
                                    className="absolute left-0 transition-transform duration-300"
                                    style={{
                                        transform: isMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
                                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.1, 1)'
                                    }}
                                >
                                    Close
                                </span>
                                <div
                                    id="header-right-menu-btn-dots"
                                    className="relative w-[1.15em] h-[1.15em] transition-transform duration-[400ms]"
                                    style={{
                                        transform: `translateZ(0) rotate(${(isMenuHovered || isMenuOpen) ? '90deg' : '180deg'})`,
                                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.1, 1)'
                                    }}
                                >
                                    <span
                                        className="absolute inline-block w-[0.3125em] h-[0.3125em] bg-current rounded-full left-[0.1em] top-1/2 -translate-y-1/2 transition-colors duration-[400ms]"
                                    />
                                    <span
                                        className="absolute inline-block w-[0.3125em] h-[0.3125em] bg-current rounded-full right-[0.1em] top-1/2 -translate-y-1/2 transition-colors duration-[400ms]"
                                    />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Dropdown Menu - Outside header for proper stacking context */}
            <div
                className={`fixed top-0 right-0 z-[100] transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'
                    }`}
                style={{
                    marginTop: 'calc(var(--base-padding-y) + 60px)',
                    marginRight: 'var(--base-padding-x)',
                }}
            >
                {/* Navigation Card */}
                <div
                    className="bg-white rounded-xl shadow-2xl overflow-hidden mb-4"
                    style={{
                        width: '300px',
                        borderRadius: '12px',
                    }}
                >
                    {/* Navigation Links */}
                    <nav className="px-8 pt-8 pb-8">
                        <ul className="space-y-3">
                            <li className="group">
                                <Link
                                    href="/"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>HOME</span>
                                    {pathname === '/' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                            <li className="group">
                                <Link
                                    href="/about"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>ABOUT US</span>
                                    {pathname === '/about' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                            <li className="group">
                                <Link
                                    href="/projects"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>PROJECTS</span>
                                    {pathname === '/projects' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                            <li className="group">
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-between py-3 px-8 -mx-6 text-lg font-normal rounded-full transition-all group-hover:bg-[#e8e6f5]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>CONTACT</span>
                                    {pathname === '/contact' ? (
                                        <span className="w-2 h-2 bg-black rounded-full"></span>
                                    ) : (
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path
                                                d="M7 4L13 10L7 16"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Factory Button - Separate Element */}
                <Link
                    href="https://labs.lusion.co"
                    target="_blank"
                    className="flex items-center justify-between px-6 py-4 bg-black text-white rounded-xl transition-colors group shadow-2xl hover:bg-[#2b2e3a]"
                    style={{
                        backgroundColor: '#000',
                        width: '300px',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <FactoryIcon />
                        <span className="font-medium text-xl text-white">FACTORY</span>
                    </div>
                    <CornerIcon />
                </Link>
            </div>
            {/* Header Menu - Fullscreen Navigation (hidden by default) */}
            {/* <div
                id="header-menu"
                className={`fixed inset-0 z-[51] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{
                    background: 'rgba(11, 11, 18, 0.95)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                
                <div id="header-menu-links" style={{ '--open-delay': '0s', '--close-delay': '0.08s' }}>
                    <Link className="header-menu-link --active" data-page="home" href="/">
                        <div className="header-menu-link-background" />
                        <div className="header-menu-link-inner">
                            <span className="header-menu-link-text">Home</span>
                            <span className="header-menu-link-text-clone">Home</span>
                            <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476" />
                            </svg>
                        </div>
                    </Link>
                    <Link className="header-menu-link" data-page="about" href="/about">
                        <div className="header-menu-link-background" />
                        <div className="header-menu-link-inner">
                            <span className="header-menu-link-text">About us</span>
                            <span className="header-menu-link-text-clone">About us</span>
                            <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476" />
                            </svg>
                        </div>
                    </Link>
                    <Link className="header-menu-link" data-page="projects" href="/projects">
                        <div className="header-menu-link-background" />
                        <div className="header-menu-link-inner">
                            <span className="header-menu-link-text">Projects</span>
                            <span className="header-menu-link-text-clone">Projects</span>
                            <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476" />
                            </svg>
                        </div>
                    </Link>
                    <button className="header-menu-link" data-scroll-to="contact">
                        <div className="header-menu-link-background" />
                        <div className="header-menu-link-inner">
                            <span className="header-menu-link-text">Contact</span>
                            <span className="header-menu-link-text-clone">Contact</span>
                            <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476" />
                            </svg>
                        </div>
                    </button>
                </div>

               
                <div id="header-menu-newsletter" style={{ '--open-delay': '0.02s', '--close-delay': '0.06s' }}>
                    <h3 id="header-menu-newsletter-title">
                        <div className="header-menu-newsletter-title-line">Subscribe to</div>
                        <div className="header-menu-newsletter-title-line">our newsletter</div>
                    </h3>
                    <div id="header-menu-newsletter-input">
                        <div id="header-menu-newsletter-input-bg" />
                        <form id="header-menu-newsletter-form">
                            <input
                                id="header-menu-newsletter-input-field"
                                type="email"
                                name="EMAIL"
                                autoComplete="email"
                                placeholder="Your email"
                                className="bg-transparent border-none outline-none"
                            />
                            <button type="submit" id="header-menu-newsletter-input-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="#000" fillRule="evenodd" d="M4.11 12.75a.75.75 0 0 1 0-1.5h13.978l-5.036-5.036a.75.75 0 1 1 1.06-1.06l6.316 6.315.53.53-.53.53-6.316 6.317a.75.75 0 0 1-1.06-1.061l5.035-5.035H4.109Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                        <div id="header-menu-newsletter-feedback-message" />
                    </div>
                </div>

                
                <button id="header-menu-talk" style={{ '--open-delay': '0.04s', '--close-delay': '0.04s' }}>
                    <a href="mailto:hello@lusion.co" className="absolute inset-0" />
                    <div id="header-menu-text">Let&apos;s talk</div>
                    <svg id="header-menu-talk-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#fff" d="M0 0h24v24H0z" />
                        <rect width="18" height="18" x="3" y="3" stroke="#000" strokeWidth="1.5" rx="2" />
                        <rect width="12" height="4" x="6" y="14" fill="#000" rx="2" />
                        <path stroke="#000" strokeLinecap="round" strokeWidth="1.5" d="M7 7h10M7 10h10" />
                    </svg>
                </button>

             
                <a
                    id="header-menu-labs"
                    target="_blank"
                    href="https://labs.lusion.co/"
                    style={{ '--open-delay': '0.06s', '--close-delay': '0.02s' }}
                    rel="noopener noreferrer"
                >
                    <div id="header-menu-labs-inner">
                        <div id="header-menu-labs-lucy">
                            <svg id="header-menu-labs-lucy-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="38" fill="none" viewBox="0 0 28 38">
                                <path stroke="#fff" strokeWidth="5" d="M20.128 29.65C18.584 31.217 16.532 32 13.972 32c-2.56 0-4.612-.783-6.156-2.35C6.272 28.05 5.5 26 5.5 23.5c0-2.5.772-4.533 2.316-6.1 1.544-1.6 3.596-2.4 6.156-2.4 2.56 0 4.612.8 6.156 2.4C21.71 18.967 22.5 21 22.5 23.5c0 2.5-.79 4.55-2.372 6.15Z" />
                                <path fill="#fff" d="M23.5 4.25a3.25 3.25 0 1 0-6.5 0 3.25 3.25 0 0 0 6.5 0ZM11 4.25a3.25 3.25 0 1 0-6.5 0 3.25 3.25 0 0 0 6.5 0Z" />
                            </svg>
                        </div>
                        <div id="header-menu-labs-texts">
                            <div id="header-menu-labs-text">Labs</div>
                            <div id="header-menu-labs-text-clone">Labs</div>
                        </div>
                        <svg id="header-menu-labs-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 20 20 4m0 0v14.096M20 4H5.904" />
                        </svg>
                    </div>
                </a>
            </div> */}
        </>
    );
}
