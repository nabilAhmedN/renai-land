'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Cross icon component
const CrossIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.75 1a.75.75 0 0 0-1.5 0v6.25H1a.75.75 0 0 0 0 1.5h6.25V15a.75.75 0 0 0 1.5 0V8.75H15a.75.75 0 0 0 0-1.5H8.75V1Z"
            clipRule="evenodd"
        />
    </svg>
);

export default function ScrollNav() {
    const router = useRouter();
    const sectionRef = useRef(null);
    const progressBarRef = useRef(null);
    const [hasNavigated, setHasNavigated] = useState(false);
    const progressRef = useRef(0);
    const isActiveRef = useRef(false);
    const resetTimeoutRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || !progressBarRef.current) return;

        // Reset progress bar to 0
        const resetProgress = () => {
            if (progressRef.current < 1 && !hasNavigated) {
                progressRef.current = 0;
                gsap.to(progressBarRef.current, {
                    scaleX: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        // Check if section is visible at bottom of viewport (page end)
        const checkIfActive = () => {
            const section = sectionRef.current;
            if (!section) return false;

            const rect = section.getBoundingClientRect();
            // Section is active when visible in viewport (bottom of section is near/below viewport bottom)
            const isVisible = rect.bottom <= window.innerHeight + 100 && rect.top < window.innerHeight;
            return isVisible;
        };

        // Handle wheel events
        const handleWheel = (e) => {
            if (!checkIfActive()) {
                isActiveRef.current = false;
                return;
            }

            isActiveRef.current = true;

            // Clear any pending reset timeout
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }

            // Only process scroll down (positive deltaY)
            if (e.deltaY > 0) {
                e.preventDefault();

                // Increase progress based on scroll amount
                progressRef.current = Math.min(1, progressRef.current + e.deltaY / 500);

                // Update progress bar
                gsap.to(progressBarRef.current, {
                    scaleX: progressRef.current,
                    duration: 0.1,
                    ease: 'none'
                });

                // Navigate when progress is complete
                if (progressRef.current >= 1 && !hasNavigated) {
                    setHasNavigated(true);
                    setTimeout(() => {
                        router.push('/about');
                    }, 200);
                } else {
                    // Set timeout to reset progress if user stops scrolling
                    resetTimeoutRef.current = setTimeout(resetProgress, 500);
                }
            } else if (e.deltaY < 0 && progressRef.current > 0) {
                // Scroll up - decrease progress
                e.preventDefault();
                progressRef.current = Math.max(0, progressRef.current + e.deltaY / 500);

                gsap.to(progressBarRef.current, {
                    scaleX: progressRef.current,
                    duration: 0.1,
                    ease: 'none'
                });

                // Set timeout to reset progress if user stops scrolling
                resetTimeoutRef.current = setTimeout(resetProgress, 500);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
    }, [router, hasNavigated]);

    return (
        <section
            ref={sectionRef}
            id="scroll-nav-section"
            className="section"
            style={{
                padding: 'var(--base-padding-y) var(--base-padding-x)'
            }}
        >
            <div id="scroll-nav-content">
                {/* Subtitle */}
                <div id="scroll-nav-subtitle">
                    Keep Scrolling<br />to Learn More
                </div>

                {/* Main text and next indicator */}
                <div id="scroll-nav-main">
                    <div id="scroll-nav-text">About Us</div>

                    <div id="scroll-nav-next">
                        <div id="scroll-nav-next-text">Next Page</div>
                        <div id="scroll-nav-next-bar">
                            <div
                                ref={progressBarRef}
                                id="scroll-nav-next-bar-inner"
                                style={{ transform: 'scaleX(0)' }}
                            ></div>
                        </div>
                        <div id="scroll-nav-next-arrow">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z"
                                    fill="#fff"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Cross line decoration */}
                <div id="scroll-nav-cross-line">
                    <div className="scroll-nav-cross"><CrossIcon /></div>
                    <div className="scroll-nav-cross"><CrossIcon /></div>
                    <div className="scroll-nav-cross"><CrossIcon /></div>
                    <div className="scroll-nav-cross"><CrossIcon /></div>
                    <div className="scroll-nav-cross"><CrossIcon /></div>
                </div>
            </div>
        </section>
    );
}
