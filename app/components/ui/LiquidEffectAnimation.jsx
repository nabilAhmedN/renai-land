'use client';

import { useEffect, useRef } from 'react';

export function LiquidEffectAnimation({
    imageSrc = null,
    isFixed = false
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Load the script dynamically
        const script = document.createElement('script');
        script.type = 'module';

        // Use a data URL for a simple gradient if no image is provided
        const imageUrl = imageSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f0f1fa;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23e0e1ea;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="1200" height="800" fill="url(%23g)" /%3E%3C/svg%3E';

        script.textContent = `
            import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

            const canvas = document.getElementById('liquid-canvas');
            if (canvas) {
                const app = LiquidBackground(canvas);
                app.loadImage('${imageUrl}');
                
                // Fabric-like material properties
                app.liquidPlane.material.metalness = 0.3;  // Less metallic for fabric
                app.liquidPlane.material.roughness = 0.8;  // More rough for soft fabric texture
                app.liquidPlane.uniforms.displacementScale.value = 12; // Higher displacement for flowing fabric
                
                app.setRain(false);
                window.__liquidApp = app;
            }
        `;
        document.body.appendChild(script);

        return () => {
            if (window.__liquidApp && window.__liquidApp.dispose) {
                window.__liquidApp.dispose();
            }
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, [imageSrc]);

    const positionClass = isFixed ? 'fixed' : 'absolute';

    return (
        <div
            className={`${positionClass} inset-0 m-0 w-full h-full touch-none overflow-hidden`}
            style={{ fontFamily: '"Montserrat", serif', zIndex: 0 }}
        >
            <canvas
                ref={canvasRef}
                id="liquid-canvas"
                className={`${positionClass} inset-0 w-full h-full`}
            />
        </div>
    );
}

export default LiquidEffectAnimation;
