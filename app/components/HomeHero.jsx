'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function HomeHero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageStackRef = useRef(null);
    const imagesRef = useRef([]);

    const images = [
        '/images/renai1.jpeg',
        '/images/renai2.jpeg',
        '/images/renai3.jpeg'
    ];

    useEffect(() => {
        // GSAP animation: slide up from below on mount
        if (imagesRef.current.length > 0) {
            gsap.fromTo(
                imagesRef.current,
                {
                    y: 200,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    stagger: 0 // All together as requested
                }
            );
        }
    }, []);

    const handleImageClick = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <section
            id="home-hero"
            className="relative w-full grid grid-cols-12 gap-[var(--grid-gap,2rem)]"
            style={{
                height: 'calc(var(--vh, 1vh) * 100)',
                alignContent: 'flex-start',
                gridTemplateRows: 'auto 1fr',
                padding: 'var(--base-padding-y, 48px) var(--base-padding-x, 64px)'
            }}
        >
            {/* Hero Title */}
            <h1
                id="home-hero-title"
                className="relative h-fit m-0 will-change-transform"
                style={{
                    gridColumn: '4 / span 5',
                    lineHeight: '1.1',
                    fontSize: '2.5vw'
                }}
            >
                {/* Line 1 */}
                <div className="line block text-start w-full relative overflow-hidden">
                    <div className="word inline-block">Let's</div>{' '}
                    <div className="word inline-block">Grow</div>{' '}
                    <div className="word inline-block">with</div>{' '}
                    <div className="word inline-block">Renai</div>
                </div>
                {/* Line 2 */}
                <div className="line block text-start w-full relative overflow-hidden">
                    <div className="word inline-block">We</div>{' '}
                    <div className="word inline-block">create</div>{' '}
                    <div className="word inline-block">beauty</div>{' '}
                    <div className="word inline-block">as</div>{' '}
                    <div className="word inline-block">a</div>{' '}
                    <div className="word inline-block">vacation</div>
                </div>
            </h1>

            {/* Hero Visual Container - Stacked Images */}
            <div
                id="home-hero-visual-container"
                className="col-span-12 relative cursor-pointer"
                ref={imageStackRef}
                onClick={handleImageClick}
                style={{
                    gridRow: '2',
                    alignSelf: 'stretch'
                }}
            >
                {images.map((src, index) => (
                    <div
                        key={index}
                        ref={(el) => (imagesRef.current[index] = el)}
                        className="absolute rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
                        style={{
                            width: '100%',
                            height: '100%',
                            top: `${index * 8}px`,
                            left: `${index * 8}px`,
                            zIndex: currentImageIndex === index ? 3 : 2 - index,
                            opacity: currentImageIndex === index ? 1 : 0.7,
                            transform: `scale(${currentImageIndex === index ? 1 : 0.98 - index * 0.01})`
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Renai image ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Scroll Container */}
            <div
                id="home-hero-scroll-container"
                className="absolute overflow-hidden"
                style={{
                    bottom: 0,
                    left: 'var(--base-padding-x, 64px)',
                    width: 'calc(100% - 2 * var(--base-padding-x, 64px))',
                    height: 'var(--base-padding-y, 48px)'
                }}
            >
                {/* Crosses */}
                <div
                    id="home-hero-scroll-container-crosses"
                    className="flex items-center justify-between w-full h-full"
                >
                    <div className="home-hero-scroll-container-cross w-3 h-3 relative before:absolute before:content-[''] before:w-full before:h-px before:bg-black/30 before:top-1/2 before:-translate-y-1/2 after:absolute after:content-[''] after:w-px after:h-full after:bg-black/30 after:left-1/2 after:-translate-x-1/2" style={{ transform: 'scale(1) rotate(180deg)' }}></div>
                    <div className="home-hero-scroll-container-cross w-3 h-3 relative before:absolute before:content-[''] before:w-full before:h-px before:bg-black/30 before:top-1/2 before:-translate-y-1/2 after:absolute after:content-[''] after:w-px after:h-full after:bg-black/30 after:left-1/2 after:-translate-x-1/2" style={{ transform: 'scale(1) rotate(180deg)' }}></div>

                    {/* Scroll Text */}
                    <div
                        id="home-hero-scroll"
                        className="uppercase text-[0.65rem] tracking-[0.2em] font-medium text-black/50"
                    >
                        <span className="word inline-block">scroll</span>{' '}
                        <span className="word inline-block">to</span>{' '}
                        <span className="word inline-block">explore</span>
                    </div>

                    <div className="home-hero-scroll-container-cross w-3 h-3 relative before:absolute before:content-[''] before:w-full before:h-px before:bg-black/30 before:top-1/2 before:-translate-y-1/2 after:absolute after:content-[''] after:w-px after:h-full after:bg-black/30 after:left-1/2 after:-translate-x-1/2" style={{ transform: 'scale(1) rotate(180deg)' }}></div>
                    <div className="home-hero-scroll-container-cross w-3 h-3 relative before:absolute before:content-[''] before:w-full before:h-px before:bg-black/30 before:top-1/2 before:-translate-y-1/2 after:absolute after:content-[''] after:w-px after:h-full after:bg-black/30 after:left-1/2 after:-translate-x-1/2" style={{ transform: 'scale(1) rotate(180deg)' }}></div>
                </div>
            </div>
        </section>
    );
}
