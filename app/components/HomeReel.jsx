'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeReel() {
    const pathname = usePathname();
    const videoPlaceholderRef = useRef(null);
    const videoThumbRef = useRef(null);

    useEffect(() => {
        const videoPlaceholder = videoPlaceholderRef.current;
        const videoThumb = videoThumbRef.current;

        if (!videoPlaceholder || !videoThumb) return;

        let initialThumbRect = null;
        // Save the original style attribute completely
        const originalStyle = videoThumb.getAttribute('style') || '';

        // Create the scroll-triggered animation
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: videoPlaceholder,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 0.3,
                markers: true, // For debugging - remove after testing
                onEnter: () => {
                    // Store initial position when animation starts
                    initialThumbRect = videoThumb.getBoundingClientRect();

                    // Make thumb fixed with explicit paddingTop removal
                    videoThumb.style.position = 'fixed';
                    videoThumb.style.top = initialThumbRect.top + 'px';
                    videoThumb.style.left = initialThumbRect.left + 'px';
                    videoThumb.style.width = initialThumbRect.width + 'px';
                    videoThumb.style.height = initialThumbRect.height + 'px';
                    videoThumb.style.paddingTop = '0';
                    videoThumb.style.zIndex = '1000';
                    videoThumb.style.margin = '0';
                },
                onLeaveBack: () => {
                    // Restore original style attribute completely
                    videoThumb.setAttribute('style', originalStyle);
                    initialThumbRect = null;
                },
                onUpdate: (self) => {
                    const placeholderRect = videoPlaceholder.getBoundingClientRect();
                    const progress = self.progress;

                    if (initialThumbRect && progress > 0) {
                        // Calculate target values
                        const targetTop = placeholderRect.top;
                        const targetLeft = placeholderRect.left;
                        const targetWidth = placeholderRect.width;
                        const targetHeight = placeholderRect.height;

                        // Interpolate between initial and target
                        videoThumb.style.top = (initialThumbRect.top + (targetTop - initialThumbRect.top) * progress) + 'px';
                        videoThumb.style.left = (initialThumbRect.left + (targetLeft - initialThumbRect.left) * progress) + 'px';
                        videoThumb.style.width = (initialThumbRect.width + (targetWidth - initialThumbRect.width) * progress) + 'px';
                        videoThumb.style.height = (initialThumbRect.height + (targetHeight - initialThumbRect.height) * progress) + 'px';
                        videoThumb.style.borderRadius = (1.5 * (1 - progress)) + 'rem';
                    }
                }
            });
        });

        return () => {
            ctx.revert();
            // Restore on cleanup too
            videoThumb.setAttribute('style', originalStyle);
        };
    }, []);
    return (
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
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {/* <video
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
                                    objectFit: 'cover',
                                    zIndex: 0
                                }}
                            >
                                <source src="/videos/Ideas.mp4" type="video/mp4" />
                            </video> */}
                            <div
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
                            id="home-reel-video-watch-btn"
                            aria-label="Watch reel button"
                            className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                            style={{
                                display: 'flex',
                                opacity: 1,
                                transform: 'scale(1)'
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
    );
}
