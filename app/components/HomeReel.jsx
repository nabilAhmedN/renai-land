'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeReel() {
    const pathname = usePathname();
    const videoPlaceholderRef = useRef(null);
    const videoThumbRef = useRef(null);
    const reelTitleRef = useRef(null);
    const watchButtonRef = useRef(null);

    // Fullscreen video player state
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showSmallCursor, setShowSmallCursor] = useState(false);

    const fullscreenVideoRef = useRef(null);
    const overlayRef = useRef(null);
    const closeButtonRef = useRef(null);
    const progressBarRef = useRef(null);
    const decorativeLineRef = useRef(null);

    useEffect(() => {
        const videoPlaceholder = videoPlaceholderRef.current;
        const videoThumb = videoThumbRef.current;
        const reelTitle = reelTitleRef.current;
        const watchButton = watchButtonRef.current;

        if (!videoPlaceholder || !videoThumb) return;

        const originalParent = videoThumb.parentElement;
        const originalStyle = videoThumb.getAttribute('style') || '';
        let isMovedToPlaceholder = false;

        // Store the original thumb position (relative to viewport at scroll 0)
        let originalThumbPosition = null;

        // Initially hide the text and button
        if (reelTitle) {
            gsap.set(reelTitle, {
                opacity: 0,
                y: 50,
                visibility: 'hidden'
            });
        }
        if (watchButton) {
            gsap.set(watchButton, {
                opacity: 0,
                y: 30,
                scale: 0.8,
                visibility: 'hidden'
            });
        }

        // Function to show text and button with roll animation
        const showTextAndButton = () => {
            const tl = gsap.timeline();

            // Button appears first
            if (watchButton) {
                tl.to(watchButton, {
                    visibility: 'visible',
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }

            // Then text rolls up
            if (reelTitle) {
                tl.to(reelTitle, {
                    visibility: 'visible',
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.2'); // Slight overlap
            }
        };

        // Function to hide text and button
        const hideTextAndButton = () => {
            const tl = gsap.timeline();

            // Text hides first
            if (reelTitle) {
                tl.to(reelTitle, {
                    opacity: 0,
                    y: 50,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        gsap.set(reelTitle, { visibility: 'hidden' });
                    }
                });
            }

            // Then button hides
            if (watchButton) {
                tl.to(watchButton, {
                    opacity: 0,
                    y: 30,
                    scale: 0.8,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        gsap.set(watchButton, { visibility: 'hidden' });
                    }
                }, '-=0.15');
            }
        };

        // Create the scroll-triggered animation
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: videoPlaceholder,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 0.3,
                // markers: true, // For debugging - uncomment when needed
                onEnter: () => {
                    // Store original position when first entering
                    if (!originalThumbPosition) {
                        const rect = videoThumb.getBoundingClientRect();
                        originalThumbPosition = {
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height
                        };
                    }

                    // Make thumb fixed
                    videoThumb.style.position = 'fixed';
                    videoThumb.style.top = originalThumbPosition.top + 'px';
                    videoThumb.style.left = originalThumbPosition.left + 'px';
                    videoThumb.style.width = originalThumbPosition.width + 'px';
                    videoThumb.style.height = originalThumbPosition.height + 'px';
                    videoThumb.style.paddingTop = '0';
                    videoThumb.style.zIndex = '1000';
                    videoThumb.style.margin = '0';
                },
                onLeave: () => {
                    // Animation complete - move video into placeholder
                    if (!isMovedToPlaceholder) {
                        videoThumb.style.position = 'absolute';
                        videoThumb.style.top = '0';
                        videoThumb.style.left = '0';
                        videoThumb.style.width = '100%';
                        videoThumb.style.height = '100%';
                        videoThumb.style.borderRadius = '0';
                        videoThumb.style.zIndex = '0';
                        videoPlaceholder.insertBefore(videoThumb, videoPlaceholder.firstChild);
                        isMovedToPlaceholder = true;

                        // Show text and button with roll animation
                        showTextAndButton();
                    }
                },
                onEnterBack: () => {
                    // Moving back from completed state - start reverse animation
                    if (isMovedToPlaceholder) {
                        // Hide text and button first
                        hideTextAndButton();

                        const placeholderRect = videoPlaceholder.getBoundingClientRect();

                        // Move back to original parent
                        originalParent.appendChild(videoThumb);
                        isMovedToPlaceholder = false;

                        // Set to fixed at placeholder position
                        videoThumb.style.position = 'fixed';
                        videoThumb.style.top = placeholderRect.top + 'px';
                        videoThumb.style.left = placeholderRect.left + 'px';
                        videoThumb.style.width = placeholderRect.width + 'px';
                        videoThumb.style.height = placeholderRect.height + 'px';
                        videoThumb.style.zIndex = '1000';
                        videoThumb.style.borderRadius = '0';
                    }
                },
                onLeaveBack: () => {
                    // Fully scrolled back - restore original state
                    videoThumb.setAttribute('style', originalStyle);
                    if (isMovedToPlaceholder) {
                        originalParent.appendChild(videoThumb);
                        isMovedToPlaceholder = false;
                    }
                    originalThumbPosition = null;
                },
                onUpdate: (self) => {
                    if (isMovedToPlaceholder) return;
                    if (!originalThumbPosition) return;

                    const placeholderRect = videoPlaceholder.getBoundingClientRect();
                    const progress = self.progress;

                    // Calculate current position based on progress
                    // Progress 0 = original position, Progress 1 = placeholder position
                    const currentTop = originalThumbPosition.top + (placeholderRect.top - originalThumbPosition.top) * progress;
                    const currentLeft = originalThumbPosition.left + (placeholderRect.left - originalThumbPosition.left) * progress;
                    const currentWidth = originalThumbPosition.width + (placeholderRect.width - originalThumbPosition.width) * progress;
                    const currentHeight = originalThumbPosition.height + (placeholderRect.height - originalThumbPosition.height) * progress;
                    const currentRadius = 1.5 * (1 - progress);

                    videoThumb.style.top = currentTop + 'px';
                    videoThumb.style.left = currentLeft + 'px';
                    videoThumb.style.width = currentWidth + 'px';
                    videoThumb.style.height = currentHeight + 'px';
                    videoThumb.style.borderRadius = currentRadius + 'rem';
                }
            });
        });

        return () => {
            ctx.revert();
            // Restore on cleanup
            videoThumb.setAttribute('style', originalStyle);
            if (isMovedToPlaceholder) {
                originalParent.appendChild(videoThumb);
            }
        };
    }, []);

    // Decorative line scroll animation
    useEffect(() => {
        const linePath = decorativeLineRef.current;
        if (!linePath) return;

        // Get the total length of the path
        const pathLength = linePath.getTotalLength();

        // Create animation context
        const ctx = gsap.context(() => {
            // Set initial state - line is completely hidden
            gsap.set(linePath, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength
            });

            // Animate line draw on scroll
            gsap.to(linePath, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#home-reel',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1.2,
                }
            });
        });

        // Refresh ScrollTrigger after a short delay to ensure proper initialization
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(refreshTimeout);
            ctx.revert();
        };
    }, []);

    // Fullscreen video player functions
    const openFullscreen = () => {
        console.log('Opening fullscreen');
        setIsFullscreen(true);
        setIsPlaying(true);
        setIsMuted(false);
        document.body.style.overflow = 'hidden';
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setIsPlaying(false);
        if (fullscreenVideoRef.current) {
            fullscreenVideoRef.current.pause();
            fullscreenVideoRef.current.currentTime = 0;
        }
        document.body.style.overflow = '';
    };

    const togglePlay = () => {
        if (fullscreenVideoRef.current) {
            if (isPlaying) {
                fullscreenVideoRef.current.pause();
            } else {
                fullscreenVideoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (fullscreenVideoRef.current) {
            fullscreenVideoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (fullscreenVideoRef.current) {
            const currentProgress = (fullscreenVideoRef.current.currentTime / fullscreenVideoRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleProgressClick = (e) => {
        if (progressBarRef.current && fullscreenVideoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            fullscreenVideoRef.current.currentTime = clickPosition * fullscreenVideoRef.current.duration;
        }
    };

    const handleMouseMove = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleControlsHover = (isHovering) => {
        setShowSmallCursor(isHovering);
    };

    // Start video when fullscreen opens
    useEffect(() => {
        if (isFullscreen && fullscreenVideoRef.current) {
            fullscreenVideoRef.current.play();
            fullscreenVideoRef.current.muted = false;
        }
    }, [isFullscreen]);

    return (
        <>
            <section
                id="home-reel"
                className="section"
                style={{
                    fontSize: 'clamp(0.875rem, 1vw, 2rem)',
                    position: 'relative',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                    columnGap: 'var(--grid-gap)',
                    padding: 'var(--base-padding-y) var(--base-padding-x)'
                }}
            >
                {/* Reel Title */}
                <h4
                    id="home-reel-title"
                    style={{
                        position: 'relative',
                        fontSize: '10vw',
                        left: '-0.03em',
                        letterSpacing: '-0.02em',
                        gridColumn: '1 / span 12',
                        marginTop: '1em',
                        marginBottom: '0.5em',
                        lineHeight: 1,
                        willChange: 'transform',
                        fontWeight: 400
                    }}
                >
                    <div id="home-reel-title-inner">
                        <div id="home-reel-title-line-1" className="inline-block relative">
                            <span className="word inline-block">Beyond</span>{' '}
                            <span className="word inline-block">Visions</span>
                        </div>
                        <div id="home-reel-title-line-2" className="inline-block relative">
                            <span className="word inline-block">Within</span>{' '}
                            <span className="word inline-block">Reach</span>
                        </div>
                    </div>
                </h4>

                {/* Reel Content - Description */}
                <div
                    id="home-reel-content"
                    style={{
                        lineHeight: 1.4,
                        gridColumn: '7 / span 6',
                        height: 'fit-content',
                        fontSize: 'clamp(1rem, 1.5vw, 3rem)'
                    }}
                >
                    <h2 id="home-reel-desc" className="font-normal">
                        Welcome to Renai Holdings. Renai is a family run business that has been operating in the garments industry for over 30 years. With sustainability at its core, Renai is on a mission to accelerate the sustainable revolution.
                    </h2>

                    {/* About Us CTA with Liquid Fill Animation */}
                    <Link
                        id="home-reel-cta"
                        href="/about"
                        style={{ opacity: 1 }}
                    >
                        <span id="home-reel-cta-dot"></span>
                        <span id="home-reel-cta-text">About us</span>
                        <span id="home-reel-cta-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* Decorative Scroll Line SVG - Full Height Bezier Curve */}
                <svg
                    id="decorative-scroll-line"
                    viewBox="0 0 100 100"
                    fill="none"
                    preserveAspectRatio="none"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: -1,
                        overflow: 'visible'
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        ref={decorativeLineRef}
                        d="M 0,3 C 15,8 25,15 30,25 C 35,35 25,45 20,50 C 15,55 10,60 15,68 C 20,76 35,80 50,82 C 65,84 80,88 95,95 C 98,97 100,100 100,100"
                        stroke="#4169e1"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>

                {/* Reel Thumb Wrapper */}
                <div
                    id="home-reel-thumb-wrapper"
                    style={{
                        position: 'relative',
                        gridColumn: '1 / span 5',
                        width: 'calc(100% + var(--grid-gap) * 2)',
                        height: 0,
                        top: '-4em'
                    }}
                >
                    <div ref={videoThumbRef} id="home-reel-thumb" style={{
                        fontSize: '2.4rem',
                        paddingTop: '56.25%',
                        height: 0,
                        gridColumn: '1 / span 5',
                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: '1.5rem'
                    }}>
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        >
                            <source src="/videos/Ideas.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>

                <div
                    id="home-reel-container"
                    style={{
                        gridColumn: '1 / 13',
                        paddingBottom: 'calc(var(--vh, vh) * 100)',
                        marginBottom: 'calc(var(--vh, vh) * 10)'


                    }}
                >
                    <div id="home-reel-container-inner">
                        <div
                            id="home-reel-video-container"
                            className="relative rounded-2xl overflow-hidden"
                            style={{
                                height: '451.615px',
                                marginTop: '48.1927px',
                                transform: 'translate3d(0px, 341.786px, 0px)'
                            }}


                        >
                            {/* Decoration */}
                            <div id="home-reel-video-container-decoration">
                                <div id="home-reel-video-container-top" className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
                                    <div id="home-reel-video-container-crosses" className="flex gap-2">
                                        {/* {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="home-reel-video-container-cross w-3 h-3 opacity-30"
                                            style={{
                                                background: 'currentColor',
                                                clipPath: 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)'
                                            }}
                                        />
                                    ))} */}

                                        <div className="home-reel-video-container-cross" style={{
                                            transform: "translate3d(0px, 0em, 0px) scale(1) rotate(180deg)"
                                        }}></div>
                                        <div className="home-reel-video-container-cross" style={{
                                            transform: "translate3d(0px, 0em, 0px) scale(1) rotate(180deg)"
                                        }}></div>
                                        <div className="home-reel-video-container-cross" style={{
                                            transform: "translate3d(0px, 0em, 0px) scale(1) rotate(180deg)"
                                        }}></div>
                                        <div className="home-reel-video-container-cross" style={{
                                            transform: "translate3d(0px, 0em, 0px) scale(1) rotate(180deg)"
                                        }}></div>
                                        <div className="home-reel-video-container-cross" style={{
                                            transform: "translate3d(0px, 0em, 0px) scale(1) rotate(180deg)"
                                        }}></div>
                                    </div>
                                </div>

                                <div id="home-reel-video-container-bottom" className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                                    <div id="home-reel-video-container-crosses" className="flex gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="home-reel-video-container-cross w-3 h-3 opacity-30"
                                                style={{
                                                    background: 'currentColor',
                                                    clipPath: 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Video Placeholder */}
                            <div
                                ref={videoPlaceholderRef}
                                id="home-reel-video-placeholder"
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >

                                {/* reel video will be here */}
                                <div
                                    ref={reelTitleRef}
                                    id="home-reel-video-title"
                                    className="text-white text-4xl md:text-6xl font-light tracking-wide"
                                    style={{ zIndex: 1 }}
                                >
                                    <span className="home-reel-video-title-word">Play</span>{' '}
                                    <span className="home-reel-video-title-word">Reel</span>
                                </div>
                            </div>

                            {/* Watch Button */}
                            <button
                                ref={watchButtonRef}
                                id="home-reel-video-watch-btn"
                                aria-label="Watch reel button"
                                onClick={openFullscreen}
                                className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 z-50"
                                style={{
                                    display: 'flex',
                                    opacity: 1,
                                    transform: 'scale(1)',
                                    pointerEvents: 'auto'
                                }}
                            >
                                <div id="home-reel-video-watch-btn-base"></div>
                                <div id="home-reel-video-watch-btn-background"></div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 36 36"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fullscreen Video Overlay */}
            {isFullscreen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black z-[9999]"
                    style={{ cursor: showSmallCursor ? 'none' : 'none' }}
                    onMouseMove={handleMouseMove}
                    onClick={closeFullscreen}
                >
                    {/* Video */}
                    <video
                        ref={fullscreenVideoRef}
                        className="w-full h-full object-cover"
                        src="/videos/Ideas.mp4"
                        onTimeUpdate={handleTimeUpdate}
                        onClick={closeFullscreen}
                    />

                    {/* Custom Close Button - follows cursor */}
                    <div
                        ref={closeButtonRef}
                        className="pointer-events-none fixed z-[10000]"
                        style={{
                            left: cursorPos.x,
                            top: cursorPos.y,
                            transform: 'translate(-50%, -50%)',
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <div
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                            style={{
                                transform: showSmallCursor ? 'scale(0.3)' : 'scale(1)',
                                transition: 'transform 0.2s ease-out'
                            }}
                        >
                            {!showSmallCursor && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Bottom Controls Bar */}
                    <div
                        className="absolute bottom-0 left-0 right-0 px-8 py-6 flex items-center gap-8"
                        style={{
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                            cursor: 'none'
                        }}
                        onMouseEnter={() => handleControlsHover(true)}
                        onMouseLeave={() => handleControlsHover(false)}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className="text-white text-sm font-medium tracking-wider hover:opacity-80 transition-opacity"
                            style={{ minWidth: '60px' }}
                        >
                            {isPlaying ? 'PAUSE' : 'PLAY'}
                        </button>

                        {/* Progress Bar */}
                        <div
                            ref={progressBarRef}
                            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative"
                            onClick={handleProgressClick}
                        >
                            <div
                                className="h-full bg-white rounded-full relative"
                                style={{ width: `${progress}%` }}
                            >
                                {/* Progress Handle */}
                                <div
                                    className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full"
                                    style={{ transform: 'translate(50%, -50%)' }}
                                />
                            </div>
                        </div>

                        {/* Mute Button */}
                        <button
                            onClick={toggleMute}
                            className="text-white text-sm font-medium tracking-wider hover:opacity-80 transition-opacity"
                            style={{ minWidth: '60px', textAlign: 'right' }}
                        >
                            {isMuted ? 'UNMUTE' : 'MUTE'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
