'use client';

import { LiquidEffectAnimation } from '@/app/components/ui/LiquidEffectAnimation';

export default function LiquidDemo() {
    return (
        <div className="relative min-h-screen">
            {/* Liquid Effect Background */}
            <LiquidEffectAnimation
                imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
            />

            {/* Your content goes on top */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold text-white">
                    Liquid Effect Demo
                </h1>
            </div>
        </div>
    );
}
