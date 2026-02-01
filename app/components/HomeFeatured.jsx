'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

// Project data extracted from the HTML
const projects = [
    {
        id: 'devin_ai',
        title: 'Devin AI',
        href: '/projects/devin_ai',
        tags: 'web • design • development • 3d',
        bgColor: '#121414',
        textColor: '#ffffff',
        image: '/images/projects/devin-ai.jpg'
    },
    {
        id: 'porsche_dream_machine',
        title: 'Porsche: Dream Machine',
        href: '/projects/porsche_dream_machine',
        tags: 'concept • 3D illustration • mograph • video',
        bgColor: '#EFD5D3',
        textColor: '#000000',
        image: '/images/projects/porsche.jpg'
    },
    {
        id: 'synthetic_human',
        title: 'Synthetic Human',
        href: '/projects/synthetic_human',
        tags: 'web • design • development • 3d',
        bgColor: '#9d8aff',
        textColor: '#ffffff',
        image: '/images/projects/synthetic.jpg'
    },
    {
        id: 'spatial_fusion',
        title: 'Meta: Spatial Fusion',
        href: '/projects/spatial_fusion',
        tags: 'web • design • development • 3d',
        bgColor: '#D6C8ED',
        textColor: '#000000',
        image: '/images/projects/spatial.jpg'
    },
    {
        id: 'spaace',
        title: 'Spaace - NFT Marketplace',
        href: '/projects/spaace',
        tags: 'web • design • development • 3d • web3',
        bgColor: '#010a16',
        textColor: '#ffece2',
        image: '/images/projects/spaace.jpg'
    },
    {
        id: 'ddd_2024',
        title: 'DDD 2024',
        href: '/projects/ddd_2024',
        tags: 'web • design • development • 3d',
        bgColor: '#261c46',
        textColor: '#ffffff',
        image: '/images/projects/ddd.jpg'
    },
    {
        id: 'choo_choo_world',
        title: 'Choo Choo World',
        href: '/projects/choo_choo_world',
        tags: 'concept • web • game design • 3d',
        bgColor: '#E8EEF8',
        textColor: '#000000',
        image: '/images/projects/choo.jpg'
    },
    {
        id: 'soda_experience',
        title: 'Soda Experience',
        href: '/projects/soda_experience',
        tags: 'AR • development • 3d',
        bgColor: '#E1E2E4',
        textColor: '#000000',
        image: '/images/projects/soda.jpg'
    }
];

// Component for animated title characters
const AnimatedTitle = ({ text }) => {
    const words = text.split(' ');
    return (
        <>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block">
                    {word.split('').map((char, charIndex) => (
                        <span
                            key={charIndex}
                            className="inline-block transition-transform duration-300"
                            style={{ transform: 'translate3d(0px, 0em, 0px) rotate(0deg)' }}
                        >
                            {char}
                        </span>
                    ))}
                    {wordIndex < words.length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </>
    );
};

// Component for animated project title on hover
const AnimatedProjectTitle = ({ title, isHovered }) => {
    const chars = title.split('');

    return (
        <div className="project-item-line-2-inner flex">
            {chars.map((char, index) => {
                if (char === ' ') {
                    return (
                        <div
                            key={index}
                            className="project-item-line-2-inner-list"
                            style={{ width: '0.3em' }}
                        />
                    );
                }
                return (
                    <div
                        key={index}
                        className="project-item-line-2-inner-list flex flex-col transition-transform duration-300"
                        style={{
                            transform: isHovered
                                ? `translate3d(0em, -25%, 0px)`
                                : 'translate3d(0em, 0%, 0px)'
                        }}
                    >
                        <span>{char}</span>
                        <span>{char}</span>
                        <span>{char}</span>
                        <span>{char}</span>
                    </div>
                );
            })}
        </div>
    );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    };

    return (
        <Link
            href={project.href}
            ref={cardRef}
            className="project-item relative col-span-6 cursor-pointer"
            style={{
                marginTop: index >= 2 ? '5em' : 0
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Project Image Area */}
            <div
                className="project-item-main relative overflow-hidden rounded-2xl"
                style={{
                    backgroundColor: project.bgColor,
                    aspectRatio: '16/10'
                }}
            >
                <div
                    ref={imageRef}
                    className="project-item-image w-full h-full"
                    style={{
                        backgroundColor: project.bgColor,
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.5s ease-out'
                    }}
                />
            </div>

            {/* Project Footer */}
            <div className="project-item-footer mt-4">
                {/* Tags */}
                <div
                    className="project-item-line-1 text-sm uppercase tracking-wider opacity-60 mb-2"
                    style={{ color: 'currentColor' }}
                >
                    {project.tags}
                </div>

                {/* Animated Title */}
                <div className="project-item-line-2 flex items-center">
                    {/* Arrow Icon - slides in from left, takes no space when hidden */}
                    <div
                        className="project-item-line-2-icon transition-all duration-300 shrink-0"
                        style={{
                            width: '1.5em',
                            marginLeft: isHovered ? '0' : '-1.75em',
                            marginRight: isHovered ? '0.25em' : '0',
                            opacity: isHovered ? 1 : 0
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h14m0 0l-6-6m6 6l-6 6"
                            />
                        </svg>
                    </div>

                    {/* Title with scroll animation */}
                    <div
                        className="project-item-line-2-wrapper text-2xl font-medium overflow-hidden"
                        style={{ height: '1.2em' }}
                    >
                        <AnimatedProjectTitle title={project.title} isHovered={isHovered} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function HomeFeatured() {
    const [ctaHovered, setCtaHovered] = useState(false);

    return (
        <section
            id="home-featured"
            className="section relative w-full grid grid-cols-12"
            style={{
                fontSize: 'clamp(0.875rem, 1vw, 2rem)',
                columnGap: 'var(--grid-gap)',
                padding: 'var(--base-padding-y) var(--base-padding-x)'
            }}
        >
            {/* Title Section */}
            <div
                id="home-featured-title-top"
                className="relative col-span-12"
                style={{ lineHeight: 0 }}
            >
                <div
                    id="home-featured-title-wrapper"
                    className="relative w-fit"
                    style={{
                        fontSize: '8vw',
                        letterSpacing: '-0.02em'
                    }}
                >
                    <h4
                        id="home-featured-title"
                        className="relative inline-block overflow-hidden"
                        style={{
                            paddingTop: '0.5em',
                            margin: '0 0 0 -0.07em',
                            lineHeight: '0.9'
                        }}
                    >
                        <AnimatedTitle text="Featured Work" />
                    </h4>
                </div>

                {/* Disclaimer */}
                <div
                    id="home-featured-disclaimer"
                    className="absolute right-0 bottom-0 uppercase text-right"
                    style={{
                        width: 'calc(var(--grid-space, 100px) * 3 + var(--grid-gap, 16px) * 2)',
                        lineHeight: '1.4',
                        fontSize: 'clamp(0.6rem, 0.9vw, 1rem)'
                    }}
                >
                    <div className="overflow-hidden">
                        <div className="line">a Selection of our most passionately</div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="line">crafted works with forward-thinking</div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="line">clients and friends over the years.</div>
                    </div>
                </div>
            </div>

            {/* Project List */}
            <div
                className="project-list relative col-span-12 grid grid-cols-12"
                style={{
                    marginTop: 'calc(var(--vh, 1vh) * 8)',
                    columnGap: 'var(--grid-gap)'
                }}
            >
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* CTA Button */}
            <Link
                href="/projects"
                id="home-featured-cta"
                className="col-span-12 flex items-center justify-center gap-4 mx-auto mt-24 px-6 py-4 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300"
                style={{
                    fontSize: 'clamp(0.875rem, 1vw, 1.75rem)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 10px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
            >
                <span
                    id="home-featured-cta-dot"
                    className="w-2 h-2 rounded-full bg-white transition-transform duration-300"
                    style={{
                        transform: ctaHovered ? 'scale(1.5)' : 'scale(1)'
                    }}
                />
                <span id="home-featured-cta-text">See all projects</span>
                <span
                    id="home-featured-cta-arrow"
                    className="transition-transform duration-300"
                    style={{
                        transform: ctaHovered ? 'translateX(4px)' : 'translateX(0)'
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 16 16"
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
            </Link>
        </section>
    );
}
